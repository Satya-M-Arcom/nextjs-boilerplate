import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => {
        if (data.posts) setPosts(data.posts);
        if (data.source) setSource(data.source);
        if (!data.posts || data.posts.length === 0) setError('No posts yet');
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  return (
    <>
      <Head>
        <title>Quantophobia Deleted — Conquer Math, One Step at a Time</title>
        <meta name="description" content="Daily quantitative aptitude & math practice to defeat math phobia. Free Telegram channel." />
        <meta property="og:title" content="Quantophobia Deleted" />
        <meta property="og:description" content="Defeat math phobia, one small step at a time." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page">
        <header className="hero">
          <div className="symbols" aria-hidden="true">
            <span>∑</span><span>π</span><span>√</span><span>∫</span><span>∞</span>
          </div>
          <h1>Quantophobia <span className="strike">Deleted</span></h1>
          <p className="tagline">
            Defeat math phobia — one small step at a time.
            Genuine effort + daily practice = real progress in quantitative aptitude.
          </p>
          <a className="cta" href="https://t.me/quantophobiadeleted" target="_blank" rel="noopener noreferrer">
            📲 Join the Telegram Channel
          </a>
          <p className="sub">Free • No spam • Just math, made gentle</p>
        </header>

        <section className="why">
          <h2>Why this exists</h2>
          <p>
            This channel was created to gradually improve quantitative aptitude and
            mathematics skills, and to remove the phobia of math through the smallest
            consistent efforts — for anyone genuinely interested. No pressure. No jargon.
            Just bite-sized practice, daily.
          </p>
        </section>

        <section className="feed">
          <h2>📚 Latest from the channel</h2>
          <p className="feed-sub">
            Auto-updates from <a href="https://t.me/quantophobiadeleted" target="_blank" rel="noopener noreferrer">@quantophobiadeleted</a>
          </p>

          {loading && <div className="loading">Loading latest posts…</div>}
          {error && !loading && (
            <div className="error">
              No posts to show right now. <a href="https://t.me/quantophobiadeleted" target="_blank" rel="noopener noreferrer">Visit the channel directly →</a>
            </div>
          )}

          <div className="posts">
            {posts.map((p, i) => (
              <article className="post" key={i}>
                {p.image && <div className="post-img" style={{ backgroundImage: `url(${p.image})` }} />}
                {p.text && <p className="post-text">{p.text}</p>}
                <div className="post-meta">
                  {p.date && <time>{new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time>}
                  {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer">View on Telegram →</a>}
                  {!p.link && <a href="https://t.me/quantophobiadeleted" target="_blank" rel="noopener noreferrer">Open channel →</a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer>
          <a className="cta cta-small" href="https://t.me/quantophobiadeleted" target="_blank" rel="noopener noreferrer">
            Join @quantophobiadeleted
          </a>
          <p>Made with care for learners who refuse to fear math.</p>
          {source && <p className="source-tag">feed source: {source}</p>}
        </footer>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #0a0e27; color: #e8eaf6; line-height: 1.6;
        }
        .page { max-width: 920px; margin: 0 auto; padding: 24px; }
        .hero {
          text-align: center; padding: 60px 20px 50px;
          background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
          border-radius: 24px; margin-bottom: 40px; position: relative; overflow: hidden;
        }
        .symbols {
          font-size: 120px; opacity: 0.07; position: absolute;
          top: 50%; left: 0; right: 0; transform: translateY(-50%);
          display: flex; justify-content: space-around; pointer-events: none;
        }
        h1 { font-size: clamp(2rem, 6vw, 3.5rem); margin-bottom: 16px; position: relative; }
        .strike { text-decoration: line-through; color: #f48fb1; }
        .tagline { font-size: 1.15rem; max-width: 560px; margin: 0 auto 28px; opacity: 0.92; position: relative; }
        .cta {
          display: inline-block; background: #00bcd4; color: #0a0e27;
          padding: 16px 32px; border-radius: 12px; font-weight: 700;
          text-decoration: none; font-size: 1.1rem;
          transition: transform 0.15s, box-shadow 0.15s; position: relative;
        }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,188,212,0.4); }
        .cta-small { padding: 12px 24px; font-size: 1rem; }
        .sub { margin-top: 14px; opacity: 0.7; font-size: 0.9rem; position: relative; }
        section { margin-bottom: 40px; padding: 0 8px; }
        h2 { font-size: 1.6rem; margin-bottom: 12px; color: #80deea; }
        .why p { font-size: 1.05rem; opacity: 0.9; }
        .feed-sub { opacity: 0.7; margin-bottom: 24px; }
        .feed-sub a { color: #80deea; }
        .loading, .error { padding: 30px; text-align: center; background: #151a3a; border-radius: 12px; }
        .error a { color: #80deea; }
        .posts { display: grid; gap: 18px; }
        .post {
          background: #151a3a; border-radius: 14px; padding: 20px;
          border-left: 4px solid #00bcd4; transition: transform 0.15s;
        }
        .post:hover { transform: translateX(4px); }
        .post-img {
          width: 100%; height: 220px;
          background-size: cover; background-position: center;
          border-radius: 8px; margin-bottom: 14px;
        }
        .post-text { white-space: pre-wrap; word-wrap: break-word; margin-bottom: 12px; }
        .post-meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; opacity: 0.7; flex-wrap: wrap; gap: 8px; }
        .post-meta a { color: #80deea; text-decoration: none; }
        footer { text-align: center; padding: 40px 0 20px; border-top: 1px solid #1a237e; margin-top: 40px; }
        footer p { margin-top: 16px; opacity: 0.6; font-size: 0.9rem; }
        .source-tag { font-size: 0.75rem; opacity: 0.4; }
        @media (max-width: 600px) { .hero { padding: 40px 16px; } .symbols { font-size: 70px; } }
      `}</style>
    </>
  );
}