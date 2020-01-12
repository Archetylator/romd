<script>
import { onMount, createEventDispatcher } from 'svelte';
import { _ } from 'svelte-i18n'
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
export let language = null
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

.selectLabel {
  color: rgba(0,0,0,.6);
  background: #f5f5f5;
  font-size: 14px;
  line-height: 1.75rem;
  font-weight: 400;
  letter-spacing: .00124em;
}
</style>

{#await loadLangugesAndTranslations}

{:then data}
  <div>
    <form bind:this={form} on:submit|preventDefault>
      <div class="form-field">
        <Select bind:value={language} label={$_('language')} required class="fullwidth">
          <Option value=""></Option>
          {#each languages as lang}
            <Option value={lang.doc._id}>{$_(lang.doc.name)}</Option>
          {/each}
        </Select>
      </div>

      {#if language}
        <div class="form-field">
          <Select bind:value={type} label={$_('kind')} name="type" required class="fullwidth">
            <Option value=""></Option>
            {#each Object.entries(wordType) as t }
              <Option value={t[0]}>{$_(t[1])}</Option>
            {/each}
          </Select>
        </div>

        {#if type}
          <div class="form-field">
            <Select bind:value={gender} label={$_('gender')} class="fullwidth">
              <Option value=""></Option>
              {#each Object.entries(genderType) as t}
                <Option value="{t[0]}">{$_(t[1])}</Option>
              {/each}
            </Select>
          </div>

          <div class="form-field">
            <Textfield bind:value={singular} label={$_('singular')} input$required fullwidth/>
          </div>

          <div class="form-field">
            <Textfield bind:value={plural} label={$_('plural')} fullwidth/>
          </div>
          
          <div class="form-field">
            <div class="selectLabel">{$_('translates_to')}</div>
            <SvelteSelect loadOptions={loadOptionsForSearchSelect} {optionIdentifier} {getSelectionLabel} {getOptionLabel} bind:selectedValue={translations} isMulti={true}></SvelteSelect>
          </div>

          <div class="form-field">
            <Textfield bind:value={desc} label={$_('description')} textarea fullwidth />
          </div>
        {/if}
      {/if}
    </form>
    <Button on:click={onCancel}>
      <Label>{$_('cancel')}</Label>
    </Button>

    <Button on:click={onSave}>
      <Label>{$_('save')}</Label>
    </Button>
  </div>
{/await}
