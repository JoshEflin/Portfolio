import { TerminalContext } from './terminal-context'
import { useContext } from 'react'
export const useTerminalContext = () => {
    const context = useContext(TerminalContext)
    if (!context) {
        throw new Error(
            'useTerminalContext must be used within UserContext provider',
        )
    }
    return context;
}

