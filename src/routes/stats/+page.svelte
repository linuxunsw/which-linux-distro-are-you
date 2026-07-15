<script lang="ts">
  import QrCode from '$lib/assets/qr-code.svg?raw';
</script>

<main>
  <h1>Which Linux Distro Are You?</h1>
  <h2>Scan the QR code to find out!</h2>

  <div class="qr">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html QrCode}
  </div>

  <div class="stats">
    <!-- TODO: Display statistics here -->
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
    width: 30rem;
    max-width: 90%;
  }

</style>
