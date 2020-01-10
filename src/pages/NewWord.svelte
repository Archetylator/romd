<script>
import { onMount } from 'svelte'
import { _ } from 'svelte-i18n'
import { dictionaryDB } from '../db/dictionary'
import WordForm from '../components/WordForm'
import Button, {Label} from '@smui/button';
import Paper, {Title, Subtitle, Content} from '@smui/paper';

function handleCancel() {
  window.location.href = '/admin'
}

function handleSave(event) {
  let params = event.detail

  dictionaryDB.post({
    singular: params.singular,
    plural: params.plural,
    kind: params.type,
    gender: params.gender,
    languageID: params.language,
    description: params.desc,
    translatesTo: params.translatesTo
  }).then(function (response) {
    params.translatesTo.forEach((relatedDocId) => {
      dictionaryDB.get(relatedDocId).then(function (relatedDoc) {
        relatedDoc.translatesTo.push(response.id)
        return dictionaryDB.put(relatedDoc)
      })
    })
    window.location.href = '/admin'
  }).catch(function (err) {
    console.log(err);
  })
}
</script>

<svelte:head>
  <title>New Word</title>
</svelte:head>

<div class="pageWrapper">
  <Paper>
    <Title>Word Form</Title>
    <Subtitle>Here you can create new words.</Subtitle>
    <Content>
      <WordForm on:cancel={handleCancel} on:save={handleSave}/>
    </Content>
  </Paper>
</div>