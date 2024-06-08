interface Links {
    github: string;
    deployed: string;
}

interface Projects {
    title: string;
    description: string;
    techs: string[];
    links: Links;
}

export const projectData: Projects[] = [
    {
        title: "A Bone to Pick 2.0",
        description:
            "A Refactor of the Original Bone-To Pick Application using the MERN stack",
        techs: [
            "React",
            "Ant Design",
            "MongoDB",
            "Express",
            "Node",
            "Petfinder API",
        ],
        links: {
            github: "https://github.com/JoshEflin/A-Bone-To-Pick-V.2",
            deployed: "https://a-bone-to-pick.herokuapp.com/",
        },
    },
    {
        title: "JAD Grocery",
        description:
            "An online grocery store for people who don't want the hassle of waiting in a line or interacting with other humans!",
        techs: ["React", "TailwindCSS", "MongoDB", "Express", "Node", "Edamam API"],
        links: {
            github: "https://github.com/JoshEflin/JAD",
            deployed: "https://groceryjad.herokuapp.com/",
        },
    },
    {
        title: "A Bone to Pick 1.0",
        description:
            "A front-end only dog adoption web-app that turns data from petfinder's API and apiNinja's Dog Breed API into trading cards",
        techs: ["JQuery", "Bulma", "Adobe Express", "Petfinder API", "Dogs API"],
        links: {
            github: "https://github.com/JoshEflin/A-Bone-to-Pick",
            deployed: "https://josheflin.github.io/A-Bone-to-Pick/",
        },
    },
    {
        title: "Hey Boo Boo",
        description:
            "A potlucking- or party-planning app for creating picnics (events), inviting your friends, and organizing which foods get put on the table!",
        techs: [
            "Handlebars",
            "Node.js",
            "Express.js",
            "sequelize",
            "express-session",
            "Google Calendar API",
        ],
        links: {
            github: "https://github.com/JoshEflin/Hey-boo-boo",
            deployed: "https://lit-river-34902.herokuapp.com/",
        },
    },
    {
        title: "TechNollegE",
        description:
            "A CMS style blog site for publishing articles and  leaving comments. User's must log in in order to make posts or leave comments. This full stack Application uses the Handlebars view engine.",
        techs: [
            "Handlebars",
            "Node.js",
            "Express.js",
            "sequelize",
            "express-session",
        ],
        links: {
            github: "https://github.com/JoshEflin/Tech-Blog-MVC",
            deployed: "https://smufduffwuffluff.herokuapp.com/",
        },
    },

];

