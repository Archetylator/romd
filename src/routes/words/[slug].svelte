<script context="module">
	import { dictionaryDB } from '../../db/dictionary'

	export async function preload({ params, query }) {
		const doc = await dictionaryDB.get(params.slug)
		return { word: doc }
	}
</script>

<script>
import { onMount } from 'svelte'
import { _ } from 'svelte-i18n'

export let word;
</script>

<style>
</style>

<svelte:head>
	<title>{word.singular}</title>
</svelte:head>

<h1>{word.singular}</h1>

