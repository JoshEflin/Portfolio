import { Response, LinePrompt, PreviousCommand } from "@/components/terminal/command-line/prompt";

interface Props {
    history: History[]
}

interface History {
    prevDir: string;
    command: string
    cwd?: string
    line?: number
    response: string | null
}

const getTrimmedHistory = (history: History[]) => {
    if (history[1] && history[0].command === 'init') {
        console.log(history.slice(1));
        return history.slice(1);
    }
    return history;
};

const History: React.FC<History> = ({ response, prevDir, command }) => (
    <div className="history" >
        <LinePrompt cwd={prevDir} />
        <PreviousCommand command={command} />
        <Response response={response} prev={command} />
    </div>);

export const HistoryManager: React.FC<Props> = ({ history }) => {
    const trimmedHistory = getTrimmedHistory(history);

    if (trimmedHistory[0].command === 'init') {
        return null;
    } else {
        return trimmedHistory.map(({ prevDir, command, line, response }) => (
            <History
                key={line}
                response={response}
                prevDir={prevDir}
                command={command}
            />
        ))
    }
}
