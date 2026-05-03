// @ts-nocheck
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
};

async function getPosts() {
  const username = 'Satya-M-Arcom'; 
  const repo = 'quantophobiadeleted';

  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}/issues?state=open`, {
      next: { revalidate: 120 } 
    });
    
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      return;
    }
    return data;
  } catch (error) {
    return;
  }
}

export default async function Home() {
  const issues = await getPosts();
  const hasIssues = issues && issues.length > 0;

  return (
    <article className="prose prose-lg prose-blue mx-auto">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold tracking-tight">Quantophobia Updates</h1>
        <p className="text-gray-500 mt-2">Live AI sync from our Telegram Community</p>
      </header>

      {!hasIssues? (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p>Waiting for the first Telegram post...</p>
        </div>
      ) : (
        issues.map((issue: any) => (
          <div key={issue.id} className="bg-white p-6 rounded-lg shadow-sm border mb-8 overflow-hidden">
            <p className="text-sm text-gray-400 mb-4">{new Date(issue.created_at).toLocaleDateString()}</p>
            <MDXRemote source={issue.body 

| ""} options={mdxOptions} />
          </div>
        ))
      )}

      <div className="mt-8 pt-6 border-t border-gray-100">
        <a 
          href="https://t.me/quantophobiadeleted" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition inline-block"
        >
          Join the Discussion on Telegram
        </a>
      </div>
    </article>
  );
}