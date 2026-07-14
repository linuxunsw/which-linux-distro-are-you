import { metrics } from '$lib';
import { defaultPersonality, type Personality } from '$lib/analysis';
import questions from '$lib/questions';
import { sample } from '$lib/util';
import { getData, type ResponseStats } from './data';

/** A factoid, such as "the average person is 50% unc" */
type Factoid = {
  kind: 'factoid',
  value: string,
};

/**
 * Summary of personality stats.
 *
 * Would look nice as a radar chart.
 */
type AveragePersonality = {
  kind: 'personaility',
  value: Personality,
};

type AnswerHistogram = [number, number, number, number, number];

/**
 * Info about the average responses to a particular question.
 *
 * Would be a good histogram?
 */
type QuestionStats = {
  kind: 'question',
  /** ID of question that the statistics are about */
  id: string,
  /**
   * Array with frequencies for each choice. Index is the choice, value is the frequency.
   */
  value: AnswerHistogram,
};

export type Statistic = Factoid | AveragePersonality | QuestionStats;

export async function randomStatistic(): Promise<Statistic> {
  const data = await getData();

  const choice = Math.random();

  if (choice < 0.3) {
    // Personality statistics
    return {
      kind: 'personaility',
      value: averagePersonality(data),
    };
  } else if (choice < 0.8) {
    // Info about a question response
    const question = sample(questions, 1)[0].id;
    return {
      kind: 'question',
      id: question,
      value: questionStats(question, data),
    };
  } else {
    const fact = sample(factoids, 1)[0](data);
    return {
      kind: 'factoid',
      value: fact,
    };
  }
}

/** Function that generates a factoid */
type FactoidGenerator = (data: ResponseStats) => string;

const factoids: FactoidGenerator[] = [
  /** unc percent */
  (data) => {
    const uncableResults = data.filter(result => 'unc' in result.personality);
    const avg = uncableResults.reduce((sum, result) => sum + result.personality.unc, 0)
      / uncableResults.length;
    return `The average person is ${avg * 10}% unc.`;
  },
  // TODO: More factoids
];

function averagePersonality(data: ResponseStats): Personality {
  const personality = defaultPersonality();

  for (const metric of metrics) {
    const resultsWithMetric = data.filter(result => metric in result.personality);
    personality[metric] = resultsWithMetric
      .reduce((sum, result) => sum + result.personality[metric], 0)
      / resultsWithMetric.length;
  }

  return personality;
}

function questionStats(question: string, data: ResponseStats) {
  const frequencies: AnswerHistogram = [0, 0, 0, 0, 0];
  for (const result of data.filter(result => question in result.qandas)) {
    const answer = result.qandas[question];
    frequencies[answer] = (frequencies[answer] ?? 0) + 1;
  }
  return frequencies;
}
