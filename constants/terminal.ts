import { NODES } from '@/lib/site/nodes'
// initial command line state
export const prompt = (cwd: string) => `guest@josheflin.com:~${cwd}$`;
export const WELCOME = {
    prevDir: '/',
    command: "init",
    cwd: '/',
    line: 0,
    response: null
};

export const DIRECTORIES = new Map(
    Object.keys(NODES).map(k => [k.toUpperCase(), k])
);

