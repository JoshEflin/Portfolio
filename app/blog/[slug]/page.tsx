import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostMeta, getPostSource } from '@/lib/content/blog';


export function generateStaticParams() {
    return getAllPostMeta().map(p => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    let post;
    try {
        post = getPostSource(params.slug);
    } catch {
        notFound();
    }

    return (
        <main>
            <h1>{post.meta.title}</h1>
            <div>{post.meta.date}</div>

            <MDXRemote
                source={post.content}
            />
        </main>
    );
}
