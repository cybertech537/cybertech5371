import Image from 'next/image'
import React from 'react'

export default function PageHero({title, description, image='blood-pulling.jpg'}) {
   return (
      <div className="relative bg-black pt-24 pb-40 z-10">
         <Image src={`/img/${image}`} height={400} width={1920} alt='bed-ward' className='absolute h-full w-full left-0 top-0 object-cover -z-10 opacity-40' />
         <div className="container relative">
            <div className="mb-7 text-center text-lg space-y-3 text-white">
               <h1 className='text-3xl lg:text-4xl font-bold'>
                  {title}
               </h1>
               {description ? <p>{description}</p> : ''}
            </div>
         </div>
      </div>
   )
}
