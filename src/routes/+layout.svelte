<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';

  import { ModeWatcher } from 'mode-watcher';
  import SiteHeader from '$lib/components/site-header.svelte';
  const { children } = $props();
</script>

<ModeWatcher />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex h-screen w-full mx-auto max-w-7xl items-center justify-center flex-col px-4">
  <SiteHeader />
  <main class="flex-1 flex-col flex">
    {@render children()}
  </main>
</div>
