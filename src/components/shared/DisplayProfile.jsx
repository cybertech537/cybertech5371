import Image from "next/image";
import Link from "next/link";

export default function DisplayProfile() {
   return (
      <div className="dropdown dropdown-end">
         <div tabIndex="0" role="button" className="avatar">
            <div className="w-10 rounded-full">
               <Image src={'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} height={40} width={40} alt='profile' />
            </div>
         </div>
         <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
               <Link href={'/admin/profile'}>Profile</Link>
            </li>
            <li>
               <Link href={'/admin/profile/edit'}>Settings</Link>
            </li>
            <li>
               <button>Logout</button>
            </li>
         </ul>
      </div>
   )
}
