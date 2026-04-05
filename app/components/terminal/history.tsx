import { Response, LinePrompt, PreviousCommand } from "@/components/terminal/command-line/prompt";
import { TerminalResponse } from "@/lib/services/parser/parser";

interface Props {
    history: History[]
}

interface History {
    prevDir: string;
    command: string
    cwd?: string
    line?: number
    response: TerminalResponse | null
}

const getTrimmedHistory = (history: History[]) => {
    if (history.length > 1 && history[0]?.command === 'init') {
        return history.slice(1);
    }
    return history;
};

const History: React.FC<History> = ({ response, prevDir, command }) => (
    <div className="history">
        <div className="command-row">
            <LinePrompt cwd={prevDir} />
            <PreviousCommand command={command} />
        </div>

        <Response response={response} prev={command} />
    </div>
);
export const HistoryManager: React.FC<Props> = ({ history }) => {
    const trimmedHistory = getTrimmedHistory(history);

    if (trimmedHistory.length === 0) return null;

    if (trimmedHistory[0]?.command === 'init') return null;

    return trimmedHistory.map(({ prevDir, command, line, response }) => (
        <History
            key={line}
            response={response}
            prevDir={prevDir}
            command={command}
        />
    ));
};


