import { redirect } from "next/navigation";
export const LinePrompt = ({ cwd }: { cwd: string }) => (
    <span className="input-domain">
        guest@josheflin.com:
        <span className="input-dir">
            {`~${cwd}$`}
        </span>
    </span>
);

export const Response = ({ response, prev }: { response: string | null, prev: string | null }) => {
    if (prev === 'cat') {
        return <pre className="response">{response}</pre>;
    } else {
        return <div className="response"> {response}</div>;
    }
}

export const PreviousCommand = ({ command }: { command: string | null }) => (
    <span className="previous-command"> {command}</span>
)

//this might want to be in a useEffect??
export const guiMode = (response: string | null) => response === 'initiating' ? redirect('/gui') : null;


