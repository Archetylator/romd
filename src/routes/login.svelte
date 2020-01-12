<script>
import { onMount } from 'svelte';

let pageComponent;

onMount(async () => {
  const module = await import('../pages/Login.svelte');
  pageComponent = module.default;
});
</script>

<svelte:component this={pageComponent} />