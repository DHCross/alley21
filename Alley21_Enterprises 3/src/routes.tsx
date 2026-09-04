import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import HomePage from './pages/index';
import NotFoundPage from './pages/_404';

const AiTechPage = lazy(() => import('./pages/ai-tech'));
const VintagePage = lazy(() => import('./pages/vintage'));
const SelfDiscoveryPage = lazy(() => import('./pages/self-discovery'));
const ContactPage = lazy(() => import('./pages/contact'));
const OurStoryPage = lazy(() => import('./pages/about'));
const StorefrontProofPage = lazy(() => import('./pages/storefront-proof'));
const VintageDetailPage = lazy(() => import('./pages/vintage-detail'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/ai-tech', element: <AiTechPage /> },
  { path: '/vintage', element: <VintagePage /> },
  { path: '/vintage/:itemId', element: <VintageDetailPage /> },
  { path: '/self-discovery', element: <SelfDiscoveryPage /> },
  { path: '/our-story', element: <OurStoryPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/storefront-proof', element: <StorefrontProofPage /> },
  { path: '/furniture', element: <Navigate to="/vintage" replace /> },
  { path: '/classes', element: <Navigate to="/ai-tech" replace /> },
  { path: '/collections', element: <Navigate to="/vintage" replace /> },
  { path: '/insight', element: <Navigate to="/self-discovery" replace /> },
  { path: '/about', element: <Navigate to="/our-story" replace /> },
  { path: '*', element: <NotFoundPage /> },
];

export type Path = '/' | '/ai-tech' | '/vintage' | '/self-discovery' | '/our-story' | '/contact' | '/storefront-proof';
export type Params = Record<string, string | undefined>;
