"use client"
import Link from 'next/link';
import React from 'react'
import { RiMenu2Line } from "react-icons/ri";
import { LiaTimesSolid } from "react-icons/lia";
import Logo from './shared/Logo';
import DisplayProfile from './shared/DisplayProfile';
import { useAuth } from '@/services/AuthProvider';

export default function Navbar() {


   return (
      <>
         <div className="sticky top-0 left-0 w-full z-30 bg-white shadow-md">
            <div className="container">
               <div className="navbar bg-base-100 px-0 py-4">
                  <div className="navbar-start">
                     {/* brand logo */}
                     <Logo path={'/'} />
                  </div>
                  <div className="navbar-center hidden lg:flex">
                     <ul className="menu menu-horizontal px-1 text-lg">
                        {
                           navItems?.map((item, index) => <li key={index}><a href={item.path}>{item.label}</a></li>)
                        }
                     </ul>
                  </div>
                  <div className="navbar-end items-center gap-3">
                     <div className="flex gap-3 items-center flex-wrap">
                        <Link href={'/login'} className="btn bg-black text-white hover:bg-primary hidden sm:inline-flex py-1.5">Register</Link>
                        <Link href={'/login'} className="btn btn-primary py-1.5">Login</Link>
                     </div>
                     <DisplayProfile />
                     <label htmlFor='mobile-menu-drawer' className="inline-block cursor-pointer lg:hidden">
                        <RiMenu2Line className='text-3xl' />
                     </label>
                  </div>
               </div>
            </div>
         </div>

         {/* mobile menu */}
         <div className="drawer">
            <input id="mobile-menu-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side z-40">
               <label htmlFor="mobile-menu-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
               <div className="menu bg-white min-h-full w-80 pb-4 pl-4 pr-3 pt-3">
                  <div className="text-right">
                     <label htmlFor="mobile-menu-drawer" className='inline-block text-3xl cursor-pointer'>
                        <LiaTimesSolid />
                     </label>
                  </div>
                  <ul className="text-lg">
                     {
                        navItems?.map((item, index) => <li key={index}><a href={item.path}>{item.label}</a></li>)
                     }
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

const navItems = [
   {
      label: "Home",
      path: "/"
   },
   {
      label: "About",
      path: "/about"
   },
   {
      label: "Find Donors",
      path: "/donors"
   },
   {
      label: "Blood Requests",
      path: "/blood-requests/"
   }
]