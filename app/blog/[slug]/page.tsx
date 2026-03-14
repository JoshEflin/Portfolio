import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostMeta, getPostSource } from '@/lib/content/blog';

function YouTube({ id, title }: { id: string; title?: string }) {
    return (
        <div style={{ aspectRatio: '16/9', width: '100%', maxWidth: 900 }}>
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={title ?? 'YouTube video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

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
                components={{ YouTube }}
            />
        </main>
    );
}
