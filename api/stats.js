import { kv } from '@vercel/kv';
import links from '../links.json';

export default async function handler(req, res) {
  const results = [];

  for (const [slug, entry] of Object.entries(links)) {
    let count = 0;
    try {
      count = (await kv.get(`scans:${slug}`)) || 0;
    } catch (err) {
      console.error(`Failed to read count for ${slug}:`, err);
    }
    results.push({
      slug,
      name: entry.name,
      client: entry.client,
      url: entry.url,
      scans: Number(count),
    });
  }

  results.sort((a, b) => b.scans - a.scans);

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(results);
}
