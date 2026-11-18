import { get, put } from "@vercel/blob";

const ALLOWED_DOCS = new Set(["business-goals", "alley21-brochure"]);
const MAX_HTML_BYTES = 512 * 1024;
const MAX_HISTORY_ENTRIES = 60;

interface DocSnapshot {
  docId: string;
  version: number;
  html: string | null;
  updatedAt: string;
  updatedBy: string;
  summary: string;
  resetToBaseline?: boolean;
}

interface HistoryEntry {
  version: number;
  updatedAt: string;
  updatedBy: string;
  summary: string;
  resetToBaseline?: boolean;
}

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function normalizeDocId(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return ALLOWED_DOCS.has(trimmed) ? trimmed : null;
}

function sanitizeAuthor(value: unknown): string {
  if (typeof value !== "string") return "Partner";
  const cleaned = value.replace(/[<>]/g, "").trim().slice(0, 40);
  return cleaned || "Partner";
}

function sanitizeSummary(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").trim().slice(0, 160);
}

/**
 * Defense-in-depth server-side HTML sanitization for living-doc fragments.
 * Client-side rendering also enforces Element.setHTML() / DOMPurify.
 */
function sanitizeHtmlServer(raw: string): string {
  return raw
    .replace(/<(script|iframe|object|embed|applet|base|meta|link|style|form|svg|math)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|iframe|object|embed|applet|base|meta|link|style|form|svg|math)\b[^>]*\/?>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\s+style\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/\b(href|src|xlink:href)\s*=\s*(?:"\s*(?:javascript|vbscript|data):[^"]*"|'\s*(?:javascript|vbscript|data):[^']*')/gi, '$1="#"')
    .replace(/\scontenteditable\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
}

function currentPath(docId: string): string {
  return `living-docs/${docId}/current.json`;
}

function historyPath(docId: string): string {
  return `living-docs/${docId}/history.json`;
}

function versionPath(docId: string, version: number): string {
  return `living-docs/${docId}/versions/${String(version).padStart(6, "0")}.json`;
}

async function readPrivateJson<T>(pathname: string): Promise<{ data: T; etag: string } | null> {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode === 304 || !result.stream) {
    return null;
  }
  const text = await new Response(result.stream).text();
  return {
    data: JSON.parse(text) as T,
    etag: result.blob.etag,
  };
}

async function writePrivateJson(
  pathname: string,
  payload: unknown,
  options: { ifMatch?: string } = {},
): Promise<void> {
  await put(pathname, JSON.stringify(payload), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    ...(options.ifMatch ? { ifMatch: options.ifMatch } : {}),
  });
}

function isPreconditionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /412|precondition|etag|if-match|already exists/i.test(message);
}

export async function GET(request: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return jsonResponse({ error: "Storage not configured (missing BLOB_READ_WRITE_TOKEN)." }, 503);
  }

  const url = new URL(request.url);
  const docId = normalizeDocId(url.searchParams.get("doc"));
  if (!docId) {
    return jsonResponse({ error: "Invalid or missing doc parameter." }, 400);
  }

  try {
    if (url.searchParams.get("history") === "1") {
      const historyRes = await readPrivateJson<HistoryEntry[]>(historyPath(docId));
      return jsonResponse({
        docId,
        entries: historyRes?.data ?? [],
      });
    }

    const versionParam = url.searchParams.get("version");
    if (versionParam !== null) {
      const targetVersion = Number.parseInt(versionParam, 10);
      if (!Number.isFinite(targetVersion) || targetVersion < 1) {
        return jsonResponse({ error: "Invalid version parameter." }, 400);
      }
      const verRes = await readPrivateJson<DocSnapshot>(versionPath(docId, targetVersion));
      if (!verRes) {
        return jsonResponse({ error: "Version not found." }, 404);
      }
      return jsonResponse({ docId, snapshot: verRes.data });
    }

    const [currentRes, historyRes] = await Promise.all([
      readPrivateJson<DocSnapshot>(currentPath(docId)),
      readPrivateJson<HistoryEntry[]>(historyPath(docId)),
    ]);

    if (!currentRes) {
      return jsonResponse({
        docId,
        version: 0,
        html: null,
        updatedAt: null,
        updatedBy: null,
        summary: null,
        historyCount: historyRes?.data.length ?? 0,
      });
    }

    return jsonResponse({
      ...currentRes.data,
      historyCount: historyRes?.data.length ?? 0,
    });
  } catch (err) {
    console.error("[api/docs] GET failed", err);
    return jsonResponse({ error: "Failed to load document." }, 500);
  }
}

