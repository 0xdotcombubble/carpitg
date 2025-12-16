import { marked } from 'marked';
import matter from 'gray-matter';

export interface ContentItem {
  slug: string;
  metadata: Record<string, any>;
  content: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroBackgroundImage: string;
  heroLogo: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  servicesTitle: string;
  servicesSubtitle: string;
  pricingTitle: string;
  pricingSubtitle: string;
  pricingNote: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
}

// Load site settings
export async function loadSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch('/api/content/site-settings');
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Failed to load site settings, using fallback');
    return {
      heroTitle: 'AUTÓKOZMETIKA - DETAIL STUDIO',
      heroSubtitle: 'Autód megérdemli a legjobbat',
      heroDescription: 'Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít',
      heroBackgroundImage: '/background.jpg',
      heroLogo: '/logo.svg',
      portfolioTitle: 'Elvégzett Munkáink',
      portfolioSubtitle: 'Válogatás a legfrissebb projektjeinkből',
      servicesTitle: 'Egyedi Megoldások',
      servicesSubtitle: 'Modern technológiák és hagyományos kézműves technikák egyesítése. Minden autó egyedi kezelést érdemel.',
      pricingTitle: 'Transzparens árképzés',
      pricingSubtitle: 'Válassz a négy csomag közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.',
      pricingNote: 'Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók, extrán szennyezett autók esetében az ár eltérhet.',
      phone: '+36703339809',
      email: 'info@carpitgarage.hu',
      address: '1172 Budapest\nCinkotai út 26.',
      instagram: 'https://www.instagram.com/carpit_grg',
      facebook: 'https://www.facebook.com/share/16mtfkk7VR/'
    };
  }
}

// Load content from markdown files
export async function loadContent(type: 'services' | 'portfolio' | 'pricing'): Promise<ContentItem[]> {
  try {
    const response = await fetch(`/api/content/${type}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Failed to load ${type} content`);
    return [];
  }
}

// Parse markdown content
export async function parseMarkdown(content: string): Promise<{ metadata: Record<string, any>; html: string }> {
  const { data, content: markdownContent } = matter(content);
  const html = await marked(markdownContent);
  return { metadata: data, html };
}