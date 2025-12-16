<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { SiteSettings } from '$lib/content';


	interface PortfolioItem {
		slug: string;
		metadata: {
			title: string;
			category: string;
			description: string;
			image: string;
			order: number;
			featured: boolean;
		};
		content: string;
	}

	let portfolioItems: PortfolioItem[] = [];
	let selectedCategory = 'Összes';
	let isClient = false;
	let isMobile = false;
	let scrollProgress = 0;

	let container: HTMLElement;

	$: categories = ['Összes', ...Array.from(new Set(portfolioItems.map(item => item.metadata.category)))];
	$: filteredItems = selectedCategory === 'Összes' ? portfolioItems : portfolioItems.filter(item => item.metadata.category === selectedCategory);

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

  onMount(() => {
    isClient = true;
    checkMobile();

    async function loadData() {
      try {
        const response = await fetch('/api/content/portfolio');
        portfolioItems = await response.json();
      } catch (error) {
        console.error('Error loading portfolio:', error);
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

<section bind:this={container} id="portfolio" class="relative md:bg-transparent bg-[#0D0D0D]">
	<!-- Header Section -->
	<div class="py-24 md:py-32 relative overflow-hidden">
		<div class="max-w-7xl mx-auto px-6 md:px-12 relative">
			<div class="text-center mb-16 md:mb-20">
  <div class="flex items-center justify-center gap-3 mb-6">
  <span class="w-2 h-2 bg-accent rounded-full"></span>
  <span class="text-accent/80 font-medium tracking-wider text-sm uppercase">
    Portfólió
  </span>
  <span class="w-2 h-2 bg-accent rounded-full"></span>
</div>

				<h2 class="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-6">
					Kiváló Munkáink
				</h2>

				<p class="text-lg text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
					Büszkék vagyunk minden elvégzett munkánkra. Itt láthatod legfrissebb projektjeinket és az elégedett ügyfelek autóit.
				</p>

  <div class="w-32 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-8"></div>
			</div>

			<!-- Category Filter -->
			<div class="flex flex-wrap justify-center gap-3 mb-12">
				{#each categories as category}
  <button
  on:click={() => selectedCategory = category}
  class="px-6 py-2 text-sm font-medium transition-all duration-300 {selectedCategory === category
    ? 'bg-accent text-white'
    : 'bg-[#1A1A1A] border border-white/20 text-white hover:border-accent/50'}"
>
						{category}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Cards Parallax Section -->
	<div class="relative">
		{#each filteredItems as item, i}
			{@const scale = getItemScale(i)}
			<div
				style="transform: scale({scale}); top: {!isClient || isMobile ? `${i * 20}px` : `calc(-2vh + ${i * 25}px)`}"
				class="flex {!isClient || isMobile ? 'min-h-[400px]' : 'md:h-screen'} items-center justify-center sticky"
			>
                <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
  <a href="/portfolio/{item.slug}" class="block">
    <div class="relative bg-[#1A1A1A] border border-white/20 hover:border-accent/50 transition-all duration-500 overflow-hidden {i % 2 === 0 ? 'md:rotate-[0.5deg]' : 'md:-rotate-[0.5deg]'} group cursor-pointer">
  <!-- Corner accent element -->
  <div class="absolute top-6 right-6 z-10">
    <div class="w-12 h-12 border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 flex items-center justify-center">
      <div class="w-6 h-6 bg-accent/20 group-hover:bg-accent/40 transition-all duration-500"></div>
    </div>
  </div>

						<div class="{!isClient || isMobile ? 'flex flex-col min-h-[500px]' : 'grid grid-cols-1 lg:grid-cols-2 min-h-[450px]'}">
                            <!-- Image Section -->
                            <div class="relative overflow-hidden {!isClient || isMobile ? 'h-64 flex-shrink-0' : ''}">
                                <img
                                    src={item.metadata.image}
                                    alt={item.metadata.title}
                                    class="w-full h-full object-cover cursor-pointer"
                                    loading={i < 2 ? 'eager' : 'lazy'}
                                />
                                <div class="absolute inset-0 bg-black/20"></div>
                                
                                <!-- Mobile overlay with category -->
                                {#if !isClient || isMobile}
  <div class="absolute top-4 left-4 z-10">
  <span class="px-3 py-1 bg-accent text-white text-sm font-medium rounded-full">
    {item.metadata.category}
  </span>
</div>
                                {/if}
                            </div>

							<!-- Content Section -->
							<div class="{!isClient || isMobile ? 'p-6 flex-1' : 'p-8 lg:p-12'} flex flex-col justify-between">
								<div class="flex-1 flex flex-col justify-center">
									<!-- Desktop category - hidden on mobile since it's on image overlay -->
									{#if !isClient || !isMobile}
  <div class="mb-4">
  <span class="text-accent text-sm font-medium tracking-wide uppercase">
    {item.metadata.category}
  </span>
</div>
									{/if}

  <h3 class="font-display text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
  {item.metadata.title}
</h3>

  <div class="w-16 h-[2px] bg-gradient-to-r from-accent to-accent/30 mb-4 group-hover:w-24 transition-all duration-500"></div>

									<p class="text-white/70 font-light leading-relaxed text-base lg:text-lg mb-6">
										{item.metadata.description}
									</p>
								</div>

                                <div class="mt-6">
                                    <div
                                        class="absolute bottom-6 right-6 w-10 h-10 border border-accent/50 text-accent hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
                                    >
                                        <span class="text-xl transform group-hover:rotate-45 transition-transform duration-300">→</span>
                                    </div>
                                </div>
							</div>
						</div>

  <div class="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
  <div class="absolute bottom-0 right-0 w-32 h-32 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500"></div>
</div>
</a>
            </div>
        </div>
		{/each}
	</div>

	<!-- Footer Section -->
	<div class="py-24 md:py-32 relative">
		<div class="max-w-7xl mx-auto px-6 md:px-12 relative">
			<div class="bg-gradient-to-r from-[#1A1A1A]/20 to-[#1A1A1A]/10 border border-white/10 p-8 lg:p-12 backdrop-blur-sm relative overflow-hidden">
				<h3 class="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
					Inspirálódj munkáinkból!
				</h3>

				<p class="text-white/70 font-light leading-relaxed mb-8">
					Minden autó egyedi történet. Nézd meg, hogyan változtattuk át ügyfeleink járműveit valódi ékszerekké.
				</p>

				<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <a
  href="#contact"
  class="px-8 py-4 bg-accent text-white font-semibold hover:bg-accent/90 transition-colors duration-300 relative overflow-hidden group"
>
						<span class="relative z-10">Kérj Ajánlatot</span>
					</a>

  <a
  href="tel:+36703339809"
  class="px-8 py-4 border border-white/30 text-white hover:border-accent hover:text-accent font-medium transition-all duration-300 flex items-center gap-2"
>
						<span>06 70 333 9809</span>
						<span>📞</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>