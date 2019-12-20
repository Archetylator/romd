<script>
import Button from '../components/Button.svelte';
import TextField from '../components/TextField.svelte';
</script>

<style>
	.wrapper {
		padding: 100px 0 0;
		display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
	}

	.word {
		margin: 30px;
		min-height: 50px;
		width: 80%;
	}

	.mdc-card-content {
		padding: 15px;
	}
</style>

<svelte:head>
	<title>Romani Dictionary</title>
</svelte:head>


<div class="wrapper">
	<TextField/>
<div class="word mdc-card">
  <div class="mdc-card-content">авдинес - днес</div>
</div>

</div>

