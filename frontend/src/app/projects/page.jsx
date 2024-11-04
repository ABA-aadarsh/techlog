import React from 'react'
import { Bug} from 'lucide-react'
import { FaNpm } from "react-icons/fa";
import { IoCodeSlash } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import Link from 'next/link';
import { GithubLogo } from '../_svgs/GithubLogo';
import { IoExtensionPuzzle } from "react-icons/io5";
// {
//     name:  string
//     githubLink:   string or null
//     deployedLink:  string or null
//     shortDescription:  string
//     image: string
//     tags:  array of strings
//     type:  web-app, npm-package, terminal-app, extension or null
//     status: complete, in progress, or null
// }
const iconsObject = {
    "web-app": {
        icon: FaLink,
        color: "text-blue-800",
        size: 20
    },
    "terminal-app": {
        icon: FaNpm,
        color: "text-red-600",
        size: 20
    },
    "extension": {
        icon: IoExtensionPuzzle,
        color: "text-neutral-600",
        size: 20
    },
    "default": {
        icon: IoCodeSlash,
        color: "text-blue-800",
        size: 20
    },
}

const ProjectCard = (
    {
        name="",
        githubLink ="",
        deployedLink ="",
        shortDescription = "",
        slug = "#",
        projectType = "",
        status = "",
        tags = [],
        lastItem = false
    }
) => {
    let Icon;
    if(Object.keys(iconsObject).includes(projectType)){
        Icon = iconsObject[projectType]
    }else{
        Icon = iconsObject["default"]
    }
    return (
        <div
            className={
                `${!lastItem && "border-b-2 border-neutral-600/20 "} pb-10`
            }
        >
            <div className='flex justify-between mb-4 items-center'>
                <Link className='flex items-center gap-3 hover:text-blue-700 duration-200 transition-all hover:gap-5' href={slug} prefetch={false}>
                    <Icon.icon size={Icon.size} className={Icon.color}/>
                    <h1 className='text-2xl underline underline-offset-1 decoration-blue-400'>{name}</h1>
                </Link>
                <div className='flex items-center gap-5 justify-end'>
                    {
                        githubLink &&
                        (
                            <Link href={githubLink} className='flex items-center gap-1'>
                                <span>Source Code</span>
                                <GithubLogo size={20}/>
                            </Link>
                        )
                    }
                    {
                        deployedLink &&
                        (
                            <Link href={deployedLink} className='flex items-center gap-1'>
                                <span>Visit</span>
                                <FaLink size={20}/>
                            </Link>
                        )
                    }
                </div>
            </div>
            <div className='pl-10'>

                <ul className='flex items-center gap-5 mb-5'>
                    {
                        tags.map((i,index)=> <li key={index}
                            className='text-white bg-neutral-700 rounded-md py-1 px-2 text-sm'
                        >{i}</li>)
                    }
                </ul>

                <div>
                    <p className='text-lg'>
                        {shortDescription}
                    </p>
                </div>
            </div>
        </div>
    )
}


const page = () => {
    const projects = [
        {
            name: "Ease CSIT",
            githubLink: null,
            deployedLink: "https://easecsitweb.vercel.app/",
            shortDescription: "Ease CSIT is made for BSc. CSIT students in Nepal to help them quickly review for exams. It offers chapter-wise video playlists, key questions with answers, and detailed video explanations. The content is carefully chosen from various YouTube creators to align with the CSIT syllabus, providing a well-organized study resource, especially useful for last-minute revision.",
            image: "https://example.com/project1.png",
            tags: ["Educational Platform", "Web App", "10 Users"],
            projectType: "web-app"
        },
        {
            name: "Terminal Typer",
            githubLink: "https://github.com/ABA-aadarsh/terminal-typer",
            deployedLink: "https://aba-aadarsh.github.io/terminal-typer/",
            shortDescription: "Open source typing speed tester in your terminal. Built in typescript and works in Windows and Linux.",
            image: "https://example.com/project1.png",
            tags: ["Terminal", "50+ downloads"],
            projectType: "terminal-app"
        },
        {
            name: "MonkeyCheat Extension",
            githubLink: "https://github.com/ABA-aadarsh/monkeycheat-extension",
            deployedLink: "https://aba-aadarsh.github.io/monkeycheat-extension/",
            shortDescription: "Extension for chrome and firefox that allows to cheat on MonkeyType (only for unregistered user). Fortunately wont work on registered account so no messing with leaderboard score.",
            image: "https://example.com/project1.png",
            tags: ["Extenstion", "50+ downloads"],
            projectType: "extension"
        },
        {
            name: "React-OPYoutubePlayer",
            githubLink: "https://github.com/ABA-aadarsh/monkeycheat-extension",
            deployedLink: "https://aba-aadarsh.github.io/monkeycheat-extension/",
            shortDescription: "Open source youtube player.",
            image: "https://example.com/project1.png",
            tags: ["Extenstion", "50+ downloads"],
            projectType: "extension"
        },
        {
            name: "Terminal Chemical Equation Balancer",
            githubLink: "https://github.com/ABA-aadarsh/monkeycheat-extension",
            deployedLink: "https://aba-aadarsh.github.io/monkeycheat-extension/",
            shortDescription: "Write chemical equation in conventional format and balance it within your terminal app.",
            image: "https://example.com/project1.png",
            tags: ["CPP", "Terminal"],
            projectType: "terminal-app"
        },
    ]
  return (
    <main className='min-h-dvh lg:mb-40'>
        <div className='mt-5'>
            <div className='mb-10 text-center'>
                <div className='flex gap-2 mb-5 justify-center'>
                    <h1 className='text-3xl font-bold text-zinc-900 inline-block'>Projects</h1>
                    <Bug size={16} className='text-slate-500 animate-bounce repeat-infinite' />
                </div>
                <p className='text-lg'>Things I've worked on</p>
            </div>
            <div className='flex flex-col gap-8'>
                {projects.map((project, index)=>(
                    <ProjectCard
                        {...project}
                        lastItem= {index==projects.length-1}
                        key={index}
                    />
                ))}
            </div>
        </div>
    </main>
  )
}

export default page