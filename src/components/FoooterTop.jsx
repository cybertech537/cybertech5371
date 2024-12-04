import Link from 'next/link';
import React from 'react'
import { FaEnvelope, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function FoooterTop() {
  return (
    <div className='bg-primary text-white py-2.5'>
      <div className="container">
         <div className="flex items-center justify-between">
            <div className="">
               <Link href={`mailto:example@gmail.com`} className="inline-flex items-center gap-2">
                  <FaEnvelope />
                  example@gmail.com
               </Link>
            </div>
            <div className="flex flex-wrap gap-2">
               <a href="" className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary">
                  <FaFacebookF />
               </a>
               <a href="" className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary">
                  <FaTwitter />
               </a>
               <a href="" className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary">
                  <FaYoutube />
               </a>
            </div>
         </div>
      </div>
    </div>
  )
}
