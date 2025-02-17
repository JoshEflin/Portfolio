'use client';
import { useFormState } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import { commandParser } from '@/lib/terminal/command-parser';
import { CommandLineInput } from '@/components/terminal/command-line/input';
import { WELCOME } from '@/constants/terminal';
import { HistoryManager } from '@/components/terminal/history';
import { useRouter } from 'next/navigation';

export function Terminal() {
    const router = useRouter();
    const [{ command, cwd, line, response, prevDir }, formAction] = useFormState(commandParser, WELCOME);
    const [history, setHistory] = useState([{ command, cwd, line, response, prevDir }])
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setHistory((previousHistory) => {
            // Prevent infinite rerender 
            const isNewEntry = previousHistory[previousHistory.length - 1]?.line !== line;
            return isNewEntry ? [...previousHistory, { prevDir, command, cwd, line, response }] : previousHistory;
        });
    }, [line, command, response, cwd, prevDir]);

    useEffect(() => {
        // client side routing allows terminal state to be persistent
        // This is maybe an improper use of nextjs... 
        // Consider other strategies for persisting terminal state such as context
        router.push(cwd)
    }, [router, cwd])

    useEffect(() => {

        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history])
    useEffect(() => {
        const handleClick = (e:any ) => {
            if (terminalRef.current && terminalRef.current.contains(e.target)) {
                inputRef?.current?.focus();
            }
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [])

    return (
        <div className='terminal' ref={terminalRef}>
            <HistoryManager history={history} />
            <form
                name="command-line"
                action={formAction}
            >
                <CommandLineInput cwd={cwd} line={line} inputRef={inputRef} />
            </form>
        </div>
    );
};

