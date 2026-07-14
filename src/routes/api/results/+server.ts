import * as v from 'valibot';
import { json } from '@sveltejs/kit';
import { submitResults } from '$lib/server/data';

const Schema = v.object({
  /** The ID of the distro which was recommended */
  distro: v.string(),
  /**
   * Personality mapping
   *
   * Key: metric name
   * Value: resultant value (0-10 inclusive)
   */
  personality: v.record(v.string(), v.number()),
  /**
   * Questions that were answered:
   *
   * Key: question ID
   * Value: response (0-4 inclusive)
   */
  qandas: v.record(v.string(), v.number()),
});

export type SubmittedResults = v.InferOutput<typeof Schema>;

export async function POST({ request }) {
  const results = v.parse(Schema, await request.json());
  await submitResults(results);
  return json({});
}
