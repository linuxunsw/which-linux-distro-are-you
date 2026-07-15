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
  /** Text to place on the left/right of the scale. Defaults to `['Not me', 'Me']`. */
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
    id: 'group-project',
    q: "I swear to god I'm the only one keeping my group assignment afloat.",
    buffs: {
      disorganised: -4,
      reliable: 4,
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
    id: '68',
    q: '69 is a funnier number than 67',
    bounds: ['67676767676767', 'Nice'],
    buffs: {
      unc: 5,
      // 69 is a much older meme now
      memetic: -2,
      earlyAdopter: -1,
    },
  },
  {
    id: 'the-game',
    q: 'Did you just lose the game?',
    bounds: ['what?', 'GOD DAMN IT!'],
    buffs: {
      memetic: 5,
      unc: 3,
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
    },
  },
  {
    id: 'configaholic',
    q: 'I sometimes scroll through every setting on a device so I can adjust everything',
    bounds: ['I have no preferences', 'My configurations are a work of art'],
    buffs: {
      diy: 2,
      judgmental: 3,
      disorganised: -1,
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
  // TODO: More
];

export default questions;
