import { Response, LinePrompt } from "@/components/terminal/command-line/prompt";
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
    console.log(history)
    if (history[1] && history[0].command === 'init') {
        history.shift()

        return <div>{history[0].response}</div>
    } else if (history[0].command === 'init') {

        return <Instructions />
    } else {
        return history.map(({ prevDir, command, cwd, line, response }: History) => {

            return (
                <div key={line}>
                    <LinePrompt cwd={prevDir} />
                    <Response response={response} />
                </div>)
        })
    }
}
