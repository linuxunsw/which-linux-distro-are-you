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
    <p class="text-base italic">{distro[metric].rationale || '???'}</p>
  </Card.Content>
  <Card.Footer>
    <Button class="w-full md:w-auto md:ml-auto" size="lg" onclick={onreset}>Try again</Button>
  </Card.Footer>
</Card.Root>
