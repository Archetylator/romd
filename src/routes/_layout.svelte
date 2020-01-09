<script context="module">
  import '../i18n'
  import { waitLocale } from 'svelte-i18n'

  export async function preload() {
    // awaits for the loading of the 'en-US' and 'en' dictionaries
    return waitLocale()
  }
</script>

<script>
	import Nav from '../components/Nav.svelte';
	export let segment;
</script>

<style lang="scss" global>
  @import "./styles/global.scss";
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>