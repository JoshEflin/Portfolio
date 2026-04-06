import { TerminalResponse } from "@/lib/services/parser/parser";
import { recordings } from '@/content/recordings'
type NodeDefinition = {
    title: string;
    route: string;
    kind: 'text' | 'recordings' | 'blogIndex' | 'projects' | 'link';

    getContent?: () => TerminalResponse;

    actions?: {
        play?: (args: string[]) => TerminalResponse;
        read?: (args: string[]) => TerminalResponse;
    };
};


export const NODES: Record<string, NodeDefinition> = {
    about: {
        title: 'About',
        route: '/about',
        kind: 'text',
        getContent: () => ({
            kind: 'section',
            title: 'About',
            content: [
                'Joshua Eflin',
                '',
                'Software engineer with a focus on systems, infrastructure, and debugging.',
                'Former professional tenor with a background in performance and global travel.',
                '',
                'Current work spans:',
                '- Full-stack development',
                '- Site reliability / production systems',
                '- infrastructure (AWS / Azure/ s)',
                '- Automation and tooling',
                '',
                'Interested in building systems that are:',
                '- Observable',
                '- Composable',
                '- Correct at the right level of abstraction',
                '',
                'Type "cd dev" to view projects.',
                'Type "cd opera" to view recordings.',
            ],
        }),
    },

    contact: {
        title: 'Contact',
        route: '/contact',
        kind: 'link',

        getContent: () => ({
            kind: 'link',
            url: 'mailto:eflinjh@gmail.com?subject=Contact%20from%20portfolio',
            label: 'eflinjh@gmail.com',
        }),
    },
    opera: {
        title: 'Opera',
        route: '/opera',
        kind: 'recordings',

        getContent: () => ({
            kind: 'text',
            content: [
                'Entering OPERA ARCHIVE...',
                '',
                ...recordings.map((r, i) => `${i + 1}. ${r.title}`),
                '',
                'Type: play <number>',
            ].join('\n'),
        }),

        actions: {
            play: (args) => {
                const index = Number(args[0]);

                if (!Number.isInteger(index) || index < 1 || index > recordings.length) {
                    return {
                        kind: 'text',
                        content: `No recording '${args[0]}'.`,
                    };
                }

                const rec = recordings[index - 1];

                return {
                    kind: 'video',
                    youtubeId: rec.youtubeId,
                    title: rec.title,
                };
            },
        },
    },
    dev: {
        title: 'Dev',
        route: '/dev',
        kind: 'projects',

        getContent: () => ({
            kind: 'link',
            url: 'https://github.com/josheflin',
            label: 'GitHub',
        }),
    },
} as const;
