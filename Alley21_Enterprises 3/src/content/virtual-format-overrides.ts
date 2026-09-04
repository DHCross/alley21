import { EMPTY_FORMAT_OVERRIDE_BUNDLE } from '@/lib/format-overrides';

/**
 * Runtime module for the `virtual:format-overrides` alias.
 *
 * Replaces the missing `formatOverridesPlugin` with the static empty bundle
 * exported from the canonical format-overrides library.
 */
export default EMPTY_FORMAT_OVERRIDE_BUNDLE;
