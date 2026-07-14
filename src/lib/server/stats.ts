import fs from 'node:fs/promises';
import type { Personality } from '$lib/analysis';
import path from 'node:path';
import { DATA_PATH } from './consts';

const STATS_FILE = path.join(DATA_PATH, 'stats.json');

export type ResponseStats = {
  /** Frequency of distro recommendations */
  distros: Record<string, number>,
  /** Set of personalities of users */
  personalities: Personality[],
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

export async function saveData(data: ResponseStats) {
  await fs.writeFile(STATS_FILE, JSON.stringify(data));
}

let dataCache: ResponseStats | undefined = undefined;

export async function getData(): Promise<ResponseStats> {
  dataCache ??= await loadData();
  return dataCache;
}
