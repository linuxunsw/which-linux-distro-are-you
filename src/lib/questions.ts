import type { Metric } from '$lib';

export type Answer = {
  /** The answer text */
  a: string,
};

export type Question = {
  /** The statement, which the user agrees/disagrees with */
  q: string,
  /** Text to place on the left/right of the scale. Defaults to `['Not me', 'Me']`. */
  bounds?: [string, string],
  /** The adjustments that selecting this answer makes to the player's point scores. */
  buffs: Partial<Record<Metric, number>>,
};

const questions: Question[] = [
  {
    q: 'I enjoy assembling IKEA furniture.',
    buffs: {
      diy: 5,
      reliable: 1,
    },
  },
  {
    q: "I swear to god I'm the only one keeping my group assignment afloat.",
    buffs: {
      disorganised: -4,
      reliable: 4,
    },
  },
  {
    q: "I don't think I could ever use an Android phone",
    bounds: ['I am literally using one right now', 'Sent from my iPhone'],
    buffs: {
      judgemental: 3,
      earlyAdopter: -1,
    },
  },
  {
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
    q: 'Did you just lose the game?',
    bounds: ['what?', 'GOD DAMN IT!'],
    buffs: {
      memetic: 5,
      unc: 3,
    },
  },
  {
    q: 'I have too much screentime',
    buffs: {
      memetic: 4,
      disorganised: 3,
    },
  },
  {
    q: 'Using AI is a terrible idea',
    bounds: ['No I love claude <3', 'yeah AI sucks'],
    buffs: {
      diy: 4,
      judgemental: 2,
      earlyAdopter: -3,
    },
  }
  // TODO: More
];

export default questions;
