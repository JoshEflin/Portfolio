import { createContext, useState, ReactNode, FC } from "react";
import { WELCOME } from '@/constants/terminal';

export interface TerminalState {
    command: string
    cwd: string
    response: string
    line: number
}
export interface TerminalProviderProps {
    history: TerminalState[]
    children: ReactNode
}

let initialValue: TerminalState;
export const TerminalContext = createContext([WELCOME]);

export const TerminalProvider: FC<TerminalProviderProps> = ({ history, children }) => {
    const [terminalHistory, setTerminalHistory] = useState<TerminalState[]>(history);

    const handleUpdateTerminalState = (currentCommand: TerminalState): TerminalState[] => {

        setTerminalHistory([...history, currentCommand])
        return terminalHistory;
    }

    return (
        <TerminalContext.Provider value={terminalHistory}>
            {children}
        </TerminalContext.Provider>
    )
};
