<script>
import { onMount } from 'svelte'
import {MDCTopAppBar} from '@material/top-app-bar'
export let segment

let element;

onMount(() => {
	const topAppBar = new MDCTopAppBar(element)
})

</script>

<style>

</style>

<!-- <nav>
	<ul>
		<li><a class:selected='{segment === undefined}' href='.'>home</a></li>
		<li><a class:selected='{segment === "about"}' href='about'>about</a></li>

		for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen
		<li><a rel=prefetch class:selected='{segment === "blog"}' href='blog'>blog</a></li>
	</ul>
</nav>
 -->

<header id="main-navbar" class="mdc-top-app-bar mdc-top-app-bar--fixed" bind:this={element}>
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
      <span class="mdc-top-app-bar__title">Słownik Romski</span>
    </section>
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
      <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Bookmark this page">
        filter_list
      </button>
    </section>
  </div>
</header>