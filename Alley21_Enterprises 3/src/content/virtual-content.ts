/**
 * Runtime content module for the `virtual:content` alias.
 *
 * The `contentPlugin` that previously generated this module is not present in
 * the repository; its intended output is replaced by re-exporting the committed
 * JSON content files so the existing pages can keep importing from
 * `virtual:content` without a custom Vite plugin.
 */

export { default as about } from './pages/about.json';
export { default as ai_tech } from './pages/ai_tech.json';
export { default as classes } from './pages/classes.json';
export { default as collections } from './pages/collections.json';
export { default as contact } from './pages/contact.json';
export { default as furniture } from './pages/furniture.json';
export { default as home } from './pages/home.json';
export { default as insight } from './pages/insight.json';
export { default as self_discovery } from './pages/self_discovery.json';
