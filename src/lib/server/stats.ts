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

/**
 * Summary of distro stats.
 *
 * Would look nice as a pie chart.
 */
type DistroFrequencies = {
  kind: 'distros',
  value: Record<string, number>,
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

export type Statistic = Factoid | AveragePersonality | DistroFrequencies | QuestionStats;

export async function randomStatistic(): Promise<Statistic> {
  const data = await getData();

  // We choose which kind of statistic to give randomly. Feel free to adjust these stats to make
  // different kinds of statistics appear more/less often.
  const CHANCE_PERSONALITY = 0.2;
  const CHANCE_QUESTION_RESPONSE = 0.2;
  const CHANCE_DISTROS = 0.3;
  // Remainder are factoids

  const choice = Math.random();

  if (choice < CHANCE_PERSONALITY) {
    // Personality statistics
    return {
      kind: 'personaility',
      value: averagePersonality(data),
    };
  } else if (choice < CHANCE_PERSONALITY + CHANCE_QUESTION_RESPONSE) {
    // Info about a question response
    const question = sample(questions, 1)[0].id;
    return {
      kind: 'question',
      id: question,
      value: questionStats(question, data),
    };
  } else if (choice < CHANCE_PERSONALITY + CHANCE_QUESTION_RESPONSE + CHANCE_DISTROS) {
    return {
      kind: 'distros',
      value: distroStats(data),
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
  /** Number of participants */
  (data) => {
    return `So far, ${data.length} people have taken this quiz!`;
  },
  /** unc percent */
  (data) => {
    const uncableResults = data.filter(result => 'unc' in result.personality);
    const avg = uncableResults.reduce((sum, result) => sum + result.personality.unc, 0)
      / uncableResults.length;
    return `The average person is ${avg * 10}% unc.`;
  },
  /** Group project primary contributors who are also judgmental */
  (data) => {
    // Submissions where the participant claims to be the main contributor of their group project
    const groupProjectContribs = data
      .filter(result => 'group-project' in result.qandas && result.qandas['group-project'] >= 3);

    // Group project contributors with a high judgmental score
    const judgementalContribs = groupProjectContribs
      .filter(result => 'judgmental' in result.personality && result.personality.judgmental >= 5);

    return `${judgementalContribs.length / groupProjectContribs.length * 100}% of group-project contributors are judgemental of others.`;
  },
  /** IKEA lover count */
  (data) => {
    const ikeaLovers = data.filter(result => 'ikea' in result.qandas && result.qandas.ikea >= 3);
    return `So far, ${ikeaLovers.length} IKEA fans have taken this quiz.`;
  },
  // TODO: More factoids. Some ideas:
  // - How many configaholics made the mistake of using an iPhone?
  // - Do people who think 69 is funny remember The Game?
  // - Do heavy terminal users have a strong distro preference?
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

function distroStats(data: ResponseStats) {
  const distros: Record<string, number> = {};
  for (const result of data) {
    distros[result.distro] = (distros[result.distro] ?? 0) + 1;
  }
  return distros;
}

function questionStats(question: string, data: ResponseStats) {
  const frequencies: AnswerHistogram = [0, 0, 0, 0, 0];
  for (const result of data.filter(result => question in result.qandas)) {
    const answer = result.qandas[question];
    frequencies[answer] = (frequencies[answer] ?? 0) + 1;
  }
  return frequencies;
}
