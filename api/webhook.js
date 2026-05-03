import { kv } from '../../lib/storage';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const secret = process.env.WEBHOOK_SECRET;
  const provided = req.headers['x-webhook-secret'];
  if (secret && provided !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const body = req.body || {};
  const post = {
    text: String(body.text || '').slice(0, 4000),
    date: body.date || new Date().toISOString(),
    link: body.link || null,
    image: body.image || null,
    pushedAt: new Date().toISOString()
  };

  if (!post.text && !post.image) {
    return res.status(400).json({ error: 'Either text or image required' });
  }

  await kv.addPost(post);

  return res.status(200).json({ ok: true, stored: post });
}