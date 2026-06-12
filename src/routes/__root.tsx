import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Cursor } from "../components/Cursor";
import { Preloader } from "../components/Preloader";
import { LenisProvider } from "../components/LenisProvider";
import { ScrollProgress } from "../components/ScrollProgress";
import { NotFoundPage } from "../components/NotFoundPage";

function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "East Africa Internet Group — Digital Marketing Agency for East Africa" },
      { name: "description", content: "EAG is a digital-centric marketing agency building a connected, prosperous East Africa across Tanzania, Kenya, Uganda, Rwanda, Burundi, DR Congo and South Sudan." },
      { name: "author", content: "East Africa Internet Group" },
      { name: "keywords", content: "East Africa Internet Group, EAG, digital marketing East Africa, marketing agency Tanzania, branding Dar es Salaam, BBN, Business Branding Network, Kenya, Uganda, Rwanda" },
      { name: "theme-color", content: "#0A2E4D" },
      { property: "og:site_name", content: "East Africa Internet Group" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@eag" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/android-chrome-512x512.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "East Africa Internet Group",
          alternateName: "EAG",
          url: "https://eastafricainternetgroup.com/",
          logo: "https://eastafricainternetgroup.com/android-chrome-512x512.png",
          description: "Digital-centric marketing agency building a connected, prosperous East Africa.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Zo Space, 8th Floor, Kinondoni",
            addressLocality: "Dar-es-Salaam",
            addressCountry: "TZ",
          },
          telephone: "+255754407003",
          email: "info@eastafricainternetgroup.com",
          areaServed: ["TZ", "KE", "UG", "RW", "BI", "CD", "SS"],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const matches = useRouterState({ select: (s) => s.matches });
  // When only the root route matched and the path isn't "/", we're on a 404 page.
  const isNotFound = matches.length <= 1 && pathname !== "/";

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <LenisProvider>
        <Preloader />
        <Cursor />
        <ScrollProgress />
        {!isNotFound && <Nav />}
        <main className="relative min-h-screen">
          <AnimatePresence mode="wait" initial={false}>
            <div key={pathname}>
              <Outlet />
            </div>
          </AnimatePresence>
        </main>
        {!isNotFound && <Footer />}
      </LenisProvider>
    </QueryClientProvider>
  );
}
