
// initial command line state
export const PROMPT = "guest@josheflin.com:~/$";
export const WELCOME = {
    command: "init",
    prompt: PROMPT,
    line: 0
};


//legal directories
export const RESUME = 'resume';
export const CONTACT = 'contact';
export const OPERA = 'opera';
export const ENGERINEERING = 'engineering';

export const DIRECTORIES = new Map();
DIRECTORIES.set(RESUME, 'resume');
DIRECTORIES.set(CONTACT, 'contact');
DIRECTORIES.set(OPERA, 'opera');
DIRECTORIES.set(ENGERINEERING, 'engineering');
