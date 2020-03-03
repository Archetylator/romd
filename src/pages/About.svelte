<script>
import { onMount } from 'svelte';
import { _ } from 'svelte-i18n'
import Paper, {Title, Subtitle, Content} from '@smui/paper';
</script> 

<style>

</style>

<div class="pageWrapper">
  <Paper>
    <Title>{ $_('about_title') }</Title>
    <Subtitle>{ $_('about_subtitle') }</Subtitle>
    <Content>
      <p>{ $_('about_p') }</p>

      <h5>{ $_('about_privacy_title') }</h5>
      <p>{ $_('about_privacy') }</p>
    </Content>
  </Paper>
</div>