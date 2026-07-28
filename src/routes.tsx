import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import HomePage from './pages/index';
import ProdNotFoundPage from './pages/_404';

const AiTechPage = lazy(() => import('./pages/ai-tech'));
const VintagePage = lazy(() => import('./pages/vintage'));
const SelfDiscoveryPage = lazy(() => import('./pages/self-discovery'));
const ContactPage = lazy(() => import('./pages/contact'));
const OurStoryPage = lazy(() => import('./pages/about'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/ai-tech', element: <AiTechPage /> },
  { path: '/vintage', element: <VintagePage /> },
  { path: '/self-discovery', element: <SelfDiscoveryPage /> },
  { path: '/our-story', element: <OurStoryPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/furniture', element: <Navigate to="/vintage" replace /> },
  { path: '/classes', element: <Navigate to="/ai-tech" replace /> },
  { path: '/collections', element: <Navigate to="/vintage" replace /> },
  { path: '/insight', element: <Navigate to="/self-discovery" replace /> },
  { path: '/about', element: <Navigate to="/our-story" replace /> },
  { path: '*', element: <ProdNotFoundPage /> },
];

export type Path = '/' | '/ai-tech' | '/vintage' | '/self-discovery' | '/our-story' | '/contact';
export type Params = Record<string, string | undefined>;
