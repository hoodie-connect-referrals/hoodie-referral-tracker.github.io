import { kv } from '@vercel/kv';
import links from '../links.json';

// One-time reset endpoint. Requires ?confirm=wipe-all-scans in the URL so it
// can't be triggered by accident. Deletes the running count AND the detailed
// scan log for every link currently in links.json.
//
// IMPORTANT: delete this file (api/reset.js) after using it once. Leaving
// it in place means anyone who finds this URL could wipe your scan history
// again later.
export default async function handler(req, res) {
  const { confirm } = req.query;

  if (confirm !== 'wipe-all-scans') {
    res.status(400).json({
      error: 'This is a destructive action. Add ?confirm=wipe-all-scans to the URL to proceed.',
    });
    return;
  }

  const slugs = Object.keys(links);
  let deleted = 0;
  const errors = [];

  for (const slug of slugs) {
    try {
      await kv.del(`scans:${slug}`);
      await kv.del(`scan_log:${slug}`);
      deleted++;
    } catch (err) {
      errors.push({ slug, error: String(err) });
    }
  }

  res.status(200).json({
    message: `Wiped scan counts for ${deleted} of ${slugs.length} links.`,
    errors,
  });
}
