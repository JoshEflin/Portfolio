import { prompt } from "@/constants/terminal"
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

        return <div> instructions </div>
    } else {
        return history.map(({ prevDir, command, cwd, line, response }: History) => {

            return (
                <div key={line}>
                    <div>{prompt(prevDir)}</div>
                    <div>{response}</div>
                    <br />
                </div>)
        })
    }
}
