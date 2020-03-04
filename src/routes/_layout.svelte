<script context="module">
  import '../i18n'
  import { waitLocale } from 'svelte-i18n'
  import { getCurrentUser } from '../db/dictionary'

  export async function preload() {
    let currentUser = await getCurrentUser()
    return {waitLocale, currentUser}
  }
</script>

<script>
	import Nav from '../components/Nav.svelte'
  import { onMount } from 'svelte'

	export let segment
  export let currentUser

  onMount(async () => {
    let currentUser = await getCurrentUser()
  })
</script>

<style lang="scss" global>
  @import "./styles/global.scss"
</style>

<Nav {segment} {currentUser} />

<main>
	<slot></slot>
</main>