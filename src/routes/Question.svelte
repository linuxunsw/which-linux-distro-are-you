<script lang="ts">
  import type { Question } from '$lib/questions';
  import { Label } from '$lib/components/ui/label/index.js';
  import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';

  const allowedAnswers = [0, 1, 2, 3, 4] as const;
  const defaultBounds = ['Disagree', 'Agree'] as const;
  let selectedAnswer = $state('');
  let isSubmitting = $state(false);
  import { Progress } from '$lib/components/ui/progress/index.js';
  import { NUM_QUESTIONS } from '$lib/const';

  type Props = {
    qNum: number;
    q: Question;
    onsubmit: (a: (typeof allowedAnswers)[number]) => void;
  };

  function handleSubmit() {
    isSubmitting = true;
    onSubmit(parseInt(selectedAnswer) as (typeof allowedAnswers)[0]);
    selectedAnswer = '';
    isSubmitting = false;
  }

  const { qNum, q, onsubmit: onSubmit }: Props = $props();
</script>

<Card.Root class=" w-full max-w-lg">
  <Card.Header>
    <Card.Title class="text-lg sm:text-xl md:text-2xl mb-4">{q.q}</Card.Title>
  </Card.Header>
  <Card.Content>
    <div class="flex flex-col space-y-2 space-x-4 text-sm">
      <p class="text-base">{(q.bounds ?? defaultBounds)[0]}</p>
      <RadioGroup.Root bind:value={selectedAnswer} class="flex justify-between px-2">
        {#each allowedAnswers as i (i)}
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
  </Card.Content>
  <Card.Footer>
    <Button
      disabled={!selectedAnswer || isSubmitting}
      onclick={handleSubmit}
      class="w-full md:w-auto md:ml-auto"
      size="lg"
    >
      {#if isSubmitting}
        Submitting...
      {:else}
        Submit
      {/if}
    </Button>
  </Card.Footer>
</Card.Root>

<footer class="mt-auto w-full py-4 mb-4 border-t">
  <p class="text-base text-center">Question {qNum}/{NUM_QUESTIONS}</p>
  <Progress class="mt-4" value={(qNum / NUM_QUESTIONS) * 100} />
</footer>
