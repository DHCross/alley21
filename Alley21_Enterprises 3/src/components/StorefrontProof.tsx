import { useEffect, useState } from 'react';
import type { PublicStorefrontItem } from '@/types/storefront';

/**
 * Dev/proof component that consumes the Thrift_Companion public storefront
 * catalog and renders exactly one item. This is intentionally narrow: it proves
 * the cross-repo contract and rendering path, not a full catalog UI.
 *
 * If the live catalog fetch fails or returns no classified items, the component
 * renders a fixture-backed copy of the expected public shape so the proof is
 * visible even before a live seller is configured.
 */

const CATALOG_URL =
  import.meta.env.VITE_STOREFRONT_CATALOG_URL ??
  'http://localhost:3000/api/storefront/catalog';

const fixtureItem: PublicStorefrontItem = {
  id: 'tc-002-vintage-teapot',
  title: 'Hall Vintage Hall Pottery Teapot',
  description: 'Hall pottery vintage teapot, no chips or cracks.',
  price: 45,
  images: ['https://cdn.example.com/images/teapot.jpg'],
  category: 'Home Goods',
  brand: 'Hall',
  condition: 'Pre-owned',
  dimensions: { weightOz: 24 },
  availability: 'available',
  fulfillment: 'parcel',
  storefrontClass: 'furniture',
};

export function StorefrontProof() {
  const [item, setItem] = useState<PublicStorefrontItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCatalog() {
      try {
        const res = await fetch(CATALOG_URL);
        if (!res.ok) {
          throw new Error(`Catalog fetch failed: ${res.status}`);
        }
        const catalog: unknown = await res.json();
        if (Array.isArray(catalog) && catalog.length > 0) {
          const first = catalog[0] as PublicStorefrontItem;
          if (!cancelled) {
            setItem(first);
          }
        } else {
          if (!cancelled) {
            setError('Live catalog returned no classified items; using fixture.');
            setItem(fixtureItem);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Unknown catalog fetch error',
          );
          setItem(fixtureItem);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCatalog();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="p-4 text-slate-600">Loading storefront proof…</p>;
  }

  if (!item) {
    return <p className="p-4 text-red-600">Unable to load storefront item.</p>;
  }

  return (
    <section className="p-6 max-w-xl mx-auto border border-slate-200 rounded-xl bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Storefront Proof of Consumption</h2>
      {error && (
        <p className="text-sm text-amber-600 mb-4" data-testid="fixture-fallback">
          {error}
        </p>
      )}
      <article className="space-y-2">
        <p className="text-xs text-slate-500 font-mono">ID: {item.id}</p>
        <h3 className="text-2xl font-bold">{item.title}</h3>
        {item.images[0] ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-64 object-cover rounded-lg bg-slate-100"
          />
        ) : (
          <div className="w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
            No image
          </div>
        )}
        <p className="text-slate-700">{item.description}</p>
        <p className="text-xl font-semibold">${item.price.toFixed(2)}</p>
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-1 bg-slate-100 rounded">{item.category}</span>
          <span className="px-2 py-1 bg-slate-100 rounded">{item.condition}</span>
          <span className="px-2 py-1 bg-slate-100 rounded">{item.availability}</span>
          <span className="px-2 py-1 bg-slate-100 rounded">{item.fulfillment}</span>
        </div>
      </article>
    </section>
  );
}
