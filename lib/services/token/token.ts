export enum TokenTypes {
    GUI = 'GUI',
    ILLEGAL = 'ILLEGAL',
    EOF = 'EOF',
    IDENT = 'IDENT',
    INT = 'INT',
    ASSIGN = '=',
    PLUS = '+',
    MINUS = '-',
    BANG = '!',
    ASTERISK = '*',
    SLASH = '/',
    LT = '<',
    GT = '>',
    EQ = '==',
    NOT_EQ = '!=',
    SEMICOLON = ';',
    COMMA = ',',
    LPAREN = '(',
    RPAREN = ')',
    LBRACE = '{',
    RBRACE = '}',
    LS = 'LS',
    CD = 'CD',
    HELP = 'HELP',
    QUIT = 'QUIT',
    CAT = 'CAT',
    ECHO = 'ECHO',
    READ = 'READ',
}

export interface Token {
    type: TokenTypes;
    literal: string;
}

export const newToken = (tokenType: TokenTypes, ch: string | null): Token => {
    return { type: tokenType, literal: ch !== null ? ch : '' };
};

