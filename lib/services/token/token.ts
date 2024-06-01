export enum TokenTypes {
    ILLEGAL = 'ILLEGAL',
    EOF = 'EOF',
    ARGUMENT = 'ARGUMENT',
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
export const lookupCommand = (command: string): TokenTypes => {
    const operations: { [key: string]: TokenTypes } = {
        'ls': TokenTypes.LS,
        'cd': TokenTypes.CD,
        'help': TokenTypes.HELP,
        'cat': TokenTypes.CAT,
        'echo': TokenTypes.ECHO,
        'read': TokenTypes.READ
    };

    return operations[command] || TokenTypes.ARGUMENT;
}

export const newToken = (tokenType: TokenTypes, ch: string | null): Token => {
    return { type: tokenType, literal: ch !== null ? ch : '' };
};

