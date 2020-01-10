<script>
import { onMount, createEventDispatcher } from 'svelte';
import { dictionaryDB, loadOptionsForSearchSelect, getWord } from '../db/dictionary'
import { languageDB, getLanguages } from '../db/language'
import { wordType, genderType, wordTense } from '../utils/word'
import Textfield from '@smui/textfield'
import Select, {Option} from '@smui/select';
import SvelteSelect from 'svelte-select';
import Button, {Label} from '@smui/button';

const dispatch = createEventDispatcher()

let languages = []
let form

export let singular = ''
export let plural = ''
export let gender = null
export let desc = ''
export let type = null
export let language = ''
export let translations = []
export let translatesTo = []
export let id;

let selectedValue;
let items

const optionIdentifier = '_id'
const getOptionLabel = (option) => option.singular
const getSelectionLabel = (option) => option.singular

function onCancel(event) {
  dispatch('cancel');
}

function onSave(event) {
  if (form.checkValidity() ) {
    let translatesTo = translations ? translations.map((t) => { return t._id }) : []

    dispatch('save', {
      singular,
      plural,
      gender,
      desc,
      type,
      language,
      translatesTo,
      id
    })
  }
}

const loadLangugesAndTranslations = (async () => { 
  languages = await getLanguages()

  if (id) {
    translations = await dictionaryDB.find({
      selector: {
        _id: { $in: translatesTo }
      } 
    }).then((result) => { return result.docs })
  }
})()

onMount(async () => {

})
</script>

<style>
.form-field {
  margin: 0 0 10px;
}
</style>

{#await loadLangugesAndTranslations}

{:then data}
  <div>
    <form bind:this={form} on:submit|preventDefault>
      <div class="form-field">
        <Select bind:value={language} label="Language" enhanced required>
          <Option value=""></Option>
          {#each languages as lang}
            <Option value={lang.doc._id}>{lang.doc.name}</Option>
          {/each}
        </Select>
      </div>

      {#if language}
        <div class="form-field">
          <Select bind:value={type} label="Type" enhanced required>
            <Option value=""></Option>
            {#each Object.entries(wordType) as t }
              <Option value={t[0]}>{t[1]}</Option>
            {/each}
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
            <Label>Translates to:</Label>
            <SvelteSelect loadOptions={loadOptionsForSearchSelect} {optionIdentifier} {getSelectionLabel} {getOptionLabel} bind:selectedValue={translations} isMulti={true}></SvelteSelect>
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
      <Label>Save</Label>
    </Button>
  </div>
{/await}
