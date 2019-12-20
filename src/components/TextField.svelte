<script>
import { onMount } from 'svelte';
import {MDCTextField} from '@material/textfield';

let element;

onMount(() => {
  const text = new MDCTextField(element);
});

</script>

<div bind:this={element} class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-trailing-icon">
  <input type="text" id="tf-outlined" class="mdc-text-field__input">
  <i class="material-icons mdc-text-field__icon" >search</i>
  <div class="mdc-notched-outline">
    <div class="mdc-notched-outline__leading"></div>
    <div class="mdc-notched-outline__notch">
      <label for="tf-outlined" class="mdc-floating-label">Search a word</label>
    </div>
    <div class="mdc-notched-outline__trailing"></div>
  </div>
</div>