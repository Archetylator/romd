<script>
import { onMount } from 'svelte';

let Landing;

onMount(async () => {
  const module = await import('../components/Landing.svelte');
  Landing = module.default;
});
</script>

<svelte:head>
	<title>Romani Dictionary</title>
</svelte:head>

<svelte:component this={Landing} />
