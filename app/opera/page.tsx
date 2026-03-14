import { getRecordings } from "@/lib/content/recordings";
import { OperaRoom } from "@/components/opera/OperaRoom";

export const metadata = {
    title: "Opera | Josh Eflin",
};

export default function OperaPage() {
    const recordings = getRecordings();

    return (
        <main style={{ padding: 24 }}>
            <h1 style={{ marginTop: 0 }}>Opera</h1>
            <OperaRoom recordings={recordings} />
        </main>
    );
}
