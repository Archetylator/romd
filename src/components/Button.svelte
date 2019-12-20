<script>
import { onMount } from 'svelte';
import {MDCRipple} from '@material/ripple/index';

let element;

onMount(() => {
  const ripple = new MDCRipple(element);
});

</script>

<button bind:this={element} class="foo-button mdc-button mdc-ripple-surface">
  Button
</button>