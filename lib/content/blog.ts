import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type BlogMeta = {
    slug: string;
    title: string;
    date: string;      // ISO string in frontmatter
    summary?: string;
    tags?: string[];
};

export function getAllPostMeta(): BlogMeta[] {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));

    const posts = files.map((filename) => {
        const fullPath = path.join(BLOG_DIR, filename);
        const raw = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(raw);

        const slug = filename.replace(/\.mdx$/, '');
        return {
            slug,
            title: String(data.title ?? slug),
            date: String(data.date ?? ''),
            summary: data.summary ? String(data.summary) : undefined,
            tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        };
    });

    // newest first (assumes ISO date)
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return posts;
}

export function getPostSource(slug: string): { meta: BlogMeta; content: string } {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);

    return {
        meta: {
            slug,
            title: String(data.title ?? slug),
            date: String(data.date ?? ''),
            summary: data.summary ? String(data.summary) : undefined,
            tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
        },
        content,
    };
}
