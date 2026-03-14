export type NodeId =
    | 'about'
    | 'contact'
    | 'opera'
    | 'blog'
    | 'dev';

export const NODES = {
    about: { title: 'About', route: '/about', type: 'page' },
    contact: { title: 'Contact', route: '/contact', type: 'page' },
    opera: { title: 'Opera', route: '/opera', type: 'recordings' },
    blog: { title: 'Blog', route: '/blog', type: 'blogIndex' },
    dev: { title: 'Dev', route: '/dev', type: 'projects' },
} as const;


