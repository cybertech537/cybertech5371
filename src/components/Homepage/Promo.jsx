import Link from 'next/link'
import React from 'react'
import { LuLogIn } from "react-icons/lu";
import { BsSearchHeart } from "react-icons/bs";
import { LuUserRoundSearch } from "react-icons/lu";

export default function Promo() {
  return (
    <div className='-mt-20 relative z-20'>
      <div className="container">
         <div className="grid md:grid-cols-2 grid-cols-1">
            <Link href={'/blood-requests/add-request/'} className="bg-black text-white p-6 sm:p-10 flex flex-wrap gap-10 items-center">
               <div className="sm:flex-1">
                  <h2 className="text-3xl font-bold mb-5">
                     Make a Blood Request
                  </h2>
                  <p className='text-lg'>Can't find a donor? Post your custom blood request to reach potential donors.</p>
               </div>
               <LuLogIn className='text-6xl' />
            </Link>
            <Link href={'/donors/'} className="bg-primary text-white p-6 sm:p-10 flex flex-wrap gap-10 items-center">
               <div className="sm:flex-1">
                  <h2 className="text-3xl font-bold mb-5">
                     Search for a Donor
                  </h2>
                  <p className='text-lg'>Quickly find reliable donors near you and get the help you need.</p>
               </div>
               <LuUserRoundSearch className='text-6xl' />
            </Link>
         </div>
      </div>
    </div>
  )
}
