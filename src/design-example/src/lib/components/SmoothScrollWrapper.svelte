<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';

	let { children }: { children: any } = $props();

	onMount(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	});
</script>

{@render children()}