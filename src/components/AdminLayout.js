'use client'

import Link from 'next/link';
import { MdOutlineDashboard, MdOutlineAccountCircle, MdManageHistory } from "react-icons/md";
import { BiDonateBlood } from 'react-icons/bi'
import { GiHeartDrop } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import Logo from './shared/Logo';

export default function AdminLayout({ children }) {

   const pathname = usePathname()

   return (
      <div className="flex">
         {/* Sidebar */}
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

               </ul>
            </nav>
         </aside>

         {/* Main Content */}
         <main className="flex-1 p-5 bg-slate-100">
            <div className='bg-white mb-8 shadow py-3 px-5 flex justify-between items-center gap-3'>
               <div className='text-2xl'>Dashboard</div>
               <div className="dropdown dropdown-end">
                  <div tabIndex="0" role="button" className="avatar">
                     <div className="w-10 rounded-full">
                        <img
                           alt="Tailwind CSS Navbar component"
                           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                     </div>
                  </div>
                  <ul
                     tabIndex="0"
                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                     <li>
                        <a>Profile</a>
                     </li>
                     <li><a>Settings</a></li>
                     <li><a>Logout</a></li>
                  </ul>
               </div>
            </div>
            {children}
         </main>
      </div>
   );
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
   {
      label: "Donation History",
      path: "/admin/donation-histroy",
      icon: <MdManageHistory className='text-2xl text-primary' />
   },
   {
      label: "All Donors",
      path: "/admin/donors",
      icon: <GiHeartDrop className='text-2xl text-primary' />
   },
   {
      label: "All Recipients",
      path: "/admin/recipients",
      icon: <BiDonateBlood className='text-2xl text-primary' />
   },
]