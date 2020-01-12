<script>
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n'
import Paper, {Title, Subtitle, Content} from '@smui/paper';

import { dictionaryDB, loadOptionsForSearchSelect, getWord, logIn, logOut } from '../db/dictionary'

let error

function handleLogIn(username, password) {
  logIn(username, password).then(() => {
    window.location.href = '/admin'
  }).catch(() => {
    
  })
}
</script>

<style>

</style>

<div class="pageWrapper">
  <Paper>
    <Title>{ $_('about_title') }</Title>
    <Subtitle>{ $_('about_subtitle') }</Subtitle>
    <Content>
      
    </Content>
  </Paper>
</div>