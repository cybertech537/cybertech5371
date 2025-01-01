'use client'

import Link from 'next/link';
import { MdOutlineDashboard, MdOutlineAccountCircle, MdManageHistory } from "react-icons/md";
import { BiDonateBlood } from 'react-icons/bi'
import { GiHeartDrop } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import Logo from '@/components/shared/Logo';


export default function AdminLayoutPages({ children }) {

   const pathname = usePathname()

   return (
      <div className="flex">
         hello
      </div>
   );
}

