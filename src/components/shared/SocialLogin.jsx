"use client"
import { FaFacebookF } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {

   return (
      <div className="flex flex-wrap gap-4 justify-center">
         <button className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <FcGoogle />
         </button>
         <button className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <FaFacebookF />
         </button>
         <button className="h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 flex justify-center items-center">
            <FaGithub />
         </button>
      </div>
   )
}
