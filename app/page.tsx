'use client';
import { useFormState } from 'react-dom';
import { formParser } from '@/lib/terminal/command-parser';
import { CommandLineInput } from '@/components/terminal/command-line/input';
import { WELCOME } from '@/constants/terminal';

export default function Terminal() {
    const [{ command, prompt, line }, formAction] = useFormState(formParser, WELCOME);

    const history = {}
    const writeLine = (previousLines, newPrompt, previousCommand, previousPrompt) => {

    }

    return (
        <div className='terminal'>
            <div>{command}</div>
            <div>{line}</div>
            <form
                name="command-line"
                action={formAction}
            >
                <CommandLineInput prompt={prompt} />
            </form>
        </div>
    );
};

