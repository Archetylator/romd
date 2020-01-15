<script>
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n'
import Paper, {Title, Subtitle, Content} from '@smui/paper';
import Textfield from '@smui/textfield'
import Button, {Label} from '@smui/button';
import { dictionaryDB, loadOptionsForSearchSelect, getWord, logIn, logOut } from '../db/dictionary'
import { setCookie } from '../utils/cookies'
let error
let form
let username = ''
let password = ''

function onCancel() {
  window.location.href = '/'
}

function onSave() {
  logIn(username, password).then(() => {
    if (process.browser) {
      setCookie('username', username)
    }

    window.location.href = '/admin'
  }).catch((e) => {
    error = e.message
  })
}
</script>

<style>
  form {
    padding-bottom: 30px;
  }

  .error {
    padding: 5px;
    background: red;
    color: white;
    border: 1px solid pink;
    font-size: 13px;
    margin: 0 0 15px;
  }
</style>

<div class="pageWrapper">
  <Paper>
    <Title>{ $_('login_title') }</Title>
    <Subtitle>{ $_('login_p') }</Subtitle>
    <Content>
      <form bind:this={form} on:submit|preventDefault>
        {#if error} 
          <div class="error">
            { error }
          </div>
        {/if}
        <Textfield bind:value={username} label="Username" input$required fullwidth/>
        <Textfield bind:value={password} type="password" label="Password" input$required fullwidth/>
      </form>
      <Button on:click={onCancel}>
        <Label>{$_('cancel')}</Label>
      </Button>

      <Button on:click={onSave}>
        <Label>{$_('login')}</Label>
      </Button>
    </Content>
  </Paper>
</div>