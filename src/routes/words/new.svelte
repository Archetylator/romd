<script>
import { onMount } from 'svelte';

let pageComponent;
export let languages

onMount(async () => {
  const module = await import('../../pages/NewWord.svelte');
  pageComponent = module.default;
});
</script>

<svelte:head>
  <title>Romani Dictionary</title>
</svelte:head>

<svelte:component this={pageComponent} />