
'use client';

import { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Cursor } from '@/components/terminal/cursor';
import { Prefix } from '@/components/terminal/prefix';

export const CommandLineInput = ({ cwd }: { cwd: string }) => {
    const [input, setInput] = useState('');
    const [cursorPosition, setCursorPosition] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

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
        <div className="command-line">
            <Prefix cwd={cwd} />
            <input
                ref={inputRef}
                id="command-line-input"
                type="text"
                value={input}
                onChange={handleInputChange}
                style={{ minWidth: '1ch', width: 'auto' }}
                autoFocus
            />
            <Cursor position={3 + cursorPosition} inputValue={input} />
        </div>
    );
}

export default CommandLineInput;

