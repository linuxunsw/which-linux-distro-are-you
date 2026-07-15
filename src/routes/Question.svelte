<script lang="ts">
  import type { Question } from '$lib/questions';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import { Button } from '$lib/components/ui/button/index.js';

  const allowedAnswers = [0, 1, 2, 3, 4] as const;
  const defaultBounds = ['Disagree', 'Agree'] as const;
  let selectedAnswer = $state('');
  let isSubmitting = $state(false);

  type Props = {
    q: Question;
    onsubmit: (a: (typeof allowedAnswers)[number]) => void;
  };

  function handleSubmit() {
    isSubmitting = true;
    onSubmit(parseInt(selectedAnswer) as (typeof allowedAnswers)[0]);
    selectedAnswer = '';
    isSubmitting = false;
  }

  const { q, onsubmit: onSubmit }: Props = $props();
</script>

<h2 class="text-2xl mb-4">{q.q}</h2>

<div class="flex flex-col space-y-2 space-x-4 text-sm">
  <p class="text-base">{(q.bounds ?? defaultBounds)[0]}</p>
  <RadioGroup.Root bind:value={selectedAnswer} class="flex justify-between px-2">
    {#each allowedAnswers as i (i)}
      <!-- <button onclick={() => onSubmit(i)}>{i + 1}</button> -->
      <div class="flex flex-col items-center space-y-2">
        <RadioGroup.Item
          value={i.toString()}
          id={`scale-${i}`}
          class="h-6 w-6 border-primary/50 text-primary focus-visible:ring-primary"
        />
        <Label for={`scale-${i}`} class="sr-only">Scale {i}</Label>
      </div>
    {/each}
  </RadioGroup.Root>
  <p class="ml-auto text-base text-right">{(q.bounds ?? defaultBounds)[1]}</p>
</div>
<div class="flex justify-end pt-4 border-t">
  <Button
    disabled={!selectedAnswer || isSubmitting}
    onclick={handleSubmit}
    class="w-full sm:w-auto"
  >
    {#if isSubmitting}
      Submitting...
    {:else}
      Submit
    {/if}
  </Button>
</div>
