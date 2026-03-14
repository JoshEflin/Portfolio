import { Token, TokenTypes } from '@/lib/services/token/token'
import { Lexer } from '@/lib/services/lexer/lexer'
import { CommandInput } from '@/lib/terminal/command-parser'
import { DIRECTORIES } from '@/constants/terminal';

type CommandHandler = (prev: CommandInput, input: string, args?: string[]) => CommandOutput;

type ParsedCommand =
    | { kind: 'empty' }
    | { kind: 'command'; name: string; args: string[]; raw: string }
    | { kind: 'error'; message: string; raw: string };

export interface CommandOutput extends CommandInput {
    response: string | null;
    prevDir: string;
}

export class Parser {
    current: Token;
    peek: Token;

    constructor(public lexer: Lexer) {
        this.current = this.lexer.nextToken();
        this.peek = this.lexer.nextToken();
    }
    nextToken() {
        this.current = this.peek;
        this.peek = this.lexer.nextToken();
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
        //play: (prev, input, args) => this.parsePlayCommand(prev, input, args[]),
        // echo: ...
        // quit: ...
    };
    parseTokens(prev: CommandInput, input: string): CommandOutput {
        if (this.current.type === TokenTypes.EOF) {
            return this.out(prev, input, { response: null });
        }

        // With IDENT-lexing, first token should be IDENT
        if (this.current.type !== TokenTypes.IDENT) {
            return this.out(prev, input, {
                response: `Unexpected token: ${this.current.literal}`,
            });
        }

        const name = this.current.literal.toLowerCase();
        const args = this.collectArgs();

        const handler = this.handlersByName[name];
        if (!handler) {
            return this.out(prev, input, {
                response: `Unknown command: ${name}. Type 'help'.`,
            });
        }

        return handler(prev, input, args);
    }
    private collectArgs(): string[] {
        const args: string[] = [];

        // consume remaining tokens until EOF
        while (this.peek.type !== TokenTypes.EOF) {
            this.nextToken();

            if (this.current.type === TokenTypes.IDENT) {
                args.push(this.current.literal);
            } else if (this.current.type === TokenTypes.SLASH) {
                args.push('/');
            } else if (this.current.type === TokenTypes.INT) {
                // optional: treat numbers as args too
                args.push(this.current.literal);
            } else {
                // For now, treat any other token as a literal arg.
                // Alternatively: return a parse error.
                args.push(this.current.literal);
            }
        }

        return args;
    }
    private parseLsCommand(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: Array.from(DIRECTORIES.keys()).join(' '),
        });
    }

    private getHelp(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: `Type 'ls' to view pages. Type 'cd <page>' to navigate. Type 'cat' for a cat photo. Type 'gui' for GUI mode.`,
        });
    }

    private parseCdCommand(prev: CommandInput, input: string, args: string[]): CommandOutput {
        const target = args[0];

        if (!target || target === '/') {
            return this.out(prev, input, { cwd: '/', response: '' });
        }

        if (!DIRECTORIES.has(target.toUpperCase())) {
            return this.out(prev, input, { response: `No such page: ${target}.` });
        }

        return this.out(prev, input, {
            cwd: `/${target}`,
            response: `changing directory to ${target}`,
        });
    }

    parseCatCommand(previousState: CommandInput, newInput: string): CommandOutput {
        if (previousState.command === 'cat') {
            return this.out(previousState, newInput, {
                response: `
     /\\_/\\  
    / o o \\ 
   (   "   ) 
    \\~(*)~/ 
     \\~_~/  
ooops... this appears to be a bat
`.trimEnd(),
            });
        }
        return this.out(previousState, newInput, {
            response: `
     /\\_/\\  
    ( o.o ) 
     > ^ < `.trimEnd(),
        });
    }

    private parseReadCommand(prev: CommandInput, input: string, args: string[]): CommandOutput {
        const what = args[0];

        if (!what) {
            return this.out(prev, input, {
                response: `Expected argument after read command (e.g. read about)`,
            });
        }

        return this.out(prev, input, {
            response: `handle read function: ${what}`,
        });
    }

    private parseGuiCommand(prev: CommandInput, input: string): CommandOutput {
        return this.out(prev, input, {
            response: `initiating`,
            // later: patch your state with mode: 'gui'
        });
    }
}
