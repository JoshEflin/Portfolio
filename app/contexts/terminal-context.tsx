import { createContext, useState, ReactNode, FC } from "react";

export interface TerminalState {
    value: any;
}
export interface TerminalProviderProps {
    value: any
    children: ReactNode
}

let initialValue: TerminalState;
const TerminalContext = createContext(1);

export const TerminalProvider: FC<TerminalProviderProps> = ({ children }) => {
    const [terminalState, setTerminalState] = useState<TerminalState>(initialValue);
    const commandHistory = 1;

    return (
        <TerminalContext.Provider value={commandHistory}>
            {children}
        </TerminalContext.Provider>
    )
};
