import { Token, TokenTypes } from '@/lib/services/token/token'
import { Lexer } from '@/lib/services/lexer/lexer'
import { CommandInput } from '@/lib/terminal/command-parser'
import { redirect } from 'next/navigation';
import { DIRECTORIES } from '@/constants/terminal';

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

    parseTokens(previousState: CommandInput, newInput: string): CommandOutput {
        let result: CommandOutput = {
            prevDir: previousState.cwd,
            cwd: previousState.cwd,
            command: previousState.command,
            response: 'if you are seeing this, I have made a grave error. BEWARE',
            line: previousState.line + 1
        }

        while (this.current.type !== TokenTypes.EOF) {
            console.log('type', this.current.type);
            switch (this.current.type) {
                case TokenTypes.CD:
                    result = this.parseCdCommand(previousState, newInput);
                    break;
                case TokenTypes.LS:
                    result = this.parseLsCommand(previousState, newInput);
                    break;
                case TokenTypes.CAT:
                    result = this.parseCatCommand(previousState, newInput);
                    break;
                case TokenTypes.READ:
                    result = this.parseReadCommand(previousState, newInput);
                    break;
                case TokenTypes.ARGUMENT:
                    result = this.parseArgumentCommand(previousState, newInput);
                    break;
                case TokenTypes.HELP:
                    result = this.getHelp(previousState, newInput);
                    break;
                default:
                    result = {
                        cwd: previousState.cwd,
                        prevDir: previousState.cwd,
                        command: previousState.command,
                        response: `the command '${this.current.literal}' doesn't warrant a response`,
                        line: previousState.line + 1
                    }
            }
            this.nextToken();
        }

        return result;
    }

    parseCdCommand(previousState: CommandInput, newInput: string) {
        this.nextToken();

        if (this.current.type === TokenTypes.EOF || this.current.type === TokenTypes.SLASH) {
            return {
                prevDir: previousState.cwd,
                cwd: `/`,
                response: ``,
                command: newInput,
                line: previousState.line + 1
            }

        } else if (!DIRECTORIES.has(this.current.literal)) {
            return {

                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                response: `Expected a legal dir name after cd command, got ${this.current.literal}`,
                command: newInput,
                line: previousState.line + 1
            }

        } else if (this.current.type === TokenTypes.ARGUMENT && DIRECTORIES.has(this.current.literal)) {

            return {
                prevDir: previousState.cwd,
                cwd: `/${this.current.literal}`,
                response: `changing directory to ${this.current.literal}`,
                command: newInput,
                line: previousState.line + 1
            }
        }
    }

    parseLsCommand(previousState: CommandInput, newInput: string): CommandOutput {
        return {
            prevDir: previousState.cwd,
            cwd: previousState.cwd,
            command: newInput,
            response: Array.from(DIRECTORIES.keys()).join(' '),
            line: previousState.line + 1
        }
    }

    parseCatCommand(previousState: CommandInput, newInput: string): CommandOutput {
        if (previousState.command === 'cat') {
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: newInput,
                response: `
     /\\_/\\  
    / o o \\ 
   (   "   ) 
    \\~(*)~/ 
     \\~_~/  
ooops... this appears to be a bat
`,
                line: previousState.line + 1
            }
        }
        else {
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: newInput,
                response: `
     /\\_/\\  
    ( o.o ) 
     > ^ < `,
                line: previousState.line + 1
            }
        }
    }

    parseReadCommand(previousState: CommandInput, newInput: string): CommandOutput {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: newInput,
                response: 'handle read function',
                line: previousState.line + 1
            }
        } else {
            console.log(`Expected argument after read command, got ${this.current.literal}`);
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: previousState.command,
                response: 'handle read function',
                line: previousState.line + 1
            }
        }
    }

    parseArgumentCommand(previousState: CommandInput, newInput: string) {
        this.nextToken();
        return {
            prevDir: previousState.cwd,
            cwd: previousState.cwd,
            response: `${newInput} is not a valid command...seek help immediately`,
            command: newInput,
            line: previousState.line + 1
        }
    }
    getHelp(previousState: CommandInput, newInput: string) {
        return {

            prevDir: previousState.cwd,
            cwd: previousState.cwd,
            response: `Type 'ls' to view a list of navigable pages. Type 'cd' then the page name to navigate to the page. Type cat for a cat photo`,
            command: newInput,
            line: previousState.line + 1
        }
    }
}
