'use server'

interface CommandInput {
    command: string;
    prompt: string;
    line: number;
}

function generateNewPrompt(command: string, previousState: CommandInput) {
    if (previousState.command === 'init') {

        return {
            prompt: "ASCIIArt()",
            command: previousState.command,
            line: previousState.line + 1
        }
    }
    return {
        command: command,
        prompt: 'whoops',
        line: previousState.line
    }
}

export const commandParser = async (commandLineState: CommandInput, formData: FormData) => {
    const { command, prompt, line } = commandLineState;
    console.log('COMMAND:\n', command, 'PREFIX:\n', prompt, 'FORMDATA:\n', formData);

    const newCommand = formData.get('command') as string;

    console.log(newCommand)
    const newformState = generateNewPrompt(newCommand, commandLineState)
    return newformState;
}
