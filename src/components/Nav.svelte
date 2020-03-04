<script>
import { onMount } from 'svelte'
import { _ } from 'svelte-i18n'
import {MDCTopAppBar} from '@material/top-app-bar'
export let segment
import { getCookie } from '../utils/cookies'
import {MDCList} from "@material/list";
import {MDCDrawer} from "@material/drawer";
import {MDCMenu} from '@material/menu';
import { logOut, getCurrentUser } from '../db/dictionary'
import { goto } from '@sapper/app';

let element;
let drawer;
let menu;
let storageLocal

export let currentUser

onMount(async () => {
	const topAppBar = new MDCTopAppBar(element)
  MDCList.attachTo(document.querySelector('.mdc-list'));
  drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
  menu = new MDCMenu(document.querySelector('.mdc-menu'));
})


function logout() {
  logOut().then(() => {
    currentUser = null
    drawer.open = false
    goto('/')
  })
}
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

<aside class="mdc-drawer mdc-drawer--modal">
  <div class="mdc-drawer__header">
    <h3 class="mdc-drawer__title">{$_('app_name')}</h3>
  </div>
  <div class="mdc-drawer__content">
    <nav class="mdc-list">
      <a rel=prefetch class="mdc-list-item" class:mdc-list-item--activated='{segment === undefined}' href="." on:click={() => {drawer.open = false }}>
        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">search</i>
        <span class="mdc-list-item__text">{$_('search')}</span>
      </a>
    </nav>
    <hr class="mdc-list-divider">

    <a rel=prefetch class="mdc-list-item" class:mdc-list-item--activated='{segment === "about"}' href="about" on:click={() => {drawer.open = false }}>
      <i class="material-icons mdc-list-item__graphic" aria-hidden="true">info</i>
      <span class="mdc-list-item__text">{$_('about')}</span>
    </a>

    {#if currentUser }
      <a rel=prefetch class="mdc-list-item" class:mdc-list-item--activated='{segment === "admin"}' href="admin" on:click={() => {drawer.open = false }}>
        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">build</i>
        <span class="mdc-list-item__text">{$_('admin')}</span>
      </a>
    {:else }
      <a rel=prefetch class="mdc-list-item" class:mdc-list-item--activated='{segment === "login"}' href="login" on:click={() => {drawer.open = false }}>
        <i class="material-icons mdc-list-item__graphic" aria-hidden="true">supervised_user_circle</i>
        <span class="mdc-list-item__text">{$_('login')}</span>
      </a>
    {/if}
    
    {#if currentUser }
      <div style="position: absolute; bottom: 0; padding: 15px 15px;">
        <small style="font-size: 13px">Hello {currentUser.name}! <a style="color: blue; cursor: pointer;" on:click={logout}>Logout</a></small>
      </div>
    {/if}
  </div>
</aside>

<div class="mdc-drawer-scrim"></div>  

<header id="main-navbar" class="mdc-top-app-bar mdc-top-app-bar--fixed" bind:this={element}>
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" on:click={ () => { drawer.open = !drawer.open } }>menu</button>
      <span class="mdc-top-app-bar__title">{ segment ? $_(segment) : $_('search') }</span>
    </section>
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
      <div class="mdc-menu-surface--anchor">
        {#if segment === 'admin'}
          <a class="mdc-top-app-bar__action-item mdc-icon-button" href="/words/new">
            <i class="material-icons">add</i>
          </a>
        {/if}
        <div class="mdc-menu mdc-menu-surface">
          <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            <li class="mdc-list-item" role="menuitem">
              <span class="mdc-list-item__text">Bulgarian</span>
            </li>
            <li class="mdc-list-divider" role="separator"></li>
            <li class="mdc-list-item" role="menuitem">
              <span class="mdc-list-item__text">Romani</span>
            </li>
            <li>
              <ul class="mdc-menu__selection-group">
                <li class="mdc-list-item" role="menuitem">
                  <span class="mdc-list-item__text">Fichiri</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</header>