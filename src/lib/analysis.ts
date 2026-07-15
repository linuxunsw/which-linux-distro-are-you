import { metrics, type Metric } from '$lib';
import distros, { type Distro } from './distros';
import type { Question } from './questions';
import { assert, sample, shuffled } from './util';

export type QandA = {
  /** Question being answered */
  q: Question,
  /** Answer, as a range from 0-4 */
  a: 0 | 1 | 2 | 3 | 4,
};

/** Total personality, combined from all metrics */
export type Personality = Record<Metric, number>;

/** Returns an empty personality, with no defined traits */
export function defaultPersonality(): Personality {
  return {
    diy: 0,
    disorganised: 0,
    earlyAdopter: 0,
    memetic: 0,
    unc: 0,
    reliable: 0,
    judgmental: 0,
  };
}

/**
 * Determine the maximum value possible for the given metric within this set of answers.
 *
 * This is used to scale the personality metrics, so that they fit within the 1-10 range required by
 * distros. That way, we can keep the distro rankings and the questions separated without worrying
 * about the scaling of one affecting the other.
 */
function metricRange(qandas: QandA[], metric: Metric): number {
  return qandas.reduce((sum, qanda) => Math.abs(qanda.q.buffs[metric] ?? 0) + sum, 0);
}

/** Calculate personality from questions and answers */
function calculatePersonality(qandas: QandA[]): Personality {
  const personality = qandas.reduce((personality, answer) => {
    const scaling = answer.a - 2;
    Object.entries(answer.q.buffs).forEach(([k, v]) => {
      // I hate that Object.entries
      personality[k as Metric] += v * scaling;
    });
    return personality;
  }, defaultPersonality());

  // Scale
  metrics.forEach((metric) => {
    personality[metric] /= metricRange(qandas, metric) / 10;
  });

  return personality;
}

/**
 * Difference between the given distro, and the personality.
 *
 * Higher numbers indicate greater difference.
 */
function distroDiff(d: Distro, p: Personality): number {
  // TODO: Consider some kind of non-linear scaling here to punish larger deviations from the distro
  // so that users get things that have a closer "vibe".
  return metrics.reduce((sum, metric) => sum + Math.abs(p[metric] - d[metric].value), 0);
}

/** Returns the closest matching distro for the given set of questions and answers */
export function getMatchingDistro(qandas: QandA[]): [Distro, Metric] {
  const personality = calculatePersonality(qandas);

  let match: Distro | undefined = undefined;
  let matchDiff = 99999999999999; // Some obscenely huge value

  for (const d of shuffled(distros)) {
    const diff = distroDiff(d, personality);
    if (diff < matchDiff) {
      match = d;
      matchDiff = diff;
    }
  }

  assert(match !== undefined, 'No bitches?');

  // Track a full array of relevant metrics to make it less likely to
  // favor earlier metrics.
  let mostRelevantMetrics: Metric[] = [];
  matchDiff = 999999999999999;
  for (const metric of metrics) {
    const thisDiff = Math.abs(personality[metric] - match[metric].value);
    if (thisDiff < matchDiff) {
      mostRelevantMetrics = [metric];
    } else if (thisDiff === matchDiff) {
      mostRelevantMetrics.push(metric);
    }
  }

  assert(mostRelevantMetrics !== undefined, 'No relevance?');

  return [match, sample(mostRelevantMetrics, 1)[0]];
}
