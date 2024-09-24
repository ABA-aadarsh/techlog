import { signIn } from "@/app/auth"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github",{redirectTo:"/admin"})
      }}
    >
      <button type="submit"
        className="p-2 rounded-sm border-white border-2"
      >Signin with GitHub</button>
    </form>
  )
} 