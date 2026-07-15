<script lang="ts">
  import QrCode from '$lib/assets/qr-code.svg?raw';
</script>

<main>
  <h1>Which Linux Distro Are You?</h1>

  <div class="qr">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html QrCode}
  </div>

  <div class="stats">
    <!-- TODO: Display statistics here -->
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    height: 100vh;
  }

  main {
    /* TODO: update once main UI code is merged */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 10px;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .qr {
    width: 30rem;
    max-width: 90%;
  }

</style>
