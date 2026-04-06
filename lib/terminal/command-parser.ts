'use server'
import { Parser } from "@/lib/services/parser/parser";

export interface CommandInput {
    command: string;
    cwd: string;
    line: number;
    selectionId?: string;
}

//currentCommandLineState is the current state and formData.get('command') tells us what the next state should be
//the state is returned to the form so that we can create command history
export const commandParser = async (currentCommandLineState: CommandInput, formData: FormData) => {
    const { command, cwd } = currentCommandLineState;
    console.log(command, cwd)
    const newInput = formData.get('command') as string;
    const normalizedInput = newInput.toLowerCase();
    const parser = new Parser();
    const newCommand = parser.parseTokens(currentCommandLineState, normalizedInput);

    return newCommand;
}
