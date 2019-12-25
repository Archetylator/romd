<script>
import { onMount, createEventDispatcher } from 'svelte';

export let word;

onMount(() => {

});

</script>

<style>
  .word {
    width: 250px;
  }

  .mdc-card-content {
  
  }  

  .title-box {
    height: 30px;
    display: flex;
    align-items: center;
    padding: 15px;
  }

  .word-name {
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
  }

  .word-info {
    padding: 15px;
  }
</style>

<div class="word mdc-card">
  <div class="mdc-card-content">
    <div class="title-box">
      <h3 class="word-name">
        {word.singular}
      </h3>
      <span>rzeczowinik</span>
    </div>
      
    <div class="word-info">
      <ul>
        <li>l. poj. {word.singular}</li>
        <li>l. mn. {word.plural}</li>
      </ul>
    </div>
  </div>
</div>