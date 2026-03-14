
import fs from "node:fs";
import path from "node:path";

export type Recording = {
    id: string;
    title: string;
    youtubeId: string;

    work?: string;
    role?: string;
    date?: string;
    notes?: string;
};

const FILE = path.join(process.cwd(), "content", "recordings.json");

export function getRecordings(): Recording[] {
    const raw = fs.readFileSync(FILE, "utf8");
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) return [];

    // Minimal runtime guard
    return data
        .filter((r) => r && typeof r === "object")
        .map((r) => ({
            id: String((r as any).id ?? ""),
            title: String((r as any).title ?? ""),
            youtubeId: String((r as any).youtubeId ?? ""),
            work: (r as any).work ? String((r as any).work) : undefined,
            role: (r as any).role ? String((r as any).role) : undefined,
            date: (r as any).date ? String((r as any).date) : undefined,
            notes: (r as any).notes ? String((r as any).notes) : undefined,
        }))
        .filter((r) => r.id && r.title && r.youtubeId);
}

