export type Recording = {
    id: string;
    title: string;
    youtubeId: string;
    role: string;
    work: string;
    date: string;
    notes: string;
};

export const recordings: Recording[] = [
    {
        id: "1. Tchaikovsky",
        title: "Lensky's Aria",
        youtubeId: "XJ0qMMLsi9g",
        role: "Lensky",
        work: "Eugene Onegin",
        date: "2019-08-02",
        notes: "Live recital recording.",
    },
    {
        id: "2. Donizetti",
        title: "Una Furtiva Lagrima",
        youtubeId: "E3mSDuDV1-0",
        role: "Nemorino",
        work: "L'elisir D'amore",
        date: "2019-08-02",
        notes: "Live recital recording.",
    },
    {
        id: "3. National Anthem",
        title: "Star Spangled Banner",
        youtubeId: "rKo1t7-utNc",
        role: "USA",
        work: "Star Spangled Banner",
        date: "2020-07-31",
        notes: "Live recital recording.",
    },
];
