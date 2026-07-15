<script lang="ts">
  import { getMatchingDistro, type QandA } from '$lib/analysis';

  type Props = {
    qandas: QandA[];
    onreset: () => void;
  };
  const { qandas, onreset }: Props = $props();

  const [distro, metric] = $derived(getMatchingDistro(qandas));
</script>

<h2>Your match is {distro.name}</h2>

<p><i>{distro[metric].rationale || '???'}</i></p>

<button onclick={onreset}>Try again</button>
