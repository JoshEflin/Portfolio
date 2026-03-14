"use client";

import { useMemo, useState } from "react";
import type { Recording } from "@/lib/content/recordings";

type Props = {
    recordings: Recording[];
    initialSelectedIndex?: number; // 0-based
};

function YouTubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
    return (
        <div style={{ width: "100%", maxWidth: 900 }}>
            <div style={{ aspectRatio: "16 / 9", width: "100%" }}>
                <iframe
                    width="70%"
                    height="70%"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export function OperaRoom({ recordings, initialSelectedIndex = 0 }: Props) {
    const safeInitial = Math.min(Math.max(initialSelectedIndex, 0), Math.max(recordings.length - 1, 0));
    const [selectedIndex, setSelectedIndex] = useState<number>(safeInitial);

    const selected = recordings[selectedIndex] ?? null;

    const listText = useMemo(() => {
        if (!recordings.length) {
            return [
                "Entering OPERA ARCHIVE...",
                "",
                "No recordings found.",
                "Add items to content/recordings.json",
            ].join("\n");
        }

        const lines: string[] = [];
        lines.push("Entering OPERA ARCHIVE...");
        lines.push("");
        lines.push("Available recordings:");

        recordings.forEach((r, i) => {
            const n = i + 1;
            const meta = [r.work, r.role, r.date].filter(Boolean).join(" — ");
            lines.push(`${n}. ${r.title}${meta ? ` (${meta})` : ""}`);
        });

        lines.push("");
        lines.push("Type: play <number>   (e.g. play 1)");
        lines.push("Type: gui             (to explore the gallery)");
        return lines.join("\n");
    }, [recordings]);

    return (
        <section style={{ display: "grid", gap: 16 }}>
            {/* Terminal-flavored “room intro” */}
            <pre
                style={{
                    margin: 0,
                    padding: 16,
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(0,0,0,0.35)",
                    overflowX: "auto",
                    whiteSpace: "pre",
                    lineHeight: 1.45,
                }}
            >
                {listText}
            </pre>

            {/* Selected recording player */}
            {selected && (
                <div style={{ display: "grid", gap: 8 }}>
                    <div style={{ fontSize: 14, opacity: 0.9 }}>
                        Now playing: <strong>{selected.title}</strong>
                        {selected.work ? ` — ${selected.work}` : ""}
                        {selected.role ? ` — ${selected.role}` : ""}
                        {selected.date ? ` — ${selected.date}` : ""}
                    </div>

                    <YouTubeEmbed youtubeId={selected.youtubeId} title={selected.title} />

                    {selected.notes && (
                        <div style={{ fontSize: 14, opacity: 0.9, maxWidth: 900 }}>{selected.notes}</div>
                    )}

                    {/* Optional: if you later connect your terminal "play n" command,
              you can pass initialSelectedIndex based on terminal state.
              For now, you can still change it programmatically if you want. */}
                    <div style={{ display: "flex", gap: 8 }}>
                        <button
                            type="button"
                            onClick={() => setSelectedIndex((i) => Math.max(0, i - 1))}
                            disabled={selectedIndex <= 0}
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedIndex((i) => Math.min(recordings.length - 1, i + 1))}
                            disabled={selectedIndex >= recordings.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
