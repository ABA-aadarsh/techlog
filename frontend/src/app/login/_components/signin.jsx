import { GithubLogo } from "@/app/_svgs/GithubLogo"
import { signIn } from "@/app/auth"
 
export default function SignIn({className=""}) {
  return (
    <form
      className={"w-fit"}
      action={async () => {
        "use server"
        await signIn("github", {redirectTo: "/"})
      }}
    >
      <button type="submit"
        className={`py-3 px-4 rounded-sm border-zinc-400  dark:border-white border-2  flex items-center gap-2 ${className}
          hover:border-black  dark:hover:border-white hover:text-black dark:hover:text-white text-zinc-500 dark:text-white
        `}
      >
        <span >Sign in with GitHub</span>
        <GithubLogo
          size={30}
        />
      </button>
    </form>
  )
} 