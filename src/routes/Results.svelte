<script lang="ts">
  import { getMatchingDistro, type QandA } from '$lib/analysis';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';

  type Props = {
    qandas: QandA[];
    onreset: () => void;
  };
  const { qandas, onreset }: Props = $props();

  const [distro, metric] = $derived(getMatchingDistro(qandas));
</script>

<Card.Root class="w-full max-w-lg">
  <Card.Header>
    <Card.Title class="text-2xl"
      >Your match is:<br /><span class="font-bold">{distro.name}</span></Card.Title
    >
  </Card.Header>
  <Card.Content>
    <p class="text-2xl text-center italic">{distro[metric].rationale || '???'}</p>
    <br>
    <p class="text-base">Don't worry, that was just a joke, we love you.</p>
    <p class="text-base">If you found the joke funny, take a screenshot and share it.</p>
    <p class="text-base">If you didn't find the joke funny, <a href="https://linuxunsw.org" target="_blank">join LinSoc</a> so we can apologise.</p>
  </Card.Content>
  <Card.Footer>
    <Button class="w-full md:w-auto md:ml-auto" size="lg" onclick={onreset}>Try again</Button>
  </Card.Footer>
</Card.Root>

<style>
  p {
    margin: 10px 0px;
  }

  a {
    color: var(--primary);
  }
  a:hover {
    text-decoration: underline;
  }
</style>
