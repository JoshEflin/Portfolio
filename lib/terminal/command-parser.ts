'use server'
import { Lexer } from "@/lib/services/lexer/lexer";
import { Parser } from "@/lib/services/parser/parser";
import { TokenTypes } from "../services/token/token";

interface CommandInput {
    command: string;
    prompt: string;
    line: number;
}

function generateNewPrompt(command: string, previousState: CommandInput) {
    if (previousState.command === 'init') {

        return {
            prompt: "newPrompt",
            command: command,
            line: previousState.line + 1
        }
    }
    return {
        prompt: 'whoops',
        command: command,
        line: previousState.line + 1
    }
}

export const formParser = async (commandLineState: CommandInput, formData: FormData) => {
    const { command, prompt } = commandLineState;
    console.log('COMMAND:\n', command, 'PREFIX:\n', prompt, 'FORMDATA:\n', formData);

    const newInput = formData.get('command') as string;

    const lexer = new Lexer(newInput);

    const parser = new Parser(lexer);

    const output = parser.parseTokens();
    console.log(output, 'OUTPUT')

    const newformState = generateNewPrompt(output, commandLineState)
    return newformState;
}
