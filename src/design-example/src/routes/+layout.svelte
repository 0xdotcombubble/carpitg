<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>CarPit Garage - Professzionális Autóápolás</title>
	<meta name="description" content="Professzionális autókozmetika és detailing szolgáltatások Budapesten. Polírozás, kerámia bevonat, kárpittisztítás." />
	<link rel="icon" href="/favicon.ico" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<html lang="hu"></html>
</svelte:head>

{@render children()}
