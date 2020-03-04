<script>
import { onMount } from 'svelte';
import { getCurrentUser } from '../db/dictionary'
import { goto } from '@sapper/app';

let pageComponent;

onMount(async () => {
  getCurrentUser().then((currentUser) => {
    if (!currentUser) {
      goto('/')
    }
  })

  const module = await import('../pages/Admin.svelte');
  pageComponent = module.default;
});
</script>

<svelte:head>
  <title>Romani Dictionary</title>
</svelte:head>

<svelte:component this={pageComponent} />