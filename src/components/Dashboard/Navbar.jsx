import React from 'react'
import DisplayProfile from '../shared/DisplayProfile'

export default function Navbar() {
   return (
      <div className='bg-white mb-8 shadow py-3 px-5 flex justify-between items-center gap-3'>
         <div className='text-2xl'>Dashboard</div>
         <DisplayProfile />
      </div>
   )
}
