<script lang="ts">
  import type { QandA } from '$lib/analysis';
  import questions from '$lib/questions';
  import { sample } from '$lib/util';
  import Question from './Question.svelte';
  import Results from './Results.svelte';
  import Welcome from './Welcome.svelte';

  let quiz = $state(sample(questions, 10));
  let qandas: QandA[] = $state([]);

  let started = $state(false);

  function reset() {
    quiz = sample(questions, 10);
    qandas = [];
  }
</script>

{#if !started}
  <Welcome onstart={() => {started = true;}} />
{:else if qandas.length < quiz.length}
  <Question
    qNum={qandas.length}
    q={quiz[qandas.length]}
    onsubmit={(a) => {
      qandas.push({
        q: quiz[qandas.length],
        a,
      });
    }}
  />
{:else}
  <Results {qandas} onreset={reset} />
{/if}
