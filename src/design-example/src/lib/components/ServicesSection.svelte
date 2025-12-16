<script lang="ts">
    import { onMount } from 'svelte'
    import type { SiteSettings } from '$lib/content'

    export let siteSettings: SiteSettings

    let container: HTMLElement
    let services: any[] = []
    let isMobile = false
    let isClient = false
    let scrollY = 0

    onMount(() => {
        isClient = true

        const checkMobile = () => {
            isMobile = window.innerWidth < 768
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        async function loadData() {
            try {
                const response = await fetch('/api/content/services');
                services = await response.json();
            } catch (error) {
                console.error('Error loading services:', error);
            }
        }

        loadData();

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    })

    // Calculate scroll progress and transforms
    $: containerRect = container?.getBoundingClientRect()
    $: scrollProgress = containerRect
        ? Math.max(
              0,
              Math.min(
                  1,
                  (window.innerHeight - containerRect.top) /
                      (window.innerHeight + containerRect.height),
              ),
          )
        : 0

    function getCardScale(index: number): number {
        const targetScale = 1 - index * 0.005
        const range = [index * 0.15, 1]
        const progress = Math.max(
            0,
            Math.min(1, (scrollProgress - range[0]) / (range[1] - range[0])),
        )
        return isMobile ? 1 : (!isClient ? 1 - index * 0.002 : 1 + progress * (targetScale - 1))
    }

    function getCardTop(index: number): string {
        return isMobile ? `${index * 20}px` : `calc(-2vh + ${index * 25}px)`
    }
</script>

<svelte:window bind:scrollY />

<section bind:this={container} id="services" class="relative md:bg-transparent bg-background">
    <!-- Header Section -->
    <div class="py-24 md:py-32 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 md:px-12 relative">
            <div class="mb-20">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                    <div class="space-y-6">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 bg-accent rounded-full"></span>
                            <span
                                class="text-accent/80 font-medium tracking-wider text-sm uppercase"
                            >
                                Szolgáltatások
                            </span>
                        </div>
                        <h2
                            class="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9]"
                        >
                            {siteSettings.servicesTitle}
                        </h2>
                    </div>
                    <div class="lg:text-right">
                        <p
                            class="text-lg text-white/70 font-light leading-relaxed max-w-lg lg:ml-auto"
                        >
                            {siteSettings.servicesSubtitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

     <!-- Cards Parallax Section -->
    <div class="relative">
        {#each services as service, i}
            <div
                style="transform: scale({getCardScale(i)}); top: {getCardTop(i)};"
                class={`flex ${isMobile ? 'min-h-[400px]' : 'md:h-screen'} items-center justify-center sticky`}
            >
                     <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
                         <a href={`/services/${service.metadata.slug}`} class="block">
                             <div
                                 class={`group relative bg-[#1A1A1A] border border-white/20 hover:border-accent/50 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl cursor-pointer ${
                                     isMobile ? 'mx-4' : (i % 2 === 0 ? 'md:rotate-[0.5deg]' : 'md:-rotate-[0.5deg]')
                                 }`}
                             >
                                 <!-- Corner accent element -->
                                 <div class="absolute top-6 right-6">
                                     <div class="w-12 h-12 border-2 border-accent/30 group-hover:border-accent/60 transition-all duration-500 flex items-center justify-center">
                                         <div class="w-6 h-6 bg-accent/20 group-hover:bg-accent/40 transition-all duration-500"></div>
                                     </div>
                                 </div>

                                 <div
                                     class={`flex flex-col justify-between ${isMobile ? 'p-4 min-h-[300px]' : 'p-6 md:p-8 lg:p-12 min-h-[400px]'}`}
                                 >
                                     <div class="flex-1 flex flex-col justify-center">
                                         <h3
                                             class="font-display text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300"
                                         >
                                             {service.metadata.title}
                                         </h3>
                                         <div
                                             class="w-16 h-[2px] bg-gradient-to-r from-accent to-accent/30 mb-4 group-hover:w-24 transition-all duration-500"
                                         ></div>
                                         <p
                                             class="text-white/70 font-light leading-relaxed text-base lg:text-lg mb-6"
                                         >
                                             {service.metadata.description}
                                         </p>
                                     </div>

                                     <div class="mt-6">
                                         <div
                                             class="bg-accent/10 px-4 py-2 border border-accent/20 backdrop-blur-sm inline-block mb-4"
                                         >
                                             <span class="text-accent font-semibold text-sm tracking-wide">
                                                 {service.metadata.price}
                                             </span>
                                         </div>
                                     </div>

                                     <div class="mt-6">
                                         <div
                                             class="absolute bottom-6 right-6 w-10 h-10 border border-accent/50 text-accent hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center"
                                         >
                                             <span class="text-xl transform group-hover:rotate-45 transition-transform duration-300">→</span>
                                         </div>
                                     </div>
                                 </div>

                                 <div
                                     class="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                 ></div>
                                 <div
                                     class="absolute bottom-0 right-0 w-32 h-32 border-t-2 border-l-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-500"
                                 ></div>
                             </div>
                         </a>
                     </div>
            </div>
        {/each}
    </div>

    <!-- Footer Section -->
    <div class="py-24 md:py-32 relative">
        <div class="max-w-7xl mx-auto px-6 md:px-12 relative">
            <div
                class="bg-gradient-to-r from-card/30 to-card/10 border border-white/10 p-8 lg:p-12"
            >
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 class="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                            Egyedi igények?
                        </h3>
                        <p class="text-white/70 font-light leading-relaxed">
                            Minden autó különleges. Kérj személyre szabott ajánlatot, hogy autód a
                            legjobb kezelést kapja.
                        </p>
                    </div>
                    <div class="lg:text-right">
                        <a
                            href="tel:{siteSettings.phone}"
                            class="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-semibold tracking-wide hover:bg-accent/90 transition-colors duration-300"
                        >
                            <span>Ajánlatkérés</span>
                            <span class="text-xl">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
