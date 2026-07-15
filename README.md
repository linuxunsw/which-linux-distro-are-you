# Which Linux Distro Are You?

Figure out what which Linux distro best fits your personality.

Thrown together with SvelteKit, unless anyone has a better idea.

## How it works

- A series of "metrics" are defined that measure attributes of people taking the
  quiz, and the distros we're matching them to.
- Each distro has a rating of each metric, along with a rationale for that
  rating.
- Each question has a set of adjustments it applies to the user's statistics.
- After a number of questions, the user will have a sum of metrics. These are
  scaled, then are compared against the ratings of distros. The distro with the
  closest match wins.
- Various quotes from the distro rationale ratings that best fit the user's
  profile are shown. Hopefully these quips reflect both the distro, and the
  user's personality.

### Adding questions

In `src/lib/questions.ts`.

- Avoid technical topics. We want the quiz to be accessible to a wide audience.
- Funny questions are better, we want to be engagement-maxxing.
- Try to make the questions adjust at least a few metrics for the user, so they
  get a meaningful result.
- Maybe we'll need more metrics if there are funny questions you want to add
  that don't neatly fit any existing metrics.

### Adding distros

In `src/lib/distros.ts`.

- Each metric should be given a rating from 0-10.
- Try to make each rationale describe both the distro and the user who will be
  matched with it.
- It should be funny, preferably poking fun at the user, but not insulting them.
- This is a fine line to walk. Please don't get us canceled.

## Developing

Once you've created a project and installed dependencies with `npm install`, start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

For validation:

```sh
# Linting
npm run lint
# Type-checking
npm run check
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
