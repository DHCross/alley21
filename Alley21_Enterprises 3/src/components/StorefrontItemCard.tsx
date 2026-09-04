import { Link } from 'react-router-dom';
import type { PublicStorefrontItem } from '@/types/storefront';

type Props = {
  item: PublicStorefrontItem;
};

export function StorefrontItemCard({ item }: Props) {
  return (
    <Link
      to={`/vintage/${encodeURIComponent(item.id)}`}
      className="group block rounded-2xl bg-card border border-border overflow-hidden transition hover:border-primary/50"
    >
      <div className="aspect-[4/3] bg-muted overflow-hidden">
        {item.images[0] ? (
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-5 space-y-2">
        <p className="text-xs text-muted-foreground font-mono">{item.id}</p>
        <h3 className="font-heading text-lg font-bold leading-tight">{item.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
        <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 bg-muted rounded">{item.category}</span>
          <span className="px-2 py-1 bg-muted rounded">{item.condition}</span>
          <span className="px-2 py-1 bg-muted rounded">{item.availability}</span>
          <span className="px-2 py-1 bg-muted rounded">{item.fulfillment}</span>
        </div>
      </div>
    </Link>
  );
}
