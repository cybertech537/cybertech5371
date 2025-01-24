import Link from 'next/link';

import { FaEnvelope, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export default function HeaderTop() {
  return (
    <div className='bg-primary text-white py-2.5'>
      <div className="container">
         <div className="flex items-center justify-between">
            <div className="">
               <Link href={`mailto:example@gmail.com`} className="inline-flex items-center gap-2">
                  <FaEnvelope />
                  admin@gmail.com
               </Link>
            </div>
            <div className="flex flex-wrap gap-2">
               <a href="https://facebook.com" target='_blank' className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary" aria-label="Follow us on Facebook">
                  <FaFacebookF />
               </a>
               <a href="https://twitter.com" target='_blank' className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary" aria-label="Follow us on twitter">
                  <FaTwitter />
               </a>
               <a href="https://youtube.com" target='_blank' className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white text-white hover:bg-white hover:text-primary" aria-label="Follow us on youtube">
                  <FaYoutube />
               </a>
            </div>
         </div>
      </div>
    </div>
  )
}
