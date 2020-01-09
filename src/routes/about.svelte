<script>
import { onMount } from 'svelte';

let pageComponent;

onMount(async () => {
  const module = await import('../pages/About.svelte');
  pageComponent = module.default;
});
</script>

<svelte:head>
  <title>Romani Dictionary</title>
</svelte:head>

<svelte:component this={pageComponent} />