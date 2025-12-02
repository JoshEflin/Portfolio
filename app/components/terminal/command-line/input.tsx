'use client';

import { ChangeEvent, useState, useRef, useEffect, RefObject } from 'react';
import { Cursor } from '@/components/terminal/command-line/cursor';
import { LinePrompt } from '@/components/terminal/command-line/prompt';
import { prompt } from '@/constants/terminal';

interface CommandLineState {
    cwd: string;
    line: number
    inputRef: RefObject<HTMLInputElement>;
}

export const CommandLineInput = ({ cwd, line, inputRef }: CommandLineState) => {
    const [input, setInput] = useState('');
    const [cursorPosition, setCursorPosition] = useState<number>(0);

    const linePrompt = cwd ? prompt(`${cwd}`) : prompt('/');
    const calculatedCursorPosition = linePrompt.length + cursorPosition;

    //ensure the blinking cursor is in the correct location on page load
    useEffect(() => {
        setInput('');
        setCursorPosition(0);
    }, [line]);

    //ensure the cursor doesnt cover the most recently typed char 
    useEffect(() => {
        const width = Math.max(1, input.length + 1);

        if (inputRef.current) {
            inputRef.current.style.width = `${width}ch`;
        }
    }, [input]);

    //ensure that the input button remains focused
    useEffect(() => {
        const handleDocumentClick = () => {
            if (inputRef.current) {
                inputRef.current.focus();
                // Optional: keep cursor at end
                inputRef.current.selectionStart = inputRef.current.value.length;
                inputRef.current.selectionEnd = inputRef.current.value.length;
            }
        };

        document.addEventListener('click', handleDocumentClick);
        return () => document.removeEventListener('click', handleDocumentClick);
    }, [inputRef]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, selectionStart } = e.target;
        setInput(value);
        setCursorPosition(selectionStart!);
    };

    return (
        <label
            className="command-line"
        >
            <LinePrompt cwd={cwd} />
            <input
                ref={inputRef}
                id="command-line-input"
                name="command"
                type="text"
                value={input}
                onChange={handleInputChange}
                style={{ minWidth: '1ch', width: 'auto' }}
                autoFocus
            />
            <Cursor position={calculatedCursorPosition} />
            <button type="submit" form="command-line" aria-hidden />
        </label>
    );
};

