import { randomStatistic } from '$lib/server/stats';
import { json } from '@sveltejs/kit';

export async function GET() {
  return json(await randomStatistic());
}
