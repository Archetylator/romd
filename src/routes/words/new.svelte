<script context="module">
import { languageDB } from '../../db/language'

export async function preload({ params, query }) {
  let languages

  await languageDB.allDocs({
    include_docs: true
  }).then(function (result) {
    languages = result.rows
  })

  return { languages: languages }
}
</script>

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