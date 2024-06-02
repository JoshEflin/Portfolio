export const LinePrompt = ({ cwd }: { cwd: string }) => (
    <span className="input-domain">
        guest@josheflin.com:
        <span className="input-dir">
            {`~${cwd}$`}
        </span>
    </span>
);

export const Response = ({ response }: { response: string | null }) => (
    <div className="response">{response}</div>
)

export const PreviousCommand = ({ command }: { command: string | null }) => (
    <span className="previous-command" > {command}</span>
)
