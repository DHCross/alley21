/**
 * Alley21 public storefront item contract.
 *
 * This is a manual mirror of the `PublicStorefrontItem` shape exposed by
 * Thrift_Companion's `/api/storefront/catalog` endpoint. Alley21 MUST treat
 * this as the only allowed public shape and MUST NOT import Thrift_Companion
 * source files or private inventory types.
 *
 * Phase 1: narrow consumption proof only. No category pages, detail pages,
 * checkout, Stripe, or webhooks.
 */

export type PublicStorefrontAvailability = 'available' | 'reserved' | 'sold';
export type StorefrontFulfillment = 'parcel' | 'local_pickup' | 'freight';
export type StorefrontClass = 'mens' | 'womens' | 'furniture';

export interface PublicStorefrontDimensions {
  length?: number;
  width?: number;
  height?: number;
  weightOz?: number;
}

export interface PublicStorefrontItem {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  condition: 'New' | 'Pre-owned';
  dimensions: PublicStorefrontDimensions;
  availability: PublicStorefrontAvailability;
  fulfillment: StorefrontFulfillment;
  /** Authoritative storefront navigation classification. */
  storefrontClass: StorefrontClass;
}
