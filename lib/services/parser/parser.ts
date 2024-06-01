import { Token, TokenTypes } from '@/lib/services/token/token'
import { Lexer } from '@/lib/services/lexer/lexer'

interface ParserInput {
    type: TokenTypes
    literal: string
}

export function arrayParser(tokenArray: ParserInput[]) {
    tokenArray.map((token) => {

        switch (token.type) {
            case TokenTypes.LS:
                console.log('LS tokenType');
                break;
            case TokenTypes.CD:
                console.log('CD tokenType');
                break;
            case TokenTypes.CAT:
                console.log('CAT tokenType');
                break;
            case TokenTypes.ARGUMENT:
                console.log('ARGUMENT tokenType');
                break;
            case TokenTypes.READ:
                console.log('READ tokenType');
                break;
            default:
                console.log('not working');
        }
    })
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

    parseTokens(): string {
        let result = '';
        while (this.current.type !== TokenTypes.EOF) {
            switch (this.current.type) {
                case TokenTypes.CD:
                    result += this.parseCdCommand();
                    break;
                case TokenTypes.LS:
                    result += this.parseLsCommand();
                    break;
                case TokenTypes.CAT:
                    result += this.parseCatCommand();
                    break;
                case TokenTypes.READ:
                    result += this.parseReadCommand();
                    break;
                case TokenTypes.ARGUMENT:
                    result += this.parseArgumentCommand();
                    break;
                default:
                    result += `${this.current.literal} not a valid input\n`;
            }
            this.nextToken();
        }
        return result || 'not working';
    }

    parseCdCommand(): string {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            console.log(`changing directory to ${this.current.literal}`);
            return `changing directory to ${this.current.literal}\n`;
        } else {
            console.log(`Expected argument after cd command, got ${this.current.literal}`);
            return `Expected argument after cd command, got ${this.current.literal}\n`;
        }
    }

    parseLsCommand(): string {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            console.log(`did not expect argument after ls command, got ${this.current.literal}`);
            return `Did not expect argument after ls command, got ${this.current.literal}\n`;
        } else {
            return 'Opera\nEngineering\nContact\nResume\n';
        }
    }

    parseCatCommand(): string {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            console.log('handle cat function');
            return 'handle cat function\n';
        } else {
            console.log(`Expected argument after cat command, got ${this.current.literal}`);
            return `Expected argument after cat command, got ${this.current.literal}\n`;
        }
    }

    parseReadCommand(): string {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            console.log('handle read function');
            return 'handle read function\n';
        } else {
            console.log(`Expected argument after read command, got ${this.current.literal}`);
            return `Expected argument after read command, got ${this.current.literal}\n`;
        }
    }

    parseArgumentCommand(): string {
        this.nextToken();
        if (this.current.type === TokenTypes.ARGUMENT) {
            console.log('handle argument function');
            return 'handle argument function\n';
        } else {
            console.log(`Expected argument after argument command, got ${this.current.literal}`);
            return `Expected argument after argument command, got ${this.current.literal}\n`;
        }
    }
}
