
// initial command line state
export const PROMPT = "guest@josheflin.com:~/$";
export const WELCOME = {
    command: "init",
    prompt: PROMPT,
    line: 0
}

//legal operations
const LS = 'ls'
const CD = 'cd'
const HELP = 'help'
const QUIT = 'quit'

const OPERATIONS = new Map();
OPERATIONS.set(LS, 'list function')
OPERATIONS.set(CD, 'change dir function')
OPERATIONS.set(HELP, 'help function')
OPERATIONS.set(QUIT, 'quit function')

//legal directories
const RESUME = 'resume';
const CONTACT = 'contact';
const OPERA = 'opera';
const ENGERINEERING = 'engineering';

const DIRECTORIES = new Map();
DIRECTORIES.set(RESUME, 'resume')
DIRECTORIES.set(CONTACT, 'contact')
DIRECTORIES.set(OPERA, 'opera')
DIRECTORIES.set(ENGERINEERING, 'engineering')
