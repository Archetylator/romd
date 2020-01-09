<script>
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n'
import Checkbox from '@smui/checkbox';
import FormField from '@smui/form-field';
import TextField from '../components/TextField.svelte'
import WordCard from '../components/WordCard.svelte'
import Modal from '../components/Modal.svelte'
import List, {Item, Text} from '@smui/list';
import { wordType, genderType, wordTense } from '../utils/word'
import Dialog, {Title, Content, Actions} from '@smui/dialog';
import Button, {Label} from '@smui/button';
import { dictionaryDB } from '../db/dictionary'
import { translateDB } from '../db/translate'
import { languageDB } from '../db/language'

import { MDCLinearProgress } from '@material/linear-progress';

let progressbar
let progressbarElement
let timeout = null
let languages = []
let langsModal
let typeModal
let checkedAll = true
let selectedTypes = []
let selectedTypesTmp = []
let selectedLanguages = []
let selectedLanguagesTmp = []

languageDB.allDocs({
  include_docs: true
}).then(function (result) {
  languages = result.rows
})

let loading = false
let query;

let words = []

function handleSubmit(event) {
  query = event.detail.value
  search()
}

function search() {
  if (query.length < 1) {
    words = []
    return false
  }

  timeout = setTimeout(function () {
    loading = true
  }, 200);

  let filters = [ 
    { singular: { "$regex": `^${query}` } },
    { plural: { "$regex": `^${query}` } }
  ]

  dictionaryDB.find({
    selector: {
      "$or": filters
    },
    fields: ['_id']
  }).then((foundWords) => {
    let query = []

    if (foundWords.docs.length == 0) {
      clearTimeout(timeout)
      loading = false
      words = []
      return
    }

    foundWords.docs.forEach((word) => {
      if (word._id) {
        translateDB.find({
          selector: {
            "$or": [
              { two: word._id },
              { one: word._id }
            ]
          },
          fields: ['one', 'two']
        }).then((trans) => {
          trans.docs.forEach(function(translate) {
            let q = {"_id": (word._id == translate.one ? translate.two : translate.one )}

            if (selectedLanguages.length > 0) {
              q["languageID"] = { "$in": selectedLanguages }
            }

            if (selectedTypes.length > 0) {
              q["kind"] = { "$in": selectedTypes }
            }

            query.push(q)
          })
        }).then(() => {
          dictionaryDB.find({
            selector: 
            {
              "$or": query
            },
            fields: ['_id', 'singular', 'plural', 'kind', 'gender', 'languageID'],
          })
          .then(function (result) {
            clearTimeout(timeout)
            loading = false
            words = result.docs
          })
        })
      } else {
        clearTimeout(timeout)
        loading = false
      }
    })
  })
}

function openModal() {
  if (!langsModal) {
    return false
  }
  langsModal.open()

}

onMount(() => {
  
})
</script>

<style>
  .wrapper {
    padding: 56px 0 0;

  }

  .search-box {
    background: #fff;
    padding: 10px 0;
   
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .empty {
    padding: 160px 0 0 0;
    text-align: center;
    color: rgba(86, 86, 86, 0.87);
  }

  .empty h5 {
    font-weight: 600;
/*    text-transform: uppercase;*/
    font-size: 24px;
    margin-bottom: 10px;
  }

  .word-type {
    text-transform: capitalize;
  }
</style>

<Dialog
  bind:this={langsModal}
>
  <Content id="dialog-content">
  <List>
    {#each languages as language}
      <Item>
        <FormField>
          <Checkbox value={language.doc._id} bind:group={selectedLanguagesTmp}/>
          <span slot="label">{language.doc.name}</span>
        </FormField>
      </Item>
    {/each}
  </List>
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={() => { selectedLanguages = selectedLanguagesTmp.slice(); search() }}>
      <Label>Filter</Label>
    </Button>
  </Actions>
</Dialog>

<Dialog
  bind:this={typeModal}
>
  <Content id="dialog-content">
    {#each Object.entries(wordType) as t }
      <div>
        <FormField>
          <Checkbox value={t[0]} bind:group={selectedTypesTmp}/>
          <span slot="label">{t[1]}</span>
        </FormField>
      </div>
    {/each}

  </Content>
  <Actions>
    <Button>
      <Label>Close</Label>
    </Button>
    <Button on:click={() => { selectedTypes = selectedTypesTmp.slice(); search() }}>
      <Label>Filter</Label>
    </Button>
  </Actions>
</Dialog>

<div class="wrapper">
  <div class="search-box">
    <TextField on:submit={handleSubmit}/>
    <div style="flex: 1; margin: 15px 26px;">
      <div class="mdc-chip" role="row" on:click={ openModal }>
        <div class="mdc-chip__ripple"></div>
        <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">language</i>
        <span role="gridcell">
          {#if selectedLanguages.length > 0} 
            <span role="button" tabindex="0" class="mdc-chip__text word-type">
            {#each selectedLanguages as languageID }
              { languages.find(item => item.doc._id === languageID).doc.name + " "}
            {/each}
          </span>
          {:else}
            <span role="button" tabindex="0" class="mdc-chip__text">Języki</span>
          {/if}
        </span>
      </div>  

      <div class="mdc-chip" role="row" on:click={ typeModal.open }>
        <div class="mdc-chip__ripple"></div>
        <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">label</i>
        <span role="gridcell">
          {#if selectedTypes.length > 0} 
            <span role="button" tabindex="0" class="mdc-chip__text word-type">
              {#each selectedTypes as typeID }
                { wordType[typeID] + " " }
              {/each}
            </span>
          {:else}
            <span role="button" tabindex="0" class="mdc-chip__text">Część mowy</span>
          {/if}
        </span>
      </div> 
    </div>
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



  {#if words.length == 0}
    <div class="empty">
      <h5>No results so far</h5>
      <p>Please use the search bar for words finding</p>
    </div>
  {:else}

  {/if}

  <div style="padding: 20px;">
    {#each words as word }
      <WordCard word={word} language={languages.find(item => item.doc._id === word.languageID).doc}/>
    {/each}
  </div>
</div>