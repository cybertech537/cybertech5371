import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RecipientDetail() {
  return (
    <div className='py-16 bg-slate-50'>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className='text-center mb-6 text-4xl'>Urgent Blood Needed</h1>
          <div className="border-2 border-gray-200 bg-white p-5 sm:p-10">
            <div className="flex flex-wrap gap-3 items-center">
              <Image src={'https://i.ibb.co.com/Sy3Y3sX/Jahid.jpg'} alt='profile' height={60} width={60} className='border-4 border-primary shadow-lg rounded-full object-cover' />
              <div className="flex-1">
                <p>
                  Requested by <Link href={'/'} className='text-primary underline hover:no-underline'>Mark Neel</Link>
                </p>
                <p>21 hours ago</p>
              </div>
            </div>
            <div className="text-lg mt-5">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem asperiores, dolorem culpa reiciendis nihil ipsum quasi, necessitatibus facilis numquam voluptatibus veniam neque? Sint iste sunt aut voluptatem quod facere reiciendis?</p>
            </div>
            <div className="text-lg grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-10">
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Contact
                </div>
                <div className="font-bold">
                  <Link href={'tel:01953182201'}>01953182201</Link>
                </div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Extra Contact
                </div>
                <div className="font-bold">
                  <Link href={'tel:01953182201'}>01953182201</Link>
                </div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Area
                </div>
                <div className="font-bold">
                  Mirpur, Dhaka
                </div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Needed on
                </div>
                <div className="font-bold">10 February, 2025</div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Disease
                </div>
                <div className="font-bold">Dengue</div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Quantity
                </div>
                <div className="font-bold">2 Bag</div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Blood Group
                </div>
                <div className="font-bold">A+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
