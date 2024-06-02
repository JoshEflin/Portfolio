import { Response, LinePrompt, PreviousCommand } from "@/components/terminal/command-line/prompt";
import { Instructions } from '@/components/terminal/instructions';

interface Props {
    history: History[]
}

interface History {
    prevDir: string;
    command: string
    cwd: string
    line: number
    response: string | null
}

export const History = ({ history }: Props) => {
    if (history[1] && history[0].command === 'init') {
        history.shift()

        return <div>{history[0].response}</div>
    } else if (history[0].command === 'init') {

        return <Instructions />
    } else {
        return history.map(({ prevDir, command, cwd, line, response }: History) => {

            return (
                <div className="history" key={line}>
                    <LinePrompt cwd={prevDir} />
                    <PreviousCommand command={command} />
                    <Response response={response} />
                </div>)
        })
    }
}
