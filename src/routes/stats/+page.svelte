<script lang="ts">
  import QrCode from '$lib/assets/qr-code.svg?raw';
  import type { Statistic } from '$lib/server/stats';
  import { createQuery } from '@tanstack/svelte-query';
  import StatDisplay from './StatDisplay.svelte';

  const refetchInterval = 10_000;

  async function getStatistic(): Promise<Statistic> {
    const res = await fetch('/api/stat');
    const json = await res.json();
    return json;
  }

  const query = createQuery<Statistic>(() => ({
    queryKey: ['statistic'],
    queryFn: async () => getStatistic(),
    refetchInterval,
  }));
</script>

<main>
  <h1>Which Linux Distro Are You?</h1>
  <h2>Scan the QR code to find out!</h2>

  <div class="qr">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html QrCode}
  </div>

  <div class="stats w-full">
    <!-- TODO: Display statistics here -->
    {#if query.isLoading}
      <p>Loading a statistic...</p>
    {:else if query.error}
      <p>Failed to load statistic: {query.error.message}</p>
    {:else if query.isSuccess}
      <StatDisplay statistic={query.data} />
    {/if}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2rem;
  }

  .qr {
    width: 20rem;
    max-width: 90%;
  }

</style>
