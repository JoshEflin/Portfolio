// initial command line state
export const prompt = (cwd: string) => `guest@josheflin.com:~${cwd}$`;
export const WELCOME = {
    prevDir: '/',
    command: "init",
    cwd: '/',
    line: 0,
    response: ''
};


//legal directories
export const RESUME = 'resume';
export const CONTACT = 'contact';
export const OPERA = 'opera';
export const DEV = 'dev';

export const DIRECTORIES = new Map();
DIRECTORIES.set(RESUME, 'resume');
DIRECTORIES.set(CONTACT, 'contact');
DIRECTORIES.set(OPERA, 'opera');
DIRECTORIES.set(DEV, 'dev');
