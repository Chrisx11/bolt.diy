import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare';
import { Links, LiveReload, Meta, Outlet, ScrollRestoration, Scripts } from '@remix-run/react';
import tailwindReset from '@unocss/reset/tailwind-compat.css?url';
import globalStyles from './styles/index.scss?url';

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.svg',
    type: 'image/svg+xml',
  },
  { rel: 'stylesheet', href: tailwindReset },
  { rel: 'stylesheet', href: globalStyles },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Share+Tech+Mono&display=swap',
  },
];

export const meta: MetaFunction = () => [
  { charSet: 'utf-8' },
  { title: 'TONE3000 Capture Vault' },
  {
    name: 'description',
    content: 'Arquivo pessoal de capturas NAM para amplificadores e pedais em um visual futurista inspirado no TONE3000.',
  },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
];

export default function App() {
  return (
    <html lang="pt-BR" data-theme="tone3000">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  );
}
