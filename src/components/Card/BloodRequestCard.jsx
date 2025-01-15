import React from 'react'
import { BiDonateBlood } from 'react-icons/bi'
import { FaDisease } from 'react-icons/fa6'
import { IoCalendarClearSharp } from 'react-icons/io5'
import { LuMapPin } from 'react-icons/lu'

export default function BloodRequestCard() {
   return (
      <div className="space-y-2 text-lg block font-semibold py-3.5">
         <div className="text-2xl font-bold flex gap-1 items-center">
            <BiDonateBlood className='text-primary text-2xl' />
            B+
         </div>
         <div className="text-lg flex gap-1 items-center">
            <LuMapPin className='text-primary text-xl mr-1' />
            Pabna, Ishwardi
         </div>
         <div className="text-lg flex gap-1 items-center">
            <FaDisease className='text-primary text-xl mr-1' />
            Road Accident
         </div>
         <div className="text-lg flex gap-1 items-center">
            <IoCalendarClearSharp className='text-primary text-xl mr-1' />
            17 Jan, 2025
         </div>
      </div>
   )
}
