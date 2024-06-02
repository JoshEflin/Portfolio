export const LinePrompt = ({ cwd }: { cwd: string }) => {

    return (
        <span className="input-domain">
            guest@josheflin.com:
            <span className="input-dir">
                {`~${cwd}$`}
            </span>
        </span>
    );
}
export const Response = ({ response }: { response: string | null }) => {
    return <div className="response">{response}</div>;
}
