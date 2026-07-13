/** The metrics by which we judge our distros and our users. */
export const metrics = [
  /** How much does the person/distro like doing things themself. */
  'diy',
  /** How disorganised is the person/distro? */
  'disorganised',
  /** How much does the person/distro adopt new technologies. */
  'earlyAdopter',
  /** How in-touch with memes is the person/distro? */
  'memetic',
  /** How old is the person/distro (at heart)? How modern does it feel (tooling, etc) */
  'unc',
  /** Will they work consistently? Are they easy to accidentally break? */
  'reliable',
  /** How much does this person/distro judge others with different opinions */
  'judgemental',
] as const;

export type Metric = typeof metrics[number];
