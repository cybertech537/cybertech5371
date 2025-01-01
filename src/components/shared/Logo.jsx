import Link from "next/link";

export default function Logo({path, className}) {
   return (
      <Link href={path} className={`inline-block ${className}`}>
         <span className='font-bold text-3xl'>
            <span className='text-primary'>Donor</span>
            Bridge
         </span>
         <span className='block text-gray-400 uppercase text-xs mt-1'>
            Centralized Blood Donation
         </span>
      </Link>
   )
}
