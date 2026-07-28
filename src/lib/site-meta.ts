/**
 * Agent-authored business identity for /llms.txt (RUBICON-365).
 *
 * The homepage Organization/WebSite JSON-LD that the develop agent writes
 * (RUBICON-343) lives inline in React markup and is NOT readable by the
 * server at request time, so the /llms.txt handler reads name + summary from
 * here instead. The develop agent seeds these at site creation; empty values
 * are the "unseeded / thin site" signal that the handler falls back on.
 */
export interface SiteMeta {
	/** Business name — rendered as the llms.txt H1. */
	name: string;
	/** One-line business summary — rendered as the llms.txt blockquote. */
	summary: string;
}

export const siteMeta: SiteMeta = {
	name: "Alley 21 Enterprises",
	summary: "A multi-channel venture dealing in vintage goods, antique furniture, art, collectibles, and pre-loved clothing — built on the belief that the best things in life are found, not bought new.",
};
