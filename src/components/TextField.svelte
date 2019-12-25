<script>
import {MDCTextField} from '@material/textfield';
import { onMount, createEventDispatcher } from 'svelte';

let element;
let inputValue;
let timeout = null;

const dispatch = createEventDispatcher();

onMount(() => {
  const text = new MDCTextField(element);
});

function handleKeyUp(event) {
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    dispatch('submit', { value: inputValue } )
  }, inputValue.length == 0 ? 0 : 500);
}

</script>

<style>
  .form {
    width: 100%;
    padding: 0 0 10px 0;
  }
  .wrapper {
    height: 45px;
    width: 80%;
    margin: 0 10%;
  }

  .mdc-floating-label {

  }
</style>

<form class="form" on:submit|preventDefault={ () => {dispatch('submit', { value: inputValue } )} }>
  <div bind:this={element} class="wrapper mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
    <input type="text" id="tf-outlined" class="input mdc-text-field__input" on:keyup|preventDefault={handleKeyUp} bind:value={inputValue}>
    <i class="material-icons mdc-text-field__icon">search</i>
    <div class="mdc-notched-outline">
      <div class="mdc-notched-outline__leading"></div>

      <div class="mdc-notched-outline__trailing"></div>
    </div>
  </div>
</form>