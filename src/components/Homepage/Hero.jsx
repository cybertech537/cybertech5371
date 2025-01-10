import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
   return (
      <div className="relative pt-20 md:pt-32 pb-32 md:pb-56">
         <Image src={`/img/hero.jpg`} height={500} width={1920} alt='hero' className='absolute h-full w-full object-cover object-left top-0 left-0' />
         {/* <div className="hero-overlay bg-opacity-60"></div> */}
         <div className="container relative z-10">
          <h1>This is Aslam</h1>
            <div className="max-w-2xl">
               <h1 className="mb-5 text-3xl md:text-4xl font-bold text-primary">
                  Donate Blood, save life!
               </h1>
               <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                  Be the reason someone smiles today.
               </p>
               {/* Become a donor, when loggedin browse request */}
               <Link href={'/register/donor/'} className="mt-10 btn btn-primary text-lg px-10 py-3">
                  Become a donor
               </Link>
            </div>
         </div>
      </div>
   )
}
