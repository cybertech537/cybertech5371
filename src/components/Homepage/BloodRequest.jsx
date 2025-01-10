import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import BloodRequestCard from '../Card/BloodRequestCard';

export default function BloodRequest() {
   return (
      <div className='pb-20'>
         <div className="relative bg-black/70 pt-24 pb-40">
            <Image src={'/img/bed-ward.jpg'} height={400} width={1920} alt='bed-ward' className='absolute h-full w-full left-0 top-0 object-cover -z-10' />
            <div className="container relative text-center">
               <div className="text-primary uppercase font-bold mb-5 text-xl">Donor Bridge</div>
               <h2 className="text-5xl text-white">
                  Current Blood Requests
               </h2>
            </div>
         </div>
         <div className="container">
          <h1>This is Aslam</h1>
            <div className="relative bg-white p-5 sm:p-10 shadow-lg -mt-16 max-w-4xl mx-auto">
               <div className="grid sm:grid-cols-2 gap-x-10">
                  <ul className='divide-y divide-gray-300 border-b sm:border-b-0 border-gray-300'>
                     {list?.map((item, index) => (
                        index % 2 === 0 ? (
                           <li key={index}>
                              <Link href={`/blood-requests/${item.uid}`}>
                                 <BloodRequestCard />
                              </Link>
                           </li>
                        ) : null
                     ))}
                  </ul>
                  <ul className='divide-y divide-gray-300'>
                     {list?.map((item, index) => (
                        index % 2 !== 0 ? (
                           <li key={index}>
                              <Link href={`/blood-requests/${item.uid}`}>
                                 <BloodRequestCard />
                              </Link>
                           </li>
                        ) : null
                     ))}
                  </ul>
               </div>
               <div className="mt-10 text-center">
                  <Link className='btn btn-primary' href={'/blood-requests'}>
                     All requests
                     <GoArrowUpRight className='w-6 h-6' />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}


const list = [
   {
      uid: 123,
      label: "0 B+ Mirpur-10, Dhaka (13/02/2024)",
   },
   {
      uid: 223,
      label: "1 B+ Mirpur-10, Dhaka (13/02/2024)",
   },
   {
      uid: 323,
      label: "2 B+ Mirpur-10, Dhaka (13/02/2024)",
   },
   {
      uid: 423,
      label: "3 B+ Mirpur-10, Dhaka (13/02/2024)",
   }
]