<script>
import { onMount } from 'svelte';
import {MDCDialog} from '@material/dialog';

export let dialog;

export function open() {
  dialog.open = true
}

onMount(() => {
  dialog = new MDCDialog(dialog);
});

</script>

<div class="mdc-dialog" bind:this={dialog}>
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface">
      <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
      <h2 class="mdc-dialog__title" id="my-dialog-title"></h2>
      <div class="mdc-dialog__content" id="my-dialog-content">
        <slot></slot>
      </div>
    </div>
  </div>
  <div class="mdc-dialog__scrim"></div>
</div>