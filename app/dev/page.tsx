import Link from "next/link"
import { projectData } from "@/constants/projects"

export default function Page() {

    const project = projectData[0];
    return (
        <main className="dev">
            <h2>
                Personal Projects
            </h2>
            <article>
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
            <h2>
                Professional Experience
            </h2>
        </main>
    )

}
