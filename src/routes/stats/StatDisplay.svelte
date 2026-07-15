<script lang="ts">
  import type { Statistic } from "$lib/server/stats";
  import QuestionStats from "./QuestionStats.svelte";

  type Props = {
    statistic: Statistic;
  }
  const { statistic }: Props = $props();
</script>
<div class="w-full">
{#if statistic.kind === "factoid"}
  <h1>Did you know?</h1>
  <p>{statistic.value}</p>
{:else if statistic.kind === "question"}
  <QuestionStats {statistic} />
{:else if statistic.kind === "distros"}
  <h1>Distro recommendations</h1>
{:else if statistic.kind === "personaility"}
  <h1>Average personality</h1>
{/if}
</div>
<style>
  h1 {
    font-size: 1.5em;
  }
</style>
