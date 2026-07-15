<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { Button } from '$lib/components/ui/button/index.js';

  type Props = {
    onstart: () => void;
  };
  const { onstart }: Props = $props();
</script>

<Card.Root class="w-full max-w-lg">
  <Card.Header>
    <Card.Title class="text-2xl"
      >Let's find out!</Card.Title
    >
  </Card.Header>
  <Card.Content>
    <p class="text-base">
      Take a quiz to figure out which Linux distribution
      matches your personality.
    </p>
    <p class="text-base italic">
      Keep in mind that this is for fun and games. It's not a recommendation for what you should
      use, and in fact, using this recommendation might even be a terrible idea.
    </p>
    <p class="text-base">
      If you actually want to try out Linux, have a chat with us, or check out
      <a href="https://linuxunsw.org" target="_blank">our website</a>.
    </p>
  </Card.Content>
  <Card.Footer>
    <Button class="w-full md:w-auto md:ml-auto" size="lg" onclick={onstart}>Let's Go!</Button>
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
