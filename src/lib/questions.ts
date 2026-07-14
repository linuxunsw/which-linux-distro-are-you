import type { Metric } from '$lib';

export type Answer = {
  /** The answer text */
  a: string;
};

export type Question = {
  /** Unique ID, used for stats */
  id: string;
  /** The statement, which the user agrees/disagrees with */
  q: string;
  /** Text to place on the left/right of the scale. Defaults to `['Disagree', 'Agree']`. */
  bounds?: [string, string];
  /** The adjustments that selecting this answer makes to the player's point scores. */
  buffs: Partial<Record<Metric, number>>;
};

const questions: Question[] = [
  {
    id: 'ikea',
    q: 'I enjoy assembling IKEA furniture.',
    buffs: {
      diy: 5,
      reliable: 1,
    },
  },
  {
<<<<<<< HEAD
<<<<<<< HEAD
    id: 'group-project',
    q: "I swear to god I'm the only one keeping my group assignment afloat.",
=======
    q: "I'm always the one solo carrying my group assignments. My teammates are useless.",
>>>>>>> 5329dc8 (Update questions.ts: Balance changes + new questions)
=======
    q: "I swear I'm the only one keeping my group assignment afloat. My teammates are useless.",
>>>>>>> ac970e2 (fix: tidy up questions)
    buffs: {
      disorganised: -4,
      reliable: 4,
      judgmental: 2,
    },
  },
  {
    id: 'android',
    q: "I don't think I could ever use an Android phone",
    bounds: ['I am literally using one right now', 'Sent from my iPhone'],
    buffs: {
      judgmental: 3,
      earlyAdopter: -1,
    },
  },
  {
    q: '69 is a funnier number than 67',
    bounds: ['67 🤪', '69? Nice'],
    buffs: {
      unc: 3,
      // 69 is a much older meme now
      memetic: -2,
      earlyAdopter: -1,
    },
  },
  {
<<<<<<< HEAD
    id: 'the-game',
    q: 'Did you just lose the game?',
    bounds: ['what?', 'GOD DAMN IT!'],
=======
    q: 'Did you just lose the game?',
    bounds: ['what does this mean?', 'GOD DAMN IT!'],
    // q: 'I rage whenever I lose the games that I play.',
    // bounds: ['Never, I like to keep my chill.', 'GOD DAMN IT! *Destroys the planet'],
    //   //Other suggestions could be ["Never, I always take a chill pill", "I've replaced my set-up far too many times"]
>>>>>>> ac970e2 (fix: tidy up questions)
    buffs: {
      memetic: 3,
      unc: 2,
    },
  },
  {
    id: 'screentime',
    q: 'I have too much screentime',
    buffs: {
      memetic: 4,
      disorganised: 3,
    },
  },
  {
    id: 'llm',
    q: 'Using AI is a terrible idea',
    bounds: ['No I love claude <3', 'yeah AI sucks'],
    buffs: {
      diy: 4,
      judgmental: 2,
      earlyAdopter: -3,
      reliable: 2,
    },
  },
  {
    id: 'terminal',
    q: 'I am confident at navigating a computer using a terminal',
    bounds: ["What's a terminal?", 'Can I show you my tmux config?'],
    buffs: {
      diy: 3,
      unc: 1,
      reliable: 1,
    },
  },
  {
    id: 'configaholic',
    q: 'I sometimes scroll through every setting on a device so I can adjust everything',
    bounds: ['I have no preferences', 'My configurations are a work of art'],
    buffs: {
      diy: 3,
      judgmental: 2,
      disorganised: -2,
    },
  },
  {
    id: 'minimalism',
    q: 'I morally oppose minimalism',
    bounds: ['Simplicity is beauty', "If it's worth doing, it's worth overdoing"],
    buffs: {
      disorganised: 2,
      reliable: -2,
      diy: 1,
      unc: 1,
    },
  },
  {
    id: 'opinionated',
    q: 'I already have an opinion on which distro best-matches my personality, and am seeking affirmation.',
    bounds: [
      'Nope',
      'I will be greatly upset if this internet quiz guesses my distro of choice wrong',
    ],
    buffs: {
      judgmental: 3,
      earlyAdopter: 1,
      diy: 2,
    },
  },
  {
    id: 'milk',
    q: 'Your thoughts on people who pour in milk before their cereal?',
    bounds: ['This is cool and normal.', 'Disgusting. Blocked on all platforms immediately.'],
    buffs: {
      judgmental: 4,
      reliable: -1,
      memetic: 2,
    },
  },
  {
    id: 'cookie',
    q: 'I dropped my cookie on the ground and just picked it back up.',
    bounds: ["Nah, I'd eat.", "I'm not eating that, straight to the bin"],
    buffs: {
      judgmental: 2,
      reliable: 3,
      memetic: -1,
      disorganised: -1,
    },
  },
  // QUESTION TEMPLATE
  // {
  //   q: "[insert qn here]",
  //   bounds: ["", ""],
  //   buffs: {
  //     // Add some here. See src/lib/index.ts for a list of options.
  //   },
  // },
  // TODO: More
];

export default questions;
