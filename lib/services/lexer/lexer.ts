import { Token, TokenTypes, newToken, lookupCommand } from '@/lib/services/token/token';

export class Lexer {
    private position: number
    private readPosition: number
    private char: string | null
    constructor(public input: string) {
        this.input = input;
        this.position = 0;
        this.readPosition = 0;
        this.char = '';
        this.readChar();
    }

    readChar() {
        if (this.readPosition >= this.input.length) {
            this.char = null;//end of input
        } else {
            this.char = this.input[this.readPosition];
        }

        this.position = this.readPosition;
        this.readPosition += 1;
    }

    peekChar() {
        if (this.readPosition >= this.input.length) {
            return null;
        } else {
            return this.input[this.readPosition];
        }
    }
    nextToken() {
        let token: Token;

        this.skipWhitespace();

        switch (this.char) {
            case '=':
                if (this.peekChar() === '=') {
                    const ch = this.char;
                    this.readChar();
                    const literal = ch + this.char;
                    token = { type: TokenTypes.EQ, literal };
                } else {
                    token = newToken(TokenTypes.ASSIGN, this.char);
                }
                break;
            case '+':
                token = newToken(TokenTypes.PLUS, this.char);
                break;
            case '-':
                token = newToken(TokenTypes.MINUS, this.char);
                break;
            case '!':
                if (this.peekChar() === '=') {
                    const ch = this.char;
                    this.readChar();
                    const literal = ch + this.char;
                    token = { type: TokenTypes.NOT_EQ, literal };
                } else {
                    token = newToken(TokenTypes.BANG, this.char);
                }
                break;
            case '/':
                token = newToken(TokenTypes.SLASH, this.char);
                break;
            case '*':
                token = newToken(TokenTypes.ASTERISK, this.char);
                break;
            case '<':
                token = newToken(TokenTypes.LT, this.char);
                break;
            case '>':
                token = newToken(TokenTypes.GT, this.char);
                break;
            case ';':
                token = newToken(TokenTypes.SEMICOLON, this.char);
                break;
            case ',':
                token = newToken(TokenTypes.COMMA, this.char);
                break;
            case '(':
                token = newToken(TokenTypes.LPAREN, this.char);
                break;
            case ')':
                token = newToken(TokenTypes.RPAREN, this.char);
                break;
            case '{':
                token = newToken(TokenTypes.LBRACE, this.char);
                break;
            case '}':
                token = newToken(TokenTypes.RBRACE, this.char);
                break;
            case null:
                token = { type: TokenTypes.EOF, literal: '' };
                break;
            default:
                if (this.isLetter(this.char)) {
                    const literal = this.readIdentifier();
                    token = { type: lookupCommand(literal), literal };
                    return token;
                } else if (this.isDigit(this.char)) {
                    token = { type: TokenTypes.INT, literal: this.readNumber() };
                    return token;
                } else {
                    token = newToken(TokenTypes.ILLEGAL, this.char);
                }
        }
        this.readChar();
        return token;
    }

    skipWhitespace() {
        while (this.char !== null && /\s/.test(this.char)) {
            this.readChar();
        }
    }

    readNumber(): string {
        const startPosition = this.position;
        while (this.char !== null && this.isDigit(this.char)) {
            this.readChar();
        }
        return this.input.slice(startPosition, this.position);
    }

    readIdentifier(): string {
        const startPosition = this.position;
        while (this.char !== null && this.isLetter(this.char)) {
            this.readChar();
        }
        return this.input.slice(startPosition, this.position);
    }

    isLetter(ch: string | null): boolean {
        return ch !== null && (/[a-zA-Z_]/.test(ch));
    }

    isDigit(ch: string | null): boolean {
        return ch !== null && (/\d/.test(ch));
    }
}
