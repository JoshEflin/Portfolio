import { TerminalResponse } from "@/lib/services/parser/parser";
import { recordings } from '@/content/recordings'
type NodeDefinition = {
    title: string;
    route: string;
    kind: 'text' | 'recordings' | 'blogIndex' | 'projects';

    getContent?: () => string;

    actions?: {
        play?: (args: string[]) => TerminalResponse;
        read?: (args: string[]) => TerminalResponse;
    };
};


export const NODES: Record<string, NodeDefinition> = {
    about: { title: 'About', route: '/about', kind: 'text' },
    contact: { title: 'Contact', route: '/contact', kind: 'text' },
    opera: {
        title: 'Opera',
        route: '/opera',
        kind: 'recordings',

        getContent: () => [
            'Entering OPERA ARCHIVE...',
            '',
            ...recordings.map(r => `${r.id}. ${r.title}`),
            '',
            'Type: play <number>',
        ].join('\n'),

        actions: {
            play: (args) => {
                const index = Number(args[0]);

                if (!Number.isInteger(index) || index < 1 || index > recordings.length) {
                    return { type: 'text', content: `No recording '${args[0]}'.` };
                }

                const rec = recordings[index - 1];

                return {
                    type: 'video',
                    youtubeId: rec.youtubeId,
                    title: rec.title,
                };
            }
        }
    },
    blog: { title: 'Blog', route: '/blog', kind: 'blogIndex' },
    dev: { title: 'Dev', route: '/dev', kind: 'projects' },
} as const;
