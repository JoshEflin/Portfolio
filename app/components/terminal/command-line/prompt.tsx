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
    if (!response) return null;

    if (response.kind === 'text') {
        if (prev === 'cat') {
            return <pre className="response">{response.content}</pre>;
        }
        return <pre className="response">{response.content}</pre>;
    }

    if (response.kind === 'link') {
        return (
            <div className="response">
                <a
                    href={response.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {response.label || response.url}
                </a>
            </div>
        );
    }
    if (response.kind === 'video') {
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
    if (response.kind === 'section') {
        return (
            <div className="response">
                <h2>{response.title}</h2>
                {response.content.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        );
    }
    return null;
};
export const PreviousCommand = ({ command }: { command: string | null }) => (
    <span className="previous-command"> {command}</span>
)


