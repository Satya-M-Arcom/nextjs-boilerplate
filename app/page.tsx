import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import fs from 'fs'
import path from 'path'

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  }
}

export default function Home() {
  const filePath = path.join(process.cwd(), 'content.mdx')
  let content = '# Welcome to Quantophobia\nPost your first math problem in Telegram to see it here!'
  
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf8')
  }

  return (
    <article className="prose prose-lg prose-blue mx-auto">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-4xl font-bold tracking-tight">Quantophobia Updates</h1>
        <p className="text-gray-500 mt-2">Live AI sync from our Telegram Community</p>
      </header>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <MDXRemote source={content} options={mdxOptions} />
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <a href="https://t.me/quantophobiadeleted" target="_blank" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Join the Discussion on Telegram
          </a>
        </div>
      </div>
    </article>
  )
}