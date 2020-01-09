<script>
import { onMount, createEventDispatcher } from 'svelte';
import { dictionaryDB, loadOptionsForSearchSelect } from '../db/dictionary'
import { languageDB } from '../db/language'
import { wordType, genderType, wordTense } from '../utils/word'
import Textfield from '@smui/textfield'
import Select, {Option} from '@smui/select';
import SvelteSelect from 'svelte-select';
import Button, {Label} from '@smui/button';

const dispatch = createEventDispatcher()

let languages
let form

export let singular = ''
export let plural = ''
export let gender = null
export let desc = ''
export let type = null
export let language = null
export let translations = []

export let attributes = {
  singular: '',
  plural: ''
  gender: null,
  desc: '',
  type: null,
  language: null,
  translations: []
}

function onCancel(event) {
  dispatch('cancel', {
    _id: _id,
    _rev: _rev,
    date: event.detail.date
  });
}

function onSave(event) {
  dispatch('save', {
    _id: _id,
    _rev: _rev,
    date: event.detail.date
  });
}

onMount(() => {
  await languageDB.allDocs({
    include_docs: true
  }).then(function (result) {
    languages = result.rows
  })
})
</script>

<style>
.form-field {
  margin: 0 0 10px;
}
</style>

<div>
  <form bind:this={form} on:submit|preventDefault>
    <div class="form-field">
      <Select bind:value={language} label="Language" enhanced required>
        <Option value=""></Option>
        {#each languages as language}
          <Option value="{language.doc._id}">{language.doc.name}</Option>
        {/each}
      </Select>
    </div>

    {#if language}
      <div class="form-field">
        <Select bind:value={type} label="Type" enhanced required>
          <Option value=""></Option>
          <Option value="2">Noun</Option>
        </Select>
      </div>

      {#if type}
        <div class="form-field">
          <Textfield bind:value={singular} label="Singular"/>
        </div>

        <div class="form-field">
          <Textfield bind:value={plural} label="Plural"/>
        </div>

        <div class="form-field">
          <Select bind:value={gender} label="Gender" enhanced required>
            <Option value=""></Option>
            {#each Object.entries(genderType) as t}
              <Option value="{t[0]}">{t[1]}</Option>
            {/each}
          </Select>
        </div>
        
        <div class="form-field">
          <SvelteSelect loadOptions={loadOptionsForSearchSelect} bind:selectedValue={translations} isMulti={true}></SvelteSelect>
        </div>

        <div class="form-field">
          <Textfield bind:value={desc} label="Description" textarea />
        </div>
      {/if}
    {/if}
  </form>
  <Button on:click={onCancel}>
    <Label>Cancel</Label>
  </Button>

  <Button on:click={onSave}>
    <Label>Create</Label>
  </Button>
</div>
