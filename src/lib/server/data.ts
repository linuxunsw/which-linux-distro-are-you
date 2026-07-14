import fs from 'node:fs/promises';
import path from 'node:path';
import { DATA_PATH } from './consts';
import { dev } from '$app/environment';
import type { Results } from '../../routes/api/results/+server';

const STATS_FILE = path.join(DATA_PATH, 'stats.json');

export type ResponseStats = {
  /** Frequency of distro recommendations */
  distros: Record<string, number>,
  /**
   * Array of personalities of users.
   *
   * Note: not using the specific metrics here, as we cannot guarantee that we won't add more
   * metrics over the course of the day, meaning not all metrics will exist in all submitted
   * personalities.
   */
  personalities: Record<string, number>[],
  /**
   * Set of answers submitted by users.
   *
   * - Each key is a question ID.
   * - Each value is an array of the corresponding answers (scale of 0-4 inclusive)
   */
  qandas: Record<string, number[]>,
};

function defaultData(): ResponseStats {
  return {
    distros: {},
    personalities: [],
    qandas: {},
  };
}

async function loadData() {
  try {
    return JSON.parse(await fs.readFile(STATS_FILE, { encoding: 'utf-8' })) as ResponseStats;
  } catch (e) {
    console.error(e);
    return defaultData();
  }
}

async function saveData(data: ResponseStats) {
  // mkdir -p, ignoring errors
  // NOTE: In production, this dir must already exist
  if (dev) {
    await fs.mkdir(DATA_PATH, { recursive: true }).catch(() => { });
  }
  // Now write the file
  await fs.writeFile(STATS_FILE, JSON.stringify(data, undefined, 2));
}

let dataCache: ResponseStats | undefined = undefined;

/** Get data in its current state, useful for calculating stats */
export async function getData(): Promise<ResponseStats> {
  dataCache ??= await loadData();
  return dataCache;
}

export async function submitResults(results: Results) {
  const data = await getData();

  data.distros[results.distro] = (data.distros[results.distro] ?? 0) + 1;

  data.personalities.push(results.personality);

  for (const [q, a] of Object.entries(results.qandas)) {
    data.qandas[q] ??= [];
    data.qandas[q].push(a);
  }

  await saveData(data);
}
