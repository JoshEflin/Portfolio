'use client';
import { useFormState } from 'react-dom';
import { commandParser } from '@/lib/terminal/command-parser';
import { CommandLineInput } from '@/components/terminal/command-line/input';
import { WELCOME } from '@/constants/terminal';

export default function Terminal() {
    const [{ command, prompt, line }, formAction] = useFormState(commandParser, WELCOME);

    const history = {}
    const writeLine = (previousLines, newPrompt, previousCommand, previousPrompt) => {

    }

    return (
        <form
            name="command-line"
            className="terminal"
            action={formAction}
        >
            <CommandLineInput command={command} prompt={prompt} line={line} />
        </form>
    );
};

