'use server'
import { Lexer } from "@/lib/services/lexer/lexer";
import { Parser } from "@/lib/services/parser/parser";

export interface CommandInput {
    command: string;
    cwd: string;
    line: number;
}

//commandLineState is the current state and formData.get('command') tells us what the next state should be
//the state is returned to the form so that we can create command history
export const formParser = async (currentCommandLineState: CommandInput, formData: FormData) => {
    const { command, cwd } = currentCommandLineState;
    console.log(command, cwd)
    const newInput = formData.get('command') as string;
    const lexer = new Lexer(newInput);
    const parser = new Parser(lexer);
    const newCommand = parser.parseTokens(currentCommandLineState, newInput);

    return newCommand;
}
