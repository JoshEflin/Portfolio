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

    const [{ command, cwd, line, response, prevDir, clear }, formAction] =
        useActionState(commandParser, WELCOME);

    const [history, setHistory] = useState([
        { command, cwd, line, response, prevDir },
    ]);

    const terminalRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // State and History 
    useEffect(() => {
        setHistory((prev) => {
            if (clear) return [];

            const isNewEntry = prev[prev.length - 1]?.line !== line;
            if (!isNewEntry) return prev;

            if (!command && !response) return prev;

            return [...prev, { prevDir, command, cwd, line, response }];
        });
    }, [line, command, response, cwd, prevDir, clear]);

    // Side effects (navigation + open)
    useEffect(() => {
        router.replace(cwd);

    }, [cwd, router]);

    //  3. Scroll like a terminal
    useEffect(() => {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'auto',
            });
        });
    }, [history]);

    // (focus)
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                terminalRef.current &&
                e.target instanceof Node &&
                terminalRef.current.contains(e.target)
            ) {
                inputRef.current?.focus();
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="terminal" ref={terminalRef}>
            <div className="history-container">
                <HistoryManager history={history} />
            </div>

            <form
                name="command-line"
                action={(formData: FormData) => {
                    const raw = (formData.get('command') as string)?.toLowerCase();

                    if (raw === 'resume') {
                        window.open('/resume.pdf', '_blank');
                    }

                    formAction(formData);
                }}
            >
                <CommandLineInput cwd={cwd} line={line} inputRef={inputRef} />
            </form>
        </div>
    );
}
