import { json } from '@sveltejs/kit';

// Pre-built site settings for fast response
export async function GET() {
  try {
    // This data is pre-built and optimized for fast delivery
    const siteSettings = {
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

    return json(siteSettings);
  } catch (error) {
    console.error('Error loading site settings:', error);
    console.error('Error details:', error instanceof Error ? error.message : String(error));
    
    // Return fallback data if there's an error
    return json({
      heroTitle: 'AUTÓKOZMETIKA - DETAIL STUDIO',
      heroSubtitle: 'Autód megérdemli a legjobbat',
      heroDescription: 'Ahol a precizitás találkozik a szenvedéllyel. Minden autó egyedi, minden részlet számít',
      heroBackgroundImage: '/background.jpg',
      heroLogo: '/logo.svg',
      phone: '+36703339809',
      email: 'info@carpitgarage.hu',
      address: '1172 Budapest\nCinkotai út 26.',
      instagram: 'https://www.instagram.com/carpit_grg',
      facebook: 'https://www.facebook.com/share/16mtfkk7VR/'
    });
  }
}
