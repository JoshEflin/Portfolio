import Link from 'next/link';
import { getAllPostMeta } from '@/lib/content/blog';

export default function BlogIndexPage() {
    const posts = getAllPostMeta();

    return (
        <main>
            <h1>Blog</h1>
            <ul>
                {posts.map(p => (
                    <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                        <div>{p.date}{p.summary ? ` — ${p.summary}` : ''}</div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
