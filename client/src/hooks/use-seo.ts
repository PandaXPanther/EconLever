import { useEffect } from "react";

/**
 * Lightweight per-page SEO hook.
 * Mutates document.title and the description / OG tags when a page mounts.
 * Hash-based routing means crawlers see one HTML file, but most modern
 * crawlers (Googlebot, Bingbot, social-card scrapers via prerender services)
 * execute JS, so live tag updates are still useful for shared links.
 */
export interface PageSeo {
  title: string;
  description: string;
  /** Canonical URL (absolute). Defaults to econlever.org. */
  canonical?: string;
  /** Optional comma-separated keyword list, page-specific. */
  keywords?: string;
}

const SITE = "https://econlever.org";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({ title, description, canonical, keywords }: PageSeo) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    const url = canonical ?? SITE + "/";
    setLink("canonical", url);
    setMeta("property", "og:url", url);
  }, [title, description, canonical, keywords]);
}
