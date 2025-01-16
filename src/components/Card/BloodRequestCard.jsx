import React from 'react'
import moment from 'moment'
import { BiDonateBlood } from 'react-icons/bi'
import { FaDisease } from 'react-icons/fa6'
import { IoCalendarClearSharp } from 'react-icons/io5'
import { LuMapPin } from 'react-icons/lu'

export default function BloodRequestCard({ item }) {
   return (
      <div className="space-y-2 text-lg block font-semibold py-3.5">
         <div className="text-2xl font-bold flex gap-1 items-center">
            <BiDonateBlood className='text-primary text-2xl' />
            {item?.bloodGroup}
         </div>
         <div className="text-lg flex gap-1 items-center">
            <LuMapPin className='text-primary text-xl mr-1' />
            {item?.district}, {item?.upazila} , {item?.area}
         </div>
         <div className="text-lg flex gap-1 items-center">
            <FaDisease className='text-primary text-xl mr-1' />
            {item?.disease}
         </div>
         <div className="text-lg flex gap-1 items-center">
            <IoCalendarClearSharp className='text-primary text-xl mr-1' />
            {moment(item?.requiredDate).format('MMMM Do YYYY')}
         </div>
      </div>
   )
}


district
:
"Mymensingh"
extraContact
:
"Ut qui saepe quia mo"
note
:
"Soluta optio unde q"
quantity
:
3
requiredDate
:
"2016-03-28T00:00:00.000Z"
upazila
:
"Phulpur"
updatedAt
:
"2025-01-14T17:30:20.087Z"
userId
:
"6783fb249e5fc14ccdcbdc1b"
__v
:
0
_id
:
"67869f2c97ca7012a8bffbf4"
