
'use client';

import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { commandParser } from '../../../lib/terminal/command-parser';
import { Cursor } from '@/components/terminal/cursor';
import { Prefix } from '@/components/terminal/prefix';

export const CommandLineInput = () => {
    const [state, formAction] = useFormState(commandParser, null);
    const [input, setInput] = useState('');
    //setCursorPosition needs a new name
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const prefix = "guest@josheflin.com:~/$";

    const handleCursor = (newPrefix: string) => {
        console.log(newPrefix);
        const position = prefix.length + cursorPosition;

        return position;
    }

    useEffect(() => {
        setInput('');
        setCursorPosition(0);
    }, [state]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = `${Math.max(1, input.length + 1)}ch`;
        }

    }, [input]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, selectionStart } = e.target;
        console.log(selectionStart)
        setInput(value);
        setCursorPosition(selectionStart!);  // No need to adjust position by +1
    };

    return (
        <form
            name="command-line"
            className="command-line"
            action={formAction}
        >
            <label>
                <Prefix cwd={prefix} />
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
                <Cursor position={handleCursor(prefix)} />
                <button type="submit" form="command-line" />
            </label>
        </form>
    );
};

