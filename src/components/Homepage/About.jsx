import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function About() {
   return (
      <div className='py-20'>
         <div className="container">
          <h1>This is Aslam</h1>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
               <div className="">
                  <Image src={`/img/about.jpg`} height={500} width={650} alt='about' className='' />
               </div>
               <div className="">
                  <span className="uppercase text-primary block mb-4 font-semibold">
                     Help The People in Need
                  </span>
                  <h2 className='text-3xl md:text-5xl mb-7'>Welcome to Donor Bridge</h2>
                  <p className='text-lg'>Donor Bridge is an automated blood service that connects blood searchers with voluntary donors in a moment through SMS. It is always a free service for all.</p>
                  <ul className='space-y-2 mt-5'>
                     {list?.map((item, index) => (
                        <li key={index} className='text-lg flex gap-3 items-center font-semibold'>
                           <MdKeyboardDoubleArrowRight className='text-primary text-2xl' />
                           {item.label}
                        </li>
                     ))}
                  </ul>
                  <Link href={'/'} className='btn btn-primary mt-6 px-10'>
                     Explore Now
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

const list = [
   {
      "label": "100% Automated"
   },
   {
      "label": "Always free"
   },
   {
      "label": "24*7 service"
   },
   {
      "label": "All data is secured"
   },
]