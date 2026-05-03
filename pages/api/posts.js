import { kv } from '../../lib/storage';

const CHANNEL = 'quantophobiadeleted';
const TELEGRAM_PREVIEW_URL = `https://t.me/s/${CHANNEL}`;

export default async function handler(req, res) {
  try {
    const pushed = await kv.getPosts();

    if (pushed && pushed.length > 0) {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      return res.status(200).json({ source: 'make.com', channel: CHANNEL, posts: pushed });
    }

    const response = await fetch(TELEGRAM_PREVIEW_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; QuantophobiaBot/1.0)' }
    });

    if (!response.ok) {
      return res.status(200).json({ source: 'fallback-failed', channel: CHANNEL, posts: [] });
    }

    const html = await response.text();
    const scraped = parseTelegramHTML(html);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(200).json({ source: 'telegram-preview', channel: CHANNEL, posts: scraped });
  } catch (err) {
    return res.status(200).json({ source: 'error', error: err.message, posts: [] });
  }
}

function parseTelegramHTML(html) {
  const posts = [];
  const blockRegex = /<div class="tgme_widget_message_wrap[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
  const textRegex = /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/;
  const dateRegex = /datetime="([^"]+)"/;
  const linkRegex = /href="(https:\/\/t\.me\/[^"]+)"/;
  const photoRegex = /background-image:url\('([^']+)'\)/;

  let match;
  let count = 0;
  while ((match = blockRegex.exec(html)) !== null && count < 30) {
    const block = match[1];
    const textMatch = block.match(textRegex);
    const dateMatch = block.match(dateRegex);
    const linkMatch = block.match(linkRegex);
    const photoMatch = block.match(photoRegex);

    if (textMatch || photoMatch) {
      posts.push({
        text: textMatch ? cleanHTML(textMatch[1]) : '',
        date: dateMatch ? dateMatch[1] : null,
        link: linkMatch ? linkMatch[1] : null,
        image: photoMatch ? photoMatch[1] : null
      });
      count++;
    }
  }

  return posts.reverse();
}

function cleanHTML(str) {
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
    .trim();
}