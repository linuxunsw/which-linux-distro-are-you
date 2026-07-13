<script lang="ts">
  import type { Question } from '$lib/questions';

  const allowedAnswers = [0, 1, 2, 3, 4] as const;
  const defaultBounds = ['Disagree', 'Agree'] as const;

  type Props = {
    q: Question,
    onsubmit: (a: typeof allowedAnswers[number]) => void,
  };

  const { q, onsubmit: onSubmit }: Props = $props();
</script>

<h2>{q.q}</h2>

<div>
  {(q.bounds ?? defaultBounds)[0]}
  {#each allowedAnswers as i (i)}
    <button onclick={() => onSubmit(i)}>{i + 1}</button>
  {/each}
  {(q.bounds ?? defaultBounds)[1]}
</div>
