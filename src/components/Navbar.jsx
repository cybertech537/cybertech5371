import Link from 'next/link';
import React from 'react'
import { RiMenu2Line } from "react-icons/ri";

export default function Navbar() {
   return (
      <div className="container">
      <div className="navbar bg-base-100 px-0 py-4">
         <div className="navbar-start">
            <div className="dropdown">
               <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <RiMenu2Line />
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                  {
                     navItems?.map((item, index) => <li key={index}><a href={item.path}>{item.label}</a></li>)
                  }
               </ul>
            </div>
            {/* brand logo */}
            <Link href={'/'}>
               <span className='font-bold text-3xl'>
                  <span className='text-primary'>Donor </span>
                  Bridge
               </span>
               <span className='block text-gray-400 uppercase text-xs'>
                  Centralized Blood Donation
               </span>
            </Link>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
               {
                  navItems?.map((item, index) => <li key={index}><a href={item.path}>{item.label}</a></li>)
               }
            </ul>
         </div>
         <div className="navbar-end">
            <a className="btn">Button</a>
         </div>
      </div>
      </div>
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
      label: "Contact",
      path: "/contact"
   },
]