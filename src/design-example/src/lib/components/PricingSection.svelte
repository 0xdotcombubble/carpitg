<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Check } from 'lucide-svelte';
	import type { SiteSettings } from '$lib/content';


	interface PricingItem {
		slug: string;
		metadata: {
			title: string;
			category: string;
			description: string;
			price: string;
			duration: string;
			image: string;
			order: number;
			popular: boolean;
			features: string[];
		};
		content: string;
	}

	let pricingItems: PricingItem[] = [];
	let isClient = false;
	let isMobile = false;
	let scrollProgress = 0;
	let scrollY = 0;

	let container: HTMLElement;

	function getItemScale(index: number): number {
		if (!isClient || isMobile) {
			return 1 - (index * 0.002);
		}

		const targetScale = 1 - (index * 0.005);
		const range = index * 0.15;
		const progress = Math.max(0, Math.min(1, (scrollProgress - range) / (1 - range)));
		return 1 - (progress * (1 - targetScale));
	}

	function handleScroll() {
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const containerHeight = container.offsetHeight;
		const windowHeight = window.innerHeight;

		const start = -rect.top;
		const end = start + windowHeight;

		scrollProgress = Math.max(0, Math.min(1, start / (containerHeight - windowHeight)));
	}

	function checkMobile() {
		if (browser) {
			isMobile = window.innerWidth < 768;
		}
	}

	$: parallaxY = !isClient || isMobile ? 0 : scrollY * 0.5;


  onMount(() => {
    isClient = true;
    checkMobile();

    async function loadData() {
      try {
        const response = await fetch('/api/content/pricing');
        pricingItems = await response.json();
      } catch (error) {
        console.error('Error loading pricing:', error);
      }
    }

    loadData();

    if (browser) {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkMobile);
      };
    }
  });
</script>

<svelte:window bind:scrollY />

<section bind:this={container} id="pricing" class="relative md:bg-transparent bg-[#0D0D0D]">
	<!-- Header Section -->
	<div class="py-24 md:py-32 relative overflow-hidden">
		<!-- Desktop Parallax Background -->
		{#if isClient && !isMobile}
			<div
				class="absolute inset-0 w-full h-[120%]"
				style="transform: translateY({parallaxY}px)"
			>
				<img
					src="/background.jpg"
					alt="Background"
					class="w-full h-full object-cover"
				/>
			</div>
		{/if}

		<!-- Mobile Background -->
		{#if isClient && isMobile}
			<div class="absolute inset-0 w-full h-full">
				<img
					src="/background.jpg"
					alt="Background"
					class="w-full h-full object-cover"
				/>
			</div>
		{/if}

		<!-- Overlay -->
		<div class="absolute inset-0 bg-black/70"></div>

		<div class="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
			<div class="space-y-4 mb-16 text-center">
  <div class="flex items-center justify-center gap-3 mb-6">
  <span class="w-2 h-2 bg-accent rounded-full"></span>
  <span class="text-accent/80 font-medium tracking-widest text-sm uppercase">
    ÁRLISTA
  </span>
  <span class="w-2 h-2 bg-accent rounded-full"></span>
</div>

  <h2 class="text-4xl md:text-6xl font-bold text-balance">
  <span class="text-white">Transzparens</span>
  <span class="text-accent">Árképzés</span>
</h2>

				<p class="text-lg text-white/60 max-w-2xl mx-auto">
					Válassz a csomagjaink közül - mindegyik tartalmazza az anyagköltséget és a munkadíjat.
				</p>
			</div>
		</div>
	</div>

	<!-- Cards Parallax Section -->
	<div class="relative">
		{#each pricingItems as item, i}
			{@const scale = getItemScale(i)}
			<div
				style="transform: scale({scale}); top: {!isClient || isMobile ? `${i * 20}px` : `calc(-2vh + ${i * 25}px)`}"
				class="flex {!isClient || isMobile ? 'min-h-[450px]' : 'md:h-screen'} items-center justify-center sticky"
			>
                <div class="max-w-4xl mx-auto px-4 md:px-8 w-full">
  <div class="relative bg-[#1A1A1A] border border-white/10 hover:border-accent transition-all duration-500 overflow-hidden {i % 2 === 0 ? 'md:rotate-[0.5deg]' : 'md:-rotate-[0.5deg]'} group cursor-pointer">
						<!-- Corner accent element -->
						<div class="absolute top-6 right-6 z-10">
							<div class="w-12 h-12 border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 flex items-center justify-center">
								<div class="w-6 h-6 bg-accent/20 group-hover:bg-accent/40 transition-all duration-500"></div>
							</div>
						</div>

						{#if item.metadata.popular}
							<div class="absolute bottom-6 left-6 z-10">
								<span class="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
									NÉPSZERŰ
								</span>
							</div>
						{/if}

						<div class="{!isClient || isMobile ? 'p-6 min-h-[400px]' : 'p-8 lg:p-12 min-h-[550px]'} flex flex-col justify-between">
							<div class="flex-1 flex flex-col justify-center">
  <div class="mb-4">
  <span class="text-accent text-sm font-medium tracking-wide uppercase">
    {item.metadata.category}
  </span>
</div>

								<h3 class="text-3xl lg:text-5xl font-bold text-white mb-4">
									{item.metadata.title}
								</h3>

								<p class="text-white/60 mb-6 text-lg">{item.metadata.description}</p>

								<div class="flex items-baseline gap-2 mb-8">
  <p class="text-5xl lg:text-6xl font-bold text-accent">{item.metadata.price}</p>
									{#if item.metadata.duration}
										<span class="text-white/50 text-sm">/ {item.metadata.duration}</span>
									{/if}
								</div>

								<!-- Feature list -->
								<div class="space-y-4 flex-grow mb-8">
									{#each item.metadata.features as feature}
										<div class="flex items-start gap-3">
  <Check class="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
											<span class="text-white text-lg">
												{feature}
											</span>
										</div>
									{/each}
								</div>
							</div>

							<!-- CTA button -->
							<div class="mt-8">
  <a
  href="/pricing/{item.slug}"
  class="w-full py-4 px-8 bg-accent text-white font-semibold text-lg hover:bg-accent/90 transition-all duration-300 text-center block relative overflow-hidden group"
>
                                    <span class="relative z-10">Részletek</span>
								</a>
							</div>

							<!-- Hover glow effect -->
  <div class="absolute inset-0 bg-accent/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer Section -->
	<div class="py-24 md:py-32 relative">
		<div class="max-w-7xl mx-auto px-4 md:px-8 relative">
  <div class="p-8 rounded-lg bg-[#1A1A1A] border border-accent/30 relative overflow-hidden">
				<p class="text-center text-white text-lg relative z-10">
					Az árak átlagosan szennyezett, 5 személyes gépjárművekre vonatkoznak. Munkás autók,
					extrán szennyezett autók esetében az ár eltérhet.
				</p>
			</div>
		</div>
	</div>
</section>