<script>
import { onMount } from 'svelte'
import { _ } from 'svelte-i18n'
import Checkbox from '@smui/checkbox'
import FormField from '@smui/form-field'
import DataTable, {Head, Body, Row, Cell} from '@smui/data-table'
import TextField from '../components/TextField.svelte'
import WordCard from '../components/WordCard.svelte'
import Modal from '../components/Modal.svelte'
import List, {Item, Graphic, Meta, Text, PrimaryText, SecondaryText, Separator} from '@smui/list';
import PouchDB from 'pouchdb'
import PouchFind from 'pouchdb-find'
import PouchAuth from 'pouchdb-authentication'
import { wordType, genderType, wordTense } from '../utils/word'
import Button, {Label} from '@smui/button';
import { dictionaryDB } from '../db/dictionary'
import {languageDB} from '../db/language'
import { MDCLinearProgress } from '@material/linear-progress';

import Paper, {Title, Subtitle, Content} from '@smui/paper';

let progressbar
let progressbarElement
let timeout = null
let languages = []
let langsModal
let typeModal
let checkedAll = true
let selected = []
let selectedLanguages = []

languageDB.allDocs({
  include_docs: true
}).then(function (result) {
  result.rows.forEach((lang) => {
    languages[lang.doc._id] = lang.doc.name
  })
})

dictionaryDB.allDocs({
  include_docs: true
}).then(function (result) {
  words = result.rows
})

let loading = false
let query;

let words = []

function handleDelete(id) {
  dictionaryDB.get(id).then(function (doc) {
    dictionaryDB.remove(doc).then(() => {
      doc.translatesTo.forEach((relatedDocId) => {
        dictionaryDB.get(relatedDocId).then(function (relatedDoc) {
          relatedDoc.translatesTo = relatedDoc.translatesTo.filter(e => e !== doc._id)
          return dictionaryDB.put(relatedDoc)
        })
      })
    })
    words = words.filter(function(doc) {
      if (doc.id == id) {
        return false
      }
      return true
    })
  })
}

onMount(() => {
})
</script>

<style>
  .wrapper {
    padding: 80px 20px 0;
  }

  .index {
    border: 1px solid rgba(0,0,0,.12);
  }

  .index li {
    border-bottom: 1px solid;
  }

  .icon {
    margin-left: 3px;
    color: rgba(0,0,0,.38);
  }

  .icon i {
    font-size: 21px;
  }
</style>

<div class="wrapper">
  <Paper>
    <Title>{ $_('admin_index') }</Title>
    <Subtitle></Subtitle>
    <Content>
      <List class="index" twoLine nonInteractive>
        {#each words as word }
          {#if word.doc.singular !== undefined }
            <Item>
              <Text>
                <PrimaryText>{ word.doc.singular }</PrimaryText>
                <SecondaryText>{ $_(languages[word.doc.languageID] || '') } / { $_(wordType[word.doc.kind]) }</SecondaryText>
              </Text>
              <Meta>
                <a class="icon" href="/words/edit/{ word.doc._id }">
                  <i class="material-icons">edit</i>
                </a>
                <a class="icon" href="" on:click|preventDefault={() => { handleDelete(word.doc._id) } }>
                  <i class="material-icons">delete</i>
                </a>
              </Meta>
            </Item>
          {/if}
        {/each}
      </List>
    </Content>
  </Paper>
</div>