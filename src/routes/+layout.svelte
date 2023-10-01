<script>
	import Navbar from '$lib/components/ui/navbar.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Bytes</title>
</svelte:head>

<Navbar />
<slot />
