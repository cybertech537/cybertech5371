import SearchForm from '@/components/Donors/SearchForm';
import Link from 'next/link';
import React from 'react'
import { FaArrowDownLong } from "react-icons/fa6";
import { TbUserHeart } from "react-icons/tb";

export default function page() {
  return (
    <>
      <SearchForm />
      <div className='py-16 bg-gradient-to-b from-red-50 to-white'>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {donors?.map((donor, index) =>
              <Link href={`/donors/${donor.uid}`} key={index} className='flex flex-wrap gap-4 bg-white shadow-md p-5'>
                <div className="flex-1">
                  <ul className='text-lg'>
                    <li><strong className='w-16 inline-block'>Name</strong>: <span className='inline-block ml-2'>{donor.name}</span></li>
                    <li><strong className='w-16 inline-block'>Group</strong>: <span className='inline-block ml-2'>{donor.bloodGroup}</span></li>
                    <li>
                        <strong className='w-16 inline-block'>Area</strong>: 
                        <span className='inline-block ml-2'>
                           District, Thana
                        </span>
                     </li>
                    <li>
                        <strong className='w-16 inline-block'>Contact</strong>: 
                        <span className='inline-block ml-2'>
                           01953182201
                        </span>
                     </li>
                  </ul>
                </div>
                <TbUserHeart className='text-7xl text-primary' />
              </Link>
            )}
          </div>
          <div className="text-center mt-12">
            <button className="btn btn-primary">
              Load more
              <FaArrowDownLong />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

const donors = [
  {
    uid: 113,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 123,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 133,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 143,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 153,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 163,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 173,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 183,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
  {
    uid: 193,
    name: "Mark Neel",
    bloodGroup: "A+",
    area: "Dhaka"
  },
]