export async function POST(request: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return jsonResponse({ error: "Storage not configured (missing BLOB_READ_WRITE_TOKEN)." }, 503);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const docId = normalizeDocId(typeof body.doc === "string" ? body.doc : null);
  if (!docId) {
    return jsonResponse({ error: "Invalid or missing doc parameter." }, 400);
  }

  const action = typeof body.action === "string" ? body.action : "save";
  if (!["save", "restore", "reset"].includes(action)) {
    return jsonResponse({ error: "Unsupported action." }, 400);
  }

  const updatedBy = sanitizeAuthor(body.updatedBy);
  const force = body.force === true;
  const expectedVersion =
    typeof body.expectedVersion === "number" && Number.isFinite(body.expectedVersion)
      ? body.expectedVersion
      : null;

  try {
    const [currentRes, historyRes] = await Promise.all([
      readPrivateJson<DocSnapshot>(currentPath(docId)),
      readPrivateJson<HistoryEntry[]>(historyPath(docId)),
    ]);

    const currentSnapshot = currentRes?.data ?? null;
    const currentVersion = currentSnapshot?.version ?? 0;

    if (!force && expectedVersion !== null && expectedVersion !== currentVersion) {
      return jsonResponse(
        {
          error: "conflict",
          message: `Document was updated to v${currentVersion} by ${currentSnapshot?.updatedBy ?? "another editor"}.`,
          current: currentSnapshot,
        },
        409,
      );
    }

    let nextHtml: string | null = null;
    let summary = sanitizeSummary(body.summary);
    let resetToBaseline = false;

    if (action === "save") {
      if (typeof body.html !== "string" || !body.html.trim()) {
        return jsonResponse({ error: "Missing html content." }, 400);
      }
      if (new TextEncoder().encode(body.html).byteLength > MAX_HTML_BYTES) {
        return jsonResponse({ error: "Document exceeds maximum allowed size." }, 413);
      }
      nextHtml = sanitizeHtmlServer(body.html);
      if (!summary) {
        summary = "Edited document";
      }
    } else if (action === "restore") {
      const targetVersion =
        typeof body.targetVersion === "number" && Number.isFinite(body.targetVersion)
          ? Math.trunc(body.targetVersion)
          : 0;
      if (targetVersion < 1) {
        return jsonResponse({ error: "Invalid targetVersion." }, 400);
      }
      const targetRes = await readPrivateJson<DocSnapshot>(versionPath(docId, targetVersion));
      if (!targetRes) {
        return jsonResponse({ error: "Requested version not found." }, 404);
      }
      nextHtml = targetRes.data.html ? sanitizeHtmlServer(targetRes.data.html) : null;
      resetToBaseline = targetRes.data.resetToBaseline === true || nextHtml === null;
      summary = summary || `Restored v${targetVersion}`;
    } else if (action === "reset") {
      nextHtml = null;
      resetToBaseline = true;
      summary = summary || "Reset to repository baseline";
    }

    const nextVersion = currentVersion + 1;
    const updatedAt = new Date().toISOString();
    const nextSnapshot: DocSnapshot = {
      docId,
      version: nextVersion,
      html: nextHtml,
      updatedAt,
      updatedBy,
      summary,
      ...(resetToBaseline ? { resetToBaseline: true } : {}),
    };

    try {
      await writePrivateJson(
        currentPath(docId),
        nextSnapshot,
        !force && currentRes?.etag ? { ifMatch: currentRes.etag } : {},
      );
    } catch (err) {
      if (!force && isPreconditionError(err)) {
        const latest = await readPrivateJson<DocSnapshot>(currentPath(docId));
        return jsonResponse(
          {
            error: "conflict",
            message: "Concurrent save detected. Please review the latest version.",
            current: latest?.data ?? null,
          },
          409,
        );
      }
      throw err;
    }

    const nextHistoryEntry: HistoryEntry = {
      version: nextVersion,
      updatedAt,
      updatedBy,
      summary,
      ...(resetToBaseline ? { resetToBaseline: true } : {}),
    };
    const nextHistory = [nextHistoryEntry, ...(historyRes?.data ?? [])].slice(0, MAX_HISTORY_ENTRIES);

    await Promise.all([
      writePrivateJson(versionPath(docId, nextVersion), nextSnapshot),
      writePrivateJson(historyPath(docId), nextHistory),
    ]);

    return jsonResponse({
      ...nextSnapshot,
      historyCount: nextHistory.length,
    });
  } catch (err) {
    console.error("[api/docs] POST failed", err);
    return jsonResponse({ error: "Failed to save document." }, 500);
  }
}
