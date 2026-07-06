import type { Metric } from '$lib';

export type Rating = {
  /** 0-10 */
  value: number,
  /** Rationale, shown to users (description that matches the distro and the user) */
  rationale: string,
};

export type Distro = {
  /** Human-friendly name */
  name: string,
} & Record<Metric, Rating>;

// Please try to keep these alphabetised if you add more distros.
// TODO: Currently, most of these have place-holder values. If you have experience with a distro, or
// know enough about it, feel free to fill things in.
const distros: Record<string, Distro> = {
  arch: {
    name: 'Arch Linux',
    diy: {
      value: 9,
      rationale: 'You like to do things yourself.',
    },
    disorganised: {
      value: 3,
      rationale: 'You are most organised when things change quickly.',
    },
    earlyAdopter: {
      value: 10,
      rationale: "You're probably using new innovations before most people have heard of them.",
    },
    memetic: {
      value: 9,
      rationale: 'btw',
    },
    // 24 years young, feels quite modern in its design still?
    oldSoul: {
      value: 3,
      rationale: 'Arch is young at heart and so are you!',
    },
    // Broken arch installs are very common
    reliable: {
      value: 1,
      rationale: 'You need to be updated frequently or everything will break',
    },
    judgemental: {
      value: 9,
      rationale: "It's ok that you push your opinions hard, because you're right (according to you)",
    },
  },
  debian: {
    name: 'Debian',
    diy: {
      value: 6,
      rationale: 'You like to keep things sensible and minimal',
    },
    disorganised: {
      value: 0,
      rationale: "You're always meticulously on top of things",
    },
    // Not as slow-moving as something like Slackware at least
    earlyAdopter: {
      value: 1,
      rationale: "It ain't broke, so you haven't fixed it.",
    },
    memetic: {
      value: 0,
      rationale: '[grandma voice] what is a meme?',
    },
    // 32 years old
    oldSoul: {
      value: 9,
      rationale: "You definitely don't suffer from Shiny New Stuff Syndrome.",
    },
    // https://wiki.debian.org/DontBreakDebian#Don.27t_make_a_FrankenDebian
    reliable: {
      value: 5,
      rationale: "You're great at familiar things, but become Frankenstein's Monster if new things are added",
    },
    judgemental: {
      value: 2,
      rationale: '',
    },
  },
  fedora: {
    name: 'Fedora Linux',
    diy: {
      value: 5,
      rationale: 'TODO',
    },
    disorganised: {
      value: 7,
      // I don't think a Fedora release has come out on time in years
      rationale: 'You are known for missing deadlines.',
    },
    earlyAdopter: {
      value: 7,
      rationale: "As soon as you're confident that it's the future, you're using it.",
    },
    memetic: {
      value: 7,
      rationale: "m'lady",
    },
    // DNF5 is v nice
    oldSoul: {
      value: 4,
      rationale: 'Despite your age, you are definitely not unc.',
    },
    // Notoriously rock-solid, especially given the semi-rolling nature
    reliable: {
      value: 8,
      rationale: 'You stay consistent even as things change around you.',
    },
    judgemental: {
      value: 0,
      rationale: '',
    },
  },
  gentoo: {
    name: 'Gentoo Linux',
    diy: {
      value: 10,
      rationale: "Is it even yours if you don't build it yourself?",
    },
    // TODO
    disorganised: {
      value: 0,
      rationale: '',
    },
    earlyAdopter: {
      value: 0,
      rationale: '',
    },
    memetic: {
      value: 0,
      rationale: '',
    },
    oldSoul: {
      value: 0,
      rationale: '',
    },
    reliable: {
      value: 0,
      rationale: '',
    },
    judgemental: {
      value: 0,
      rationale: '',
    },
  },
  manjaro: {
    name: 'Manjaro',
    diy: {
      value: 6,
      rationale: '',
    },
    // Forgetting to renew your SSL 3 times is very funny
    disorganised: {
      value: 10,
      rationale: 'How long has it been since your last dentist appointment?',
    },
    earlyAdopter: {
      value: 9,
      rationale: 'TODO',
    },
    memetic: {
      value: 3,
      rationale: 'TODO',
    },
    // 14 years old
    oldSoul: {
      value: 2,
      rationale: 'TODO',
    },
    reliable: {
      value: 2,
      rationale: 'You fall apart often for inscrutible reasons.',
    },
    judgemental: {
      value: 0,
      rationale: '',
    },
  },
  nixos: {
    name: 'NixOS',
    diy: {
      value: 10,
      rationale: 'Everything you create is a beautiful work of art. And it takes you so long to create it.',
    },
    // They've had some pretty significant management disasters
    disorganised: {
      value: 8,
      rationale: 'TODO',
    },
    earlyAdopter: {
      value: 5,
      rationale: 'You like to put your own spin on new things.',
    },
    memetic: {
      value: 0,
      rationale: 'TODO',
    },
    // 20 years old, but the Nix language doesn't feel especially nice to work with, and the CLI
    // tools are not especially pleasant without 3rd-party wrappers.
    oldSoul: {
      value: 8,
      rationale: 'You might be painful to work with, but you get sh*t done.',
    },
    // Basically impossible to break
    reliable: {
      value: 10,
      rationale: "You've never broken a bone in your body.",
    },
    judgemental: {
      value: 7,
      rationale: "You think you know better than everyone (you're probably right)",
    },
  },
  slackware: {
    name: 'Slackware',
    diy: {
      value: 7,
      rationale: 'TODO',
    },
    disorganised: {
      value: 0,
      rationale: '',
    },
    // Slowest-moving distro ever?
    earlyAdopter: {
      value: 0,
      rationale: 'Life was better in the 90s.',
    },
    memetic: {
      value: 0,
      rationale: 'The last meme that downloaded on your dial-up connection was Nyan Cat.',
    },
    // Very old tooling
    oldSoul: {
      value: 10,
      rationale: "If computers had floppy drives, you'd be using them.",
    },
    // idk?
    reliable: {
      value: 0,
      rationale: 'TODO',
    },
    judgemental: {
      value: 0,
      rationale: '',
    },
  },
  ubuntu: {
    name: 'Ubuntu',
    diy: {
      value: 2,
      rationale: '',
    },
    disorganised: {
      value: 4,
      rationale: '',
    },
    // Rewriting all coreutils in rust, and making that the default with barely 6 months of
    // dogfooding in 25.10 before it hit LTS...
    earlyAdopter: {
      value: 7,
      rationale: "Maybe you don't need to try every new thing immediately.",
    },
    memetic: {
      value: 0,
      rationale: 'TODO',
    },
    // Has apt gotten any better recently?
    oldSoul: {
      value: 5,
      rationale: 'TODO',
    },
    // Maddy personally ran into pretty significant issues when she used it. Idk if that matches
    // everyone else though.
    reliable: {
      value: 4,
      rationale: 'TODO',
    },
    judgemental: {
      value: 0,
      rationale: '',
    },
  },
};

export default distros;
