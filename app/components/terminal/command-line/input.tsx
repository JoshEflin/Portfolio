'use client';

import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Cursor } from '@/components/terminal/command-line/cursor';
import { LinePrompt } from '@/components/terminal/command-line/prompt';
import { PROMPT } from '@/constants/terminal';

interface CommandLineState {
    prompt: string;
}

export const CommandLineInput = ({ prompt }: CommandLineState) => {
    const [input, setInput] = useState('');
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const linePrompt = prompt || PROMPT;
    const calculateCursorPosition = linePrompt.length + cursorPosition;

    useEffect(() => {
        setInput('');
        setCursorPosition(0);
    }, [prompt]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = `${Math.max(1, input.length + 1)}ch`;
        }

    }, [input]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, selectionStart } = e.target;
        setInput(value);
        setCursorPosition(selectionStart!);  // No need to adjust position by +1
    };

    return (
        <label
            className="command-line"
        >
            <LinePrompt cwd={linePrompt} />
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
            <Cursor position={calculateCursorPosition} />
            <button type="submit" form="command-line" />
        </label>
    );
};
