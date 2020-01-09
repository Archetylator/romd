<script>
import { onMount } from 'svelte'
import { _ } from 'svelte-i18n'
import { dictionaryDB } from '../db/dictionary'
import { translateDB } from '../db/translate'
import WordForm from '../components/WordForm'
import Button, {Label} from '@smui/button';
import Paper, {Title, Subtitle, Content} from '@smui/paper';

function handleCancel() {
  window.location.href = '/admin'
}

function handleSave() {
  if ( form.checkValidity() ) {
    dictionaryDB.post({
      singular: singular,
      plural: plural,
      kind: type,
      gender: gender,
      languageID: language,
      description: desc
    }).then(function (response) {
      let array = translations.map((t) => {
        return { one: response.id, two: t.value }
      })
      translateDB.bulkDocs(
        array
      ).then(function (r) {
        window.location.href = '/admin'
      })
    }).catch(function (err) {
      console.log(err);
    })
  }
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