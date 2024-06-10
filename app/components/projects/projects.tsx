import Link from "next/link"
import { projectData } from "@/constants/projects"

export function Projects() {

    return projectData.map((project, i) => (

        <article key={i} className="dev">
            <h3>
                {project.title}
            </h3>
            <Link href={project.links.github}>
                <p>
                    github:{project.links.github}
                </p>
            </Link>
            <Link href={project.links.deployed}>
                <p>
                    deployment:{project.links.deployed}
                </p>
            </Link>
        </article>
    ))
}
