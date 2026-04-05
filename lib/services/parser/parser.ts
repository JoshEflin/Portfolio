import { CommandInput } from '@/lib/terminal/command-parser'
import { DIRECTORIES } from '@/constants/terminal';
import { recordings } from '@/content/recordings';
import { NODES } from '@/lib/site/nodes'

type CommandHandler = (prev: CommandInput, input: string, args?: string[]) => CommandOutput;
export type TerminalResponse =
    | { type: 'text'; content: string }
    | { type: 'video'; youtubeId: string, title?: string }

export interface CommandOutput extends CommandInput {
    response: TerminalResponse | null;
    prevDir: string;
    clear?: boolean;
    open?: string;
}

export class Parser {
    constructor() {
    }
    private out(prev: CommandInput, input: string, patch: Partial<CommandOutput>): CommandOutput {
        return {
            prevDir: prev.cwd,
            cwd: prev.cwd,
            command: input,
            response: null,
            line: prev.line + 1,
            ...patch,
        };
    }

    // Command table keyed by command *string*
    private handlersByName: Record<string, CommandHandler> = {
        ls: (prev, input) => this.parseLsCommand(prev, input),
        help: (prev, input) => this.getHelp(prev, input),
        cat: (prev, input) => this.parseCatCommand(prev, input),
        cd: (prev, input, args) => this.parseCdCommand(prev, input, args!),
        read: (prev, input, args) => this.parseReadCommand(prev, input, args!),
        gui: (prev, input) => this.parseGuiCommand(prev, input),
        play: (prev, input, args) => this.parsePlayCommand(prev, input, args!),
        clear: (prev, input) => this.parseClearCommand(prev, input),
        resume: (prev, input) => this.parseResumeCommand(prev, input),
        // echo: ...
        // quit: ...
    };
    parseTokens(prev: CommandInput, input: string): CommandOutput {
        const trimmed = input.trim();

        if (!trimmed) {
            return this.out(prev, input, { response: null });
        }

        const parts = trimmed.split(/\s+/);

        const name = parts[0].toLowerCase();
        const args = parts.slice(1).map(a => a.toLowerCase());

        const handler = this.handlersByName[name];

        if (!handler) {
            return this.out(prev, input, {
                response: {
                    type: 'text',
                    content: `Unknown command: ${name}. Type 'help'.`
                }
            });
        }

        return handler(prev, input, args);
    }
    private parseLsCommand(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: { type: 'text', content: Array.from(DIRECTORIES.keys()).join(' ') }
        });
    }

    private getHelp(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: { type: 'text', content: `Type 'ls' to view pages. Type 'cd <page>' to navigate. Type 'cat' for a cat photo. Type 'gui' for GUI mode.` }
        });
    }

    private parseCdCommand(prev: CommandInput, input: string, args: string[]): CommandOutput {
        const raw = args[0];

        if (!raw || raw === '/') {
            return this.out(prev, input, { cwd: '/', response: null });
        }

        //  Use DIRECTORIES (case-insensitive, canonical mapping)
        const key = DIRECTORIES.get(raw.toUpperCase());

        if (!key) {
            return this.out(prev, input, {
                response: { type: 'text', content: `No such page: ${raw}` }
            });
        }

        const node = NODES[key];

        switch (node.kind) {
            case 'text':
                return this.out(prev, input, {
                    cwd: node.route,
                    response: {
                        type: 'text',
                        content: `Entering ${node.title}...\n\nContent coming soon.`,
                    },
                });

            case 'recordings': {

                return this.out(prev, input, {
                    cwd: node.route,
                    response: {
                        type: 'text',
                        content: [
                            'Entering OPERA ARCHIVE...',
                            '\n',
                            ...recordings.map(r => `${r.id}. ${r.title}`),
                            '\n',
                            'To play the video please type: "play" and then a space then the track number',
                        ].join('\n'),
                    },
                });
            }

            case 'blogIndex':
                return this.out(prev, input, {
                    cwd: node.route,
                    response: {
                        type: 'text',
                        content: 'Blog index coming soon...',
                    },
                });

            case 'projects':
                return this.out(prev, input, {
                    cwd: node.route,
                    response: {
                        type: 'text',
                        content: 'Projects coming soon...',
                    },
                });
        }

    } parseCatCommand(previousState: CommandInput, newInput: string): CommandOutput {
        if (previousState.command === 'cat') {
            return this.out(previousState, newInput, {
                response: {
                    type: 'text', content: `
     /\\_/\\  
    / o o \\ 
   (   "   ) 
    \\~(*)~/ 
     \\~_~/  
ooops... this appears to be a bat
`.trimEnd(),
                }
            });
        }
        return this.out(previousState, newInput, {
            response: {
                type: 'text', content: `
     /\\_/\\  
    ( o.o ) 
     > ^ < `.trimEnd(),
            }
        });
    }

    private parseReadCommand(prev: CommandInput, input: string, args: string[]): CommandOutput {
        const what = args[0];

        if (!what) {
            return this.out(prev, input, {
                response: { type: 'text', content: `Expected argument after read command (e.g. read about)` }
            });
        }

        return this.out(prev, input, {
            response: { type: 'text', content: `handle read function: ${what}` }
        });
    }

    private parseGuiCommand(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: { type: 'text', content: `initiating` }
            // later: patch your state with mode: 'gui'
        });
    }

    private parsePlayCommand(prev: CommandInput, input: string, args: string[]): CommandOutput {
        const key = prev.cwd.replace('/', '');

        const node = NODES[key as keyof typeof NODES];

        if (!node?.actions?.play) {
            return this.out(prev, input, {
                response: { type: 'text', content: `Command 'play' not available here.` }
            });
        }

        return this.out(prev, input, {
            cwd: prev.cwd,
            response: node.actions.play(args),
        });
    }
    private parseClearCommand(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: null,
            clear: true,
            command: ''
        });
    }
    private parseResumeCommand(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: {
                type: 'text',
                content: 'Opening resume...'
            },
            open: '/resume.pdf' // 🔑 custom field
        });
    }
}
