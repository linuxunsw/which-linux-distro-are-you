import fs from 'node:fs/promises';
import path from 'node:path';
import { DATA_PATH } from './consts';
import { dev } from '$app/environment';
import type { SubmittedResults } from '../../routes/api/results/+server';

const STATS_FILE = path.join(DATA_PATH, 'stats.json');

export type ResponseStats = SubmittedResults[];

function defaultData(): ResponseStats {
  return [];
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
    await fs.mkdir(DATA_PATH, { recursive: true }).catch(() => {});
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

export async function submitResults(results: SubmittedResults) {
  const data = await getData();

  data.push(results);

  await saveData(data);
}
