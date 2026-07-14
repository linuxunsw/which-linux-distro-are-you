<script lang="ts">
  import type { QandA } from '$lib/analysis';
  import questions from '$lib/questions';
  import { sample } from '$lib/util';
  import Question from './Question.svelte';
  import Results from './Results.svelte';

  let quiz = $state(sample(questions, 10));
  let qandas: QandA[] = $state([]);

  function reset() {
    quiz = sample(questions, 10);
    qandas = [];
  }
</script>

{#if qandas.length < quiz.length}
  <Question
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
