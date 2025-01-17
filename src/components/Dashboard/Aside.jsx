"use client"

import React from 'react'
import Logo from '../shared/Logo'
import { usePathname } from 'next/navigation'

import { MdManageHistory, MdOutlineAccountCircle, MdOutlineDashboard } from "react-icons/md";
import { GiHeartDrop } from "react-icons/gi";
import { BiDonateBlood } from "react-icons/bi";
import Link from "next/link";
import { FaHeartCirclePlus } from 'react-icons/fa6';
import { useAuth } from '@/services/AuthProvider';

export default function Aside() {
   const { user } = useAuth()
   const pathname = usePathname()

   return (
      <aside className="w-80 bg-white h-screen items-start">
         <div className='p-5 shadow'>
            <Logo path={'/'} />
         </div>
         <nav>
            <ul className='text-base font-semibold flex flex-col gap-1 pt-3'>
               {links?.map(link =>
                  <li key={link.path}>
                     <Link href={link.path} className={`flex items-center gap-2 py-3 px-4 ${link.path === pathname && 'text-primary bg-primary/10'}`}>
                        {link.icon}
                        {link.label}
                     </Link>
                  </li>
               )}
               {
                  user?.role === "User" &&
                  <li>
                     <Link href='/admin/allBloodRequest' className={`flex items-center gap-2 py-3 px-4 ${'/admin/allBloodRequest' === pathname && 'text-primary bg-primary/10'}`}>
                        <FaHeartCirclePlus className='text-2xl text-primary' />
                        All Blood Request
                     </Link>
                  </li>
               }

            </ul>
         </nav>
      </aside>
   )
}

const links = [
   {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <MdOutlineDashboard className='text-2xl text-primary' />
   },
   {
      label: "Profile",
      path: "/admin/profile",
      icon: <MdOutlineAccountCircle className='text-2xl text-primary' />
   },
   // {
   //    label: "Donation History",
   //    path: "/admin/donation-histroy",
   //    icon: <MdManageHistory className='text-2xl text-primary' />
   // },
   {
      label: "All Donors",
      path: "/admin/donors",
      icon: <GiHeartDrop className='text-2xl text-primary' />
   },
   {
      label: "Blood Requests",
      path: "/admin/bloodRequest",
      icon: <FaHeartCirclePlus className='text-2xl text-primary' />
   }
]