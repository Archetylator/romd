<script>
import { onMount } from 'svelte'
import { _ } from 'svelte-i18n'
import { dictionaryDB } from '../db/dictionary'
import WordForm from '../components/WordForm'
import Button, {Label} from '@smui/button';
import Paper, {Title, Subtitle, Content} from '@smui/paper';
import { goto } from '@sapper/app';
function handleCancel() {
  goto('/admin')
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
    goto('/admin')
  }).catch(function (err) {
    console.log(err);
  })
}
</script>

<div class="pageWrapper">
  <Paper>
    <Title>{$_('new_word_title')}</Title>
    <Subtitle>{$_('new_word_subtitle')}</Subtitle>
    <Content>
      <WordForm on:cancel={handleCancel} on:save={handleSave}/>
    </Content>
  </Paper>
</div>