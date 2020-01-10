<script context="module">
  import { dictionaryDB } from '../../../db/dictionary'

  export async function preload({ params, query }) {
    let word = await dictionaryDB.get(params.slug)
    console.log(word)
    return { word: await word }
  }
</script>

<script>
import { onMount } from 'svelte';

let pageComponent
export let word

onMount(async () => {
  const module = await import('../../../pages/EditWord.svelte');
  pageComponent = module.default;
});
</script>

<svelte:head>
  <title></title>
</svelte:head>

<svelte:component this={pageComponent} {word}/>
