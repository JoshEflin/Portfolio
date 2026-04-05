import { TerminalResponse } from "@/lib/services/parser/parser";
export const LinePrompt = ({ cwd }: { cwd: string }) => (
    <span className="input-domain">
        guest@josheflin.com:
        <span className="input-dir">
            {`~${cwd}$`}
        </span>
    </span>
);

export const Response = ({
    response,
    prev,
}: {
    response: TerminalResponse | null;
    prev: string | null;
}) => {
    console.log(response, 'RESPONSE')
    if (!response) return null;

    if (response.type === 'text') {
        if (prev === 'cat') {
            return <pre className="response">{response.content}</pre>;
        }
        return <pre className="response">{response.content}</pre>;
    }

    if (response.type === 'video') {
        return (
            <div className="response">
                <div className="embed-wrapper">
                    <div className="embed">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${response.youtubeId}`}
                            title={response.title || 'Video'}
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
export const PreviousCommand = ({ command }: { command: string | null }) => (
    <span className="previous-command"> {command}</span>
)


