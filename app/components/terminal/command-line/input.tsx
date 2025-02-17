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

    useEffect(() => {
        setInput('');
        setCursorPosition(0);
    }, [line]);

    useEffect(() => {
        const width = Math.max(1, input.length + 1);

        if (inputRef.current) {
            inputRef.current.style.width = `${width}ch`;
        }
    }, [input]);

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
            <button type="submit" form="command-line" />
        </label>
    );
};

