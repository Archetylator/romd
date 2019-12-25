<script>
import { onMount } from 'svelte';
import Button from './Button.svelte'
import TextField from './TextField.svelte'
import WordCard from './WordCard.svelte'
import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'

import { MDCLinearProgress } from '@material/linear-progress';

let progressbar;
let progressbarElement;
let timeout = null;

PouchDB.plugin(PouchFind)

let db = new PouchDB('dictionary')
let remoteDB = new PouchDB('http://localhost:5984/dictionary')
let loading = false
let query;

db.replicate.from(remoteDB)

let words = []

function handleSubmit(event) {
  query = event.detail.value

  if (query.length < 1) {
    words = []
    return false
  }

  timeout = setTimeout(function () {
    loading = true
  }, 200);

  db.find({
    selector: 
    {
      "$or": [
        { singular: { "$regex": `^${query}` } },
        { plural: { "$regex": `^${query}` } }
      ]
    },
    fields: ['_id', 'singular', 'plural', 'translatesTo'],
  }).then((foundWords) => {
    let query = []

    foundWords.docs.forEach((word) => {
      if (word.translatesTo) {
        word.translatesTo.forEach(function(entry) {
          query.push({ singular: entry })
        })
      }
    })

    db.find({
      selector: 
      {
        "$or": query
      },
      fields: ['_id', 'singular', 'plural', 'translatesTo'],
    })
    .then(function (result) {
      clearTimeout(timeout)
      loading = false
      words = result.docs
    })
  })
}

onMount(() => {

})
</script>

<style>
  .wrapper {
    padding: 56px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .search-box {
    background: #fff;
    padding: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>

<div class="wrapper">
  <div class="search-box">
    <TextField on:submit={handleSubmit}/>
  </div>

  {#if loading && query.length > 0}
    <div role="progressbar" bind:this={progressbarElement} class="mdc-linear-progress mdc-linear-progress--indeterminate">
      <div class="mdc-linear-progress__buffering-dots"></div>
      <div class="mdc-linear-progress__buffer"></div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
    </div>
  {/if}

  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      {#each words as word }
        <div class="mdc-layout-grid__cell">
          <WordCard word={word}/>
        </div>
      {/each}
    </div>
  </div>
</div>