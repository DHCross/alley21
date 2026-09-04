import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import type { PublicStorefrontItem } from '@/types/storefront';

const CATALOG_URL =
  import.meta.env.VITE_STOREFRONT_CATALOG_URL ??
  'http://localhost:3000/api/storefront/catalog';

type DetailState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'not-found' }
  | { status: 'ok'; item: PublicStorefrontItem };

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`;
}

function StatusBadge({ availability }: { availability: PublicStorefrontItem['availability'] }) {
  if (availability === 'sold') {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
        Sold
      </span>
    );
  }
  if (availability === 'reserved') {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-800">
        Reserved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
      Available
    </span>
  );
}

function DetailContent({ item }: { item: PublicStorefrontItem }) {
  const isAvailable = item.availability === 'available';
  const images = item.images.filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{`${item.title} — Alley 21 Enterprises`}</title>
        <meta name="description" content={item.description} />
      </Helmet>

      <main className="min-h-screen bg-background">
        <section className="py-8 border-b border-border bg-card">
          <div className="container mx-auto px-6">
            <Link
              to="/vintage"
              className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Back to collection
            </Link>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  {images[0] ? (
                    <img
                      src={images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.slice(1).map((src, i) => (
                      <div key={`${src}-${i}`} className="aspect-square rounded-xl overflow-hidden bg-muted">
                        <img
                          src={src}
                          alt={`${item.title} — image ${i + 2}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-xs text-muted-foreground font-mono mb-2">{item.id}</p>
                  <h1 className="font-heading text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
                    {item.title}
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    {item.brand}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge availability={item.availability} />
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground capitalize">
                    {item.storefrontClass}
                  </span>
                </div>

                <p className="text-4xl font-bold text-foreground">{formatPrice(item.price)}</p>

                <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <p className="text-muted-foreground mb-1">Category</p>
                    <p className="font-semibold text-foreground">{item.category}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <p className="text-muted-foreground mb-1">Condition</p>
                    <p className="font-semibold text-foreground">{item.condition}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <p className="text-muted-foreground mb-1">Fulfillment</p>
                    <p className="font-semibold text-foreground capitalize">{item.fulfillment.replace(/_/g, ' ')}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <p className="text-muted-foreground mb-1">Dimensions</p>
                    <p className="font-semibold text-foreground">
                      {item.dimensions.weightOz ? `${item.dimensions.weightOz} oz` : 'N/A'}
                    </p>
                  </div>
                </div>

                {!isAvailable ? (
                  <div className="p-6 rounded-2xl bg-muted border border-border">
                    <p className="font-heading text-xl font-bold text-foreground">
                      {item.availability === 'sold'
                        ? 'This item has been sold.'
                        : 'This item is currently unavailable.'}
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Interested in something similar? Reach out and we’ll let you know when a comparable piece arrives.
                    </p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-flex items-center bg-primary text-background px-6 py-3 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      Contact us
                    </Link>
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <p className="text-muted-foreground mb-4">
                      Interested in this piece? Send us a message and we’ll help you with next steps.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center bg-primary text-background px-6 py-3 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                      Inquire about this item
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function VintageDetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const [state, setState] = useState<DetailState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    async function loadItem() {
      setState({ status: 'loading' });
      try {
        const res = await fetch(CATALOG_URL);
        if (!res.ok) {
          throw new Error(`Catalog fetch failed: ${res.status}`);
        }
        const catalog: unknown = await res.json();
        if (!Array.isArray(catalog)) {
          throw new Error('Catalog response was not an array.');
        }
        const match = catalog.find((i) => (i as PublicStorefrontItem).id === itemId);
        if (!match) {
          if (!cancelled) setState({ status: 'not-found' });
          return;
        }
        if (!cancelled) setState({ status: 'ok', item: match as PublicStorefrontItem });
      } catch (err) {
        if (!cancelled) {
          setState({
            status: 'error',
            message: err instanceof Error ? err.message : 'Unable to load this item.',
          });
        }
      }
    }

    if (itemId) {
      void loadItem();
    } else {
      setState({ status: 'not-found' });
    }

    return () => {
      cancelled = true;
    };
  }, [itemId]);

  const pageContent = useMemo(() => {
    switch (state.status) {
      case 'loading':
        return (
          <main className="min-h-screen bg-background flex items-center justify-center">
            <p className="text-muted-foreground">Loading item…</p>
          </main>
        );
      case 'error':
        return (
          <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">Unable to load item</h1>
            <p className="mt-2 text-muted-foreground">{state.message}</p>
            <Link
              to="/vintage"
              className="mt-6 inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80"
            >
              Back to collection
            </Link>
          </main>
        );
      case 'not-found':
        return (
          <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
            <h1 className="font-heading text-2xl font-bold text-foreground">Item not found</h1>
            <p className="mt-2 text-muted-foreground">
              The piece you’re looking for is not in the current collection.
            </p>
            <Link
              to="/vintage"
              className="mt-6 inline-flex items-center bg-primary text-background px-6 py-3 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              Browse the collection
            </Link>
          </main>
        );
      case 'ok':
        return <DetailContent item={state.item} />;
    }
  }, [state]);

  return pageContent;
}
