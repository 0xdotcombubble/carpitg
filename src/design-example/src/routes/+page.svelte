<script lang="ts">
	import { onMount } from 'svelte';
	import SmoothScrollWrapper from '$lib/components/SmoothScrollWrapper.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ServicesSection from '$lib/components/ServicesSection.svelte';
	import PortfolioSection from '$lib/components/PortfolioSection.svelte';
	import PricingSection from '$lib/components/PricingSection.svelte';
	import ContactSection from '$lib/components/ContactSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { loadSiteSettings, type SiteSettings } from '$lib/content';

  let siteSettings: SiteSettings = {
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

  onMount(async () => {
    const loadedSettings = await loadSiteSettings();
    siteSettings = loadedSettings;
  });
</script>

{#if siteSettings}
	<SmoothScrollWrapper>
		{#snippet children()}
			<Hero {siteSettings} />
			<ServicesSection {siteSettings} />
          <PortfolioSection />
          <PricingSection />
          <ContactSection />
			<Footer {siteSettings} />
		{/snippet}
	</SmoothScrollWrapper>
{:else}
	<div class="flex items-center justify-center min-h-screen">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
			<p class="mt-4 text-muted-foreground">Betöltés...</p>
		</div>
	</div>
{/if}
