<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { ChevronRight } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import type { SiteSettings } from '$lib/content';

	export let siteSettings: SiteSettings;

	let container: HTMLElement;
	let bgElement: HTMLElement;
	let isMobile = false;
	let isClient = false;

	onMount(() => {
		isClient = true;

		const checkMobile = () => {
			isMobile = window.innerWidth < 768;
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		const updateParallax = () => {
			if (!bgElement) return;

			const scrolled = window.pageYOffset;
			const heroHeight = container?.offsetHeight || window.innerHeight;
			const maxParallax = heroHeight * 0.5; // Only move up to 50% of hero height
			const parallax = Math.max(-maxParallax, -scrolled * 0.3);
			bgElement.style.transform = `translate3d(0, ${parallax}px, 0)`;
		};

		if (browser) {
			// Initial call to set correct position immediately
			requestAnimationFrame(() => {
				updateParallax();
			});

			window.addEventListener('scroll', updateParallax, { passive: true });
		}

		return () => {
			window.removeEventListener('resize', checkMobile);
			if (browser) {
				window.removeEventListener('scroll', updateParallax);
			}
		};
	});

	// Handle SvelteKit navigation
	$: if ($navigating === null && browser) {
		// Navigation just finished, update parallax immediately
		tick().then(() => {
			requestAnimationFrame(() => {
				if (bgElement) {
					const scrolled = window.pageYOffset;
					const heroHeight = container?.offsetHeight || window.innerHeight;
					const maxParallax = heroHeight * 0.5;
					const parallax = Math.max(-maxParallax, -scrolled * 0.3);
					bgElement.style.transform = `translate3d(0, ${parallax}px, 0)`;
				}
			});
		});
	}
</script>

<section
	bind:this={container}
	class="relative h-screen overflow-hidden"
>
	<!-- Background Image -->
	{#if isClient}
		<div
			bind:this={bgElement}
			class="absolute w-full will-change-transform {isMobile ? 'top-0 left-0 h-[130vh]' : 'top-0 left-0 h-[150vh]'}"
		>
			<img
				src={siteSettings.heroBackgroundImage}
				alt="CarPit Garage Background"
				class="w-full h-full object-cover brightness-75"
			/>
		</div>
	{/if}

	<!-- Premium gradient overlay -->
	<div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70 z-10"></div>
	<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>

	<div class="flex items-center justify-center h-full py-8 md:py-12 px-4 sm:px-6 md:px-12 relative z-20">
		<div class="max-w-6xl w-full flex flex-col items-center justify-center gap-3 md:gap-6 text-center">
			<!-- Enhanced typography with luxury spacing -->
			<div class="space-y-2 md:space-y-3">
				<div class="space-y-1 md:space-y-2">
					<div class="text-accent/80 font-medium tracking-[0.2em] text-xs sm:text-sm md:text-base uppercase mb-1 md:mb-2">
						{siteSettings.heroTitle}
					</div>

					<!-- Logo -->
					<div class="flex justify-center mb-2 md:mb-3">
						<img
							src={siteSettings.heroLogo}
							alt="CarPit Garage Logo"
							class="h-28 sm:h-36 md:h-48 lg:h-56 xl:h-64 w-auto object-contain brightness-0 saturate-100"
							style="filter: invert(27%) sepia(96%) saturate(5471%) hue-rotate(355deg) brightness(104%) contrast(94%)"
						/>
					</div>
				</div>

				<div class="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>

				<div class="text-white/80 font-light tracking-[0.15em] text-sm md:text-lg lg:text-xl uppercase">
					{siteSettings.heroSubtitle}
				</div>
			</div>

			<!-- Description -->
			<p class="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl font-light tracking-wide px-4">
				{siteSettings.heroDescription}
			</p>

			<!-- Call-to-action buttons -->
			<div class="flex flex-col w-full max-w-md mx-auto gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 mt-2 md:mt-3 px-4">
				<a
					href="tel:{siteSettings.phone}"
					class="group px-8 sm:px-10 py-4 sm:py-5 bg-accent text-white font-semibold text-base sm:text-lg border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl hover:shadow-accent/20 w-full sm:w-auto"
				>
					<span>Kapcsolat</span>
					<ChevronRight
						size={18}
						class="group-hover:translate-x-1 transition-transform duration-300"
					/>
				</a>
				<a
					href="#portfolio"
					class="px-8 sm:px-10 py-4 sm:py-5 text-white font-medium text-base sm:text-lg hover:bg-white/5 transition-all duration-300 border-2 border-white/30 hover:border-white/60 backdrop-blur-sm w-full sm:w-auto"
				>
					Portfólió
				</a>
				<a
					href="#services"
					class="px-8 sm:px-10 py-4 sm:py-5 text-white font-medium text-base sm:text-lg hover:bg-white/5 transition-all duration-300 border-2 border-white/30 hover:border-white/60 backdrop-blur-sm w-full sm:w-auto"
				>
					Szolgáltatások
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>