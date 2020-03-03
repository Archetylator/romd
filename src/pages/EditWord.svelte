<script>
import { onMount } from 'svelte'
import { _ } from 'svelte-i18n'
import { dictionaryDB } from '../db/dictionary'
import WordForm from '../components/WordForm'
import Button, {Label} from '@smui/button';
import Paper, {Title, Subtitle, Content} from '@smui/paper';
import { goto } from '@sapper/app';
export let word

function handleCancel() {
  goto('/admin')
}

function handleSave(event) {
  let params = event.detail
  let doc

  dictionaryDB.get(event.detail.id).then(function (doc) {
    doc = doc
    let translatesTo = doc.translatesTo

    doc.singular = params.singular
    doc.plural = params.plural
    doc.kind = params.type
    doc.gender = params.gender
    doc.languageID = params.language
    doc.description = params.desc
    doc.translatesTo = params.translatesTo

    dictionaryDB.put(doc).then((newDoc) => {
      let toUpdate = doc.translatesTo.filter(x => !translatesTo.includes(x))
      let toDelete = translatesTo.filter(x => !doc.translatesTo.includes(x))

      toUpdate.forEach((relatedDocId) => {
        dictionaryDB.get(relatedDocId).then(function (relatedDoc) {
          relatedDoc.translatesTo.push(doc._id)
          return dictionaryDB.put(relatedDoc)
        })
      })

      toDelete.forEach((relatedDocId) => {
        dictionaryDB.get(relatedDocId).then(function (relatedDoc) {
          relatedDoc.translatesTo = relatedDoc.translatesTo.filter(e => e !== doc._id)
          return dictionaryDB.put(relatedDoc)
        })
      })

      goto('/admin')
    })
  })
}
</script>

<div class="pageWrapper">
  <Paper>
    <Title>{$_('new_word_title')}</Title>
    <Subtitle>{$_('edit_word_subtitle')}</Subtitle>
    <Content>
      <WordForm
        language={word.languageID}
        singular={word.singular}
        plural={word.plural}
        type={word.kind}
        gender={word.gender}
        desc={word.description}
        translatesTo={word.translatesTo}
        id={word._id}
        on:cancel={handleCancel} 
        on:save={handleSave} 
      />
    </Content>
  </Paper>
</div>