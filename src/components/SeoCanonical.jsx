import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Preferred production origin. Keep in sync with public/sitemap.xml and public/robots.txt.
const SITE_ORIGIN = (import.meta.env.VITE_SITE_URL || 'https://lumina-mentis.org').replace(/\/$/, '');

// Build a clean, self-referencing canonical URL from a pathname.
// Query strings and hashes are intentionally dropped so that variants like
// "?signup=true" do not register as separate duplicate URLs.
function buildCanonicalUrl(pathname) {
  let path = pathname || '/';
  // Collapse duplicate slashes and strip trailing slash (except root).
  path = path.replace(/\/{2,}/g, '/');
  if (path.length > 1) path = path.replace(/\/$/, '');
  return `${SITE_ORIGIN}${path}`;
}

function setLinkRel(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setMetaProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps <link rel="canonical"> and og:url in sync with the active route so the
 * SPA does not surface as "Duplicate without user-selected canonical" in Google
 * Search Console. Renders nothing.
 */
export default function SeoCanonical() {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = buildCanonicalUrl(pathname);
    setLinkRel('canonical', url);
    setMetaProperty('og:url', url);
  }, [pathname]);

  return null;
}
