import { Token, TokenTypes } from '@/lib/services/token/token'
import { Lexer } from '@/lib/services/lexer/lexer'
import { CommandInput } from '@/lib/terminal/command-parser'

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
            response: 'something went wrong, please try again',
            line: previousState.line + 1
        }

        while (this.current.type !== TokenTypes.EOF) {
            switch (this.current.type) {
                case TokenTypes.CD:
                    result = this.parseCdCommand(previousState, newInput);
                    break;
                case TokenTypes.LS:
                    result = this.parseLsCommand(previousState);
                    break;
                case TokenTypes.CAT:
                    result = this.parseCatCommand(previousState);
                    break;
                case TokenTypes.READ:
                    result = this.parseReadCommand(previousState);
                    break;
                default:
                    result = {
                        cwd: previousState.cwd,
                        prevDir: previousState.cwd,
                        command: previousState.command,
                        response: 'something went wrong, please try again',
                        line: previousState.line + 1
                    }

            }
            this.nextToken();
        }
        return result;

    }

    parseCdCommand(previousState: CommandInput, newInput: string) {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            return {
                prevDir: previousState.cwd,
                cwd: `/${this.current.literal}`,
                response: `changing directory to ${this.current.literal}`,
                command: newInput,
                line: previousState.line + 1
            }
        } else {


            return {
                prevDir: previousState.cwd,
                cwd: `${this.current.literal}`,
                response: `Expected argument after cd command, got ${this.current.literal}`,
                command: newInput,
                line: previousState.line + 1
            }
        }
    }

    parseLsCommand(previousState: CommandInput): CommandOutput {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: previousState.command,
                response: 'engineering\nopera\nresume\nblog\nabout',
                line: previousState.line + 1
            }

        } else {
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: previousState.command,
                response: 'engineering\nopera\nresume\nblog\nabout',
                line: previousState.line + 1
            }
        }
    }

    parseCatCommand(previousState: CommandInput): CommandOutput {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: previousState.command,
                response: 'handle Cat function',
                line: previousState.line + 1
            }
        } else {
            console.log(`Expected argument after cat command, got ${this.current.literal}`);
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: previousState.command,
                response: 'handle Cat function',
                line: previousState.line + 1
            }
        }
    }

    parseReadCommand(previousState: CommandInput): CommandOutput {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            return {
                prevDir: previousState.cwd,
                cwd: previousState.cwd,
                command: previousState.command,
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
}
