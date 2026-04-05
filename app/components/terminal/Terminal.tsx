'use client';
import { useActionState } from 'react';
import { useEffect, useState, useRef } from 'react';
import { commandParser } from '@/lib/terminal/command-parser';
import { CommandLineInput } from '@/components/terminal/command-line/input';
import { WELCOME } from '@/constants/terminal';
import { HistoryManager } from '@/components/terminal/history';
import { useRouter } from 'next/navigation';

export function Terminal() {
    const router = useRouter();
    const [{ command, cwd, line, response, prevDir, open, clear }, formAction] = useActionState(commandParser, WELCOME);
    const [history, setHistory] = useState([{ command, cwd, line, response, prevDir }])
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setHistory((previousHistory) => {
            if (clear) {
                return [];
            }

            const isNewEntry =
                previousHistory[previousHistory.length - 1]?.line !== line;

            if (!isNewEntry) return previousHistory;

            if (!command && !response) return previousHistory;

            return [
                ...previousHistory,
                { prevDir, command, cwd, line, response },
            ];
        });
    }, [line, command, response, cwd, prevDir]); useEffect(() => {
        // client side routing allows terminal state to be persistent
        // This is maybe hacky...
        // Consider other strategies for persisting terminal state such as context
        router.replace(cwd)
    }, [router, cwd])

    useEffect(() => {

        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history])

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const isInsideTerminal = terminalRef.current && e.target instanceof Node && terminalRef.current.contains(e.target);

            if (isInsideTerminal) {
                inputRef?.current?.focus();
            }
        }
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])
    useEffect(() => {
        if (open) {
            window.open(open, '_blank');
        }
    }, [open]);

    return (
        <div className='terminal' ref={terminalRef}>

            <div className="history-container">
                <HistoryManager history={history} />
            </div>
            <form
                name="command-line"
                action={formAction}
            >
                <CommandLineInput cwd={cwd} line={line} inputRef={inputRef} />
            </form>
        </div>
    );
};

