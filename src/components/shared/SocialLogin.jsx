"use client"
import { FaFacebookF } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SocialLogin() {

   const session = useSession()
   const router = useRouter()

   const handleSocialLogin = (provider) => {
      const res = signIn(provider, {redirect: false})
      
      if( session.status === 'authenticated' ){
         router.push('/')
      }
   }

   return (
      <div className="flex flex-wrap gap-4 justify-center">
         <button onClick={() => handleSocialLogin('google')} className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <FcGoogle />
         </button>
         <button className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <FaFacebookF />
         </button>
         <button onClick={() => handleSocialLogin('github')} className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <FaGithub />
         </button>
      </div>
   )
}
