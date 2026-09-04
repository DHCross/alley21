import { useEffect, useState } from 'react';
import type { PublicStorefrontItem } from '@/types/storefront';
import { StorefrontItemCard } from './StorefrontItemCard';

type FilterKey = 'all' | 'mens' | 'womens' | 'furniture';

type FilterOption = {
  key: FilterKey;
  label: string;
  gap: string | null;
};

const filters: FilterOption[] = [
  { key: 'all', label: 'All', gap: null },
  {
    key: 'mens',
    label: "Men's",
    gap:
      "Men's filtering requires `gender` or `department` data in the public catalog, which is not currently part of `PublicStorefrontItem`.",
  },
  {
    key: 'womens',
    label: "Women's",
    gap:
      "Women's filtering requires `gender` or `department` data in the public catalog, which is not currently part of `PublicStorefrontItem`.",
  },
  {
    key: 'furniture',
    label: 'Furniture',
    gap:
      "Furniture filtering requires a `subcategory` or dedicated furniture classification in the public catalog; `category` is too broad (e.g. 'Home Goods').",
  },
];

const CATALOG_URL =
  import.meta.env.VITE_STOREFRONT_CATALOG_URL ??
  'http://localhost:3000/api/storefront/catalog';

const fallbackItem: PublicStorefrontItem = {
  id: 'tc-001-mid-century-dresser',
  title: 'Lane Mid-Century Walnut Dresser',
  description:
    'Refinished Lane mid-century walnut six-drawer dresser. Original brass pulls, dovetailed drawers, solid construction.',
  price: 485,
  images: ['https://cdn.example.com/images/dresser-primary.jpg'],
  category: 'Home Goods',
  brand: 'Lane',
  condition: 'Pre-owned',
  dimensions: { length: 60, width: 18, height: 30, weightOz: 1600 },
  availability: 'available',
  fulfillment: 'freight',
};

export function VintageCatalog() {
  const [items, setItems] = useState<PublicStorefrontItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

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
          if (!cancelled) setItems(catalog as PublicStorefrontItem[]);
        } else {
          if (!cancelled) {
            setError('Live catalog returned no classified items; using fixture.');
            setItems([fallbackItem]);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Unknown catalog fetch error',
          );
          setItems([fallbackItem]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadCatalog();
    return () => {
      cancelled = true;
    };
  }, []);

  const active = filters.find((f) => f.key === activeFilter) ?? filters[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors border ${
              activeFilter === filter.key
                ? 'bg-primary text-background border-primary'
                : 'bg-card text-foreground border-border hover:border-primary/50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {active.gap && (
        <div className="rounded-xl border border-dashed border-border bg-card p-6 text-muted-foreground">
          <p className="text-sm font-medium mb-1">Data-contract gap</p>
          <p className="text-sm">{active.gap}</p>
          <p className="text-sm mt-2">
            Showing all available items until the public catalog is extended and
            inventory is backfilled.
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-amber-600" data-testid="catalog-fallback">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading collection…</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">No items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <StorefrontItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
