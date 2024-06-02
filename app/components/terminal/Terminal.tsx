'use client';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { formParser } from '@/lib/terminal/command-parser';
import { CommandLineInput } from '@/components/terminal/command-line/input';
import { WELCOME } from '@/constants/terminal';
import { History } from '@/components/terminal/history';

export function Terminal() {
    const [{ command, cwd, line, response, prevDir }, formAction] = useFormState(formParser, WELCOME);
    const [history, setHistory] = useState([{ command, cwd, line, response, prevDir }])

    useEffect(() => {
        setHistory((previousHistory) => {
            const isNewEntry = previousHistory[previousHistory.length - 1]?.line !== line;
            return isNewEntry ? [...previousHistory, { prevDir, command, cwd, line, response }] : previousHistory;
        });
    }, [line, command, response, cwd, prevDir]);

    return (
        <div className='terminal'>
            <History history={history} />
            <form
                name="command-line"
                action={formAction}
            >
                <CommandLineInput cwd={cwd} line={line} />
            </form>
        </div>
    );
};
