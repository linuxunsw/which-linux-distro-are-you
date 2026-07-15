import type { Metric } from '$lib';

export type Rating = {
  /** 0-10 */
  value: number,
  /** Rationale, shown to users (description that matches the distro and the user) */
  rationale: string,
};

export type Distro = {
  /** Unique id */
  id: string,
  /** Human-friendly name */
  name: string,
  /**
   * URL to Distro's official website. Allows users to check it out at the end of the quiz if they
   * want.
   */
  url: string,
  /** Summary shown in end screen (more detailed description of distro). */
  summary: string,
} & Record<Metric, Rating>;

// Please try to keep these alphabetised if you add more distros.
// TODO: Currently, most of these have place-holder values. If you have experience with a distro, or
// know enough about it, feel free to fill things in.
const distros: Distro[] = [
  {
    id: 'arch',
    name: 'Arch Linux',
    url: 'https://archlinux.org/',
    summary: "Arch: You love to do things yourself to have everything fit your needs. You love using new technologies and innovations fresh before others even hear about them. Although your system breaks frequently without constant updates, you still never forget to let other linux users know how much superior your distribution is (arch btw).",
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
    unc: {
      value: 3,
      rationale: 'Arch is young at heart and so are you!',
    },
    // Broken arch installs are very common
    reliable: {
      value: 1,
      rationale: 'You need to be updated frequently or everything will break',
    },
    judgmental: {
      value: 9,
      rationale: "It's ok that you push your opinions hard, because you're right (according to you)",
    },
  },
  {
    id: 'debian',
    name: 'Debian',
    url: 'https://www.debian.org/',
    summary: "Debian: The second oldest distribution, known for its stability and reliability, you like your system to be mature and sensible like yourself. You are always meticulously on top of things and responsible, although you might be out of touch with the latest memes. You're great at familiar things, but become Frankenstein's Monster if new things are added.",
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
    unc: {
      value: 9,
      rationale: "You definitely don't suffer from Shiny New Stuff Syndrome.",
    },
    // https://wiki.debian.org/DontBreakDebian#Don.27t_make_a_FrankenDebian
    reliable: {
      value: 5,
      rationale: "You're great at familiar things, but become Frankenstein's Monster if new things are added",
    },
    judgmental: {
      value: 2,
      rationale: 'judgemental',
    },
  },
  {
    id: 'fedora',
    name: 'Fedora Linux',
    url: 'https://fedoraproject.org/',
    summary: "Fedora: Tip your fedoras, because Fedora is your distribution. You are known to frequently miss deadlines (like every Fedora Linux release). Technology is constantly changing around you nowadays and you love exploring it, however you can't stop but to stay consistent with your principles.",
    diy: {
      value: 5,
      rationale: 'diy',
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
    unc: {
      value: 4,
      rationale: 'Despite your age, you are definitely not unc.',
    },
    // Notoriously rock-solid, especially given the semi-rolling nature
    reliable: {
      value: 8,
      rationale: 'You stay consistent even as things change around you.',
    },
    judgmental: {
      value: 0,
      rationale: 'judgemental',
    },
  },
  {
    id: 'gentoo',
    name: 'Gentoo Linux',
    url: 'https://www.gentoo.org/',
    summary: "Gentoo: The a popular DIY style distro, Gentoo Linux. If you didn't build it yourself, you don't truly call it yours. Although you are an organised person, sometimes you forget to put on deodorant in the morning. Despite this, people believe you are very reliable and your group teammates diagnose you with 'control freak'.",
    diy: {
      value: 10,
      rationale: "Are things even yours if you don't build them yourself?",
    },
    // TODO
    disorganised: {
      value: 0,
      rationale: 'disorganised',
    },
    earlyAdopter: {
      value: 9,
      rationale: "If your computer was faster at code compilation, you'd be running up-to-date software.",
    },
    memetic: {
      value: 0,
      rationale: 'memetic',
    },
    unc: {
      value: 0,
      rationale: 'unc',
    },
    reliable: {
      value: 8,
      rationale: 'reliable',
    },
    judgmental: {
      value: 7,
      rationale: 'Your group project teammates diagnose you with control freak.',
    },
  },
  {
    id: 'manjaro',
    name: 'Manjaro',
    url: 'https://manjaro.org/',
    summary: "Manjaro: Despite being arch-based, you aren't fully aligned with the DIY philosophy and want a little more configured for you. You love adopting new technologies, despite them falling apart in your hands when you use them. Manjaro users are also known to be greatly disorganised (How long has it been since your last dentist appointment?).",
    diy: {
      value: 6,
      rationale: 'diy',
    },
    // Forgetting to renew your SSL 3 times is very funny
    disorganised: {
      value: 10,
      rationale: 'How long has it been since your last dentist appointment?',
    },
    earlyAdopter: {
      value: 9,
      rationale: 'earlyAdopter',
    },
    memetic: {
      value: 3,
      rationale: 'memetic',
    },
    // 14 years old
    unc: {
      value: 2,
      rationale: 'You appear to have the same age.',
    },
    reliable: {
      value: 2,
      rationale: 'You fall apart often for inscrutible reasons.',
    },
    judgmental: {
      value: 0,
      rationale: 'judgemental',
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    url: 'https://www.linuxmint.com/',
    summary: "Mint: The classic \"newbie\" distro. You don't worry about the ins and outs of customisation (ricing) or the fact that people judge you for using the \"easy\" distro, you only care that your system is always running without any issues. You are either a super unc, or a super newbie, no in-betweens.",
    diy: {
      value: 2,
      rationale: 'You change the wallpaper on your laptop and added a couple desklets',
    },
    disorganised: {
      value: 3,
      rationale: "You don't really care about organisation, as long as it works for you.",
    },
    earlyAdopter: {
      value: 3,
      rationale: 'You like your comfort zone and try not to explore too much if it can get dangerous',
    },
    memetic: {
      value: 1,
      rationale: 'not sure what to put here',
    },
    unc: {
      value: 4,
      rationale: 'You are either a super unc, or you are a super newbie, no in-betweens.',
    },
    reliable: {
      value: 6,
      rationale: "You enjoy tested and reliable things and don't like when things break.",
    },
    judgmental: {
      value: 2,
      rationale: "You are judged by others, and don't like judging people.",
    },
  },
  {
    id: 'nixos',
    name: 'NixOS',
    url: 'https://nixos.org/',
    summary: "NixOS: A beautiful operating system, Nix is known to be incredibly customisable and modular, making it a reliable system for those who venture. Every thing you make is always beautiful, even if it takes you a long time to do so. You might be slow and painful, but you get stuff done your way. Despite being a very disorganised, you also like to think you are better than everyone else for using Nix.",
    diy: {
      value: 10,
      rationale: 'Everything you create is a beautiful work of art. And it takes you so long to create it.',
    },
    // They've had some pretty significant management disasters
    disorganised: {
      value: 8,
      rationale: 'You either take group assignments way too seriously or not seriously enough.',
    },
    earlyAdopter: {
      value: 5,
      rationale: 'You like to put your own spin on new things.',
    },
    memetic: {
      value: 0,
      rationale: 'memetic',
    },
    // 20 years old, but the Nix language doesn't feel especially nice to work with, and the CLI
    // tools are not especially pleasant without 3rd-party wrappers.
    unc: {
      value: 8,
      rationale: 'You might be painful to work with, but you get sh*t done.',
    },
    // Basically impossible to break
    reliable: {
      value: 10,
      rationale: "You've never broken a bone in your body.",
    },
    judgmental: {
      value: 7,
      rationale: "You think you know better than everyone (you're probably right)",
    },
  },
  {
    id: 'slackware',
    name: 'Slackware',
    // Yes, you read that right, Slackware does not support HTTPS
    url: 'http://www.slackware.com/',
    summary: "Slackware: Slackware, the oldest linux distribution. Your todo lists are long and detailed, and by god they need to be. Please I am begging you to tidy your files up. You strongly believe that life was better in the 90s. You are so unc, that if computers had floppy drives, you'd be using them.",
    diy: {
      value: 7,
      rationale: 'Your todo lists are long and detailed, and by god they need to be.',
    },
    disorganised: {
      // Many different package managers all with slightly different quirks
      value: 7,
      rationale: 'Please I am begging you to tidy your files up.',
    },
    // Slowest-moving distro ever?
    earlyAdopter: {
      value: 0,
      rationale: 'Nobody can force you to have a secure website.',
    },
    memetic: {
      value: 0,
      rationale: 'The last meme that downloaded on your dial-up connection was Nyan Cat.',
    },
    // Very old tooling
    unc: {
      value: 10,
      rationale: "If computers had floppy drives, you'd be using them.",
    },
    // idk?
    reliable: {
      value: 6,
      rationale: 'Your todo lists are long and detailed, and by god they need to be.',
    },
    judgmental: {
      // Maddy: found moderate judgment of people's decisions when I perused their subreddit.
      value: 3,
      rationale: 'Some of your opinions probably should have changed since the 90s.',
    },
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    url: 'https://ubuntu.com/desktop',
    summary: "Ubuntu: A basic but still highly well known distribution, despite it losing a lot of its popularity in recent times. You don't care about customisation enough to even care about changing your wallpaper. You use this distribution because Sheldon Lee Cooper said it was his favourite Linux-based operating system. Did you know: \"Ubuntu\" is a Nguni word meaning \"I don't know how to install Debian.\"",
    diy: {
      value: 1,
      rationale: 'You could at least change the wallpaper on your laptop',
    },
    disorganised: {
      value: 4,
      rationale: 'disorganised',
    },
    // Rewriting all coreutils in rust, and making that the default with barely 6 months of
    // dogfooding in 25.10 before it hit LTS...
    earlyAdopter: {
      value: 7,
      rationale: "Maybe you don't need to try every new thing immediately. Like seriously, please stop.",
    },
    memetic: {
      value: 1,
      rationale: 'Did you know: "Ubuntu" is a Nguni word meaning "I don\'t know how to install Debian".',
    },
    // Has apt gotten any better recently?
    unc: {
      value: 5,
      rationale: 'unc',
    },
    // Maddy personally ran into pretty significant issues when she used it. Idk if that matches
    // everyone else though.
    reliable: {
      value: 4,
      rationale: 'reliable',
    },
    judgmental: {
      value: 0,
      rationale: 'judgemental',
    },
  },
];

export default distros;
