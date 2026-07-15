import { kv } from '@vercel/kv';
import links from '../../links.json';

export default async function handler(req, res) {
  const { slug } = req.query;
  const entry = links[slug];

  if (!entry) {
    res.status(404).send('Referral link not found.');
    return;
  }

  // Log the scan (best-effort — never block the redirect if this fails)
  try {
    await kv.incr(`scans:${slug}`);
    await kv.lpush(
      `scan_log:${slug}`,
      JSON.stringify({
        ts: Date.now(),
        ua: req.headers['user-agent'] || '',
        ref: req.headers['referer'] || '',
      })
    );
    await kv.ltrim(`scan_log:${slug}`, 0, 999); // keep last 1000 events per link
  } catch (err) {
    console.error('KV logging failed:', err);
  }

  res.writeHead(302, { Location: entry.url });
  res.end();
}
