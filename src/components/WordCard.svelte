<script>
import { onMount, createEventDispatcher } from 'svelte';
import { _ } from 'svelte-i18n'
import { wordType, genderType, wordTense } from '../utils/word'
export let word;
export let language;

onMount(() => {

});

</script>

<style>
  .word {
    max-width: 800px;
    width: 100%;
    margin-bottom: 20px;
  }

  .mdc-card-content {
  
  }  

  .title-box {
    display: flex;
    align-items: center;
    padding: 15px 15px 5px;
    justify-content: space-between;
  }

  .word-name {
    font-weight: 600;
    font-size: 18px;
    text-transform: uppercase;
  }

dl {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  width: 300px;      /* set the container width*/
  overflow: visible;
  font-size: 15px;
}
dl dt {
  flex: 0 0 50%;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 500;
}
dl dd {
  flex:0 0 50%;
  margin-left: auto;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
}

  .word-info {
    padding: 0 15px 15px;
  }

  .word-attr {
    text-transform: uppercase;
    font-size: 12px;
  }

  .word-lang {
    padding: 5px 7px;
    background: cornflowerblue;
    color: #fff;
    font-size: 14px;
  }

  .word-numbers {
    padding: 15px 0 0 0;
  }
</style>

<div class="word mdc-card">
  <div class="mdc-card-content">
    <div class="title-box">
      <h3 class="word-name">
        {word.singular}
      </h3>
      <span class="word-lang">{ $_(language.name) }</span>
    </div>
    <div class="word-info">
      <span class="word-attr">
        { $_(wordType[word.kind]) } /
      </span>
      <span class="word-attr">
        { $_(genderType[word.gender]) }
      </span>

      <dl class="word-numbers">
        <dt>{$_('singular')}</dt>
        <dd>{ word.singular }</dd>
        <dt>{$_('plural')}</dt>
        <dd>{ word.plural }</dd>
      </dl>
    </div>
  </div>
</div>