'use client'
import { useAuth } from '@/services/AuthProvider';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { LuLogIn } from "react-icons/lu";
import { LuUserRoundSearch } from "react-icons/lu";
import Swal from 'sweetalert2';

export default function Promo() {

   const { user } = useAuth()

   const router = useRouter()

   const handleNavigate = () => {
      // const router = useRouter();
      console.log(user)
      if (!user) {
         Swal.fire({
            title: "Access Restricted",
            text: "You need to log in to access this feature. Do you want to go to the login page?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, go to login!",
         }).then((result) => {
            if (result.isConfirmed) {
               router.push("/login");
            }
         });
         return;
      }

      if (user?.name) {
         const { district, upazila } = user.address || {};
         const { bloodGroup } = user;

         if (!district || !upazila || !bloodGroup) {
            Swal.fire({
               title: "Missing Information",
               text: "Please add your district, upazila, and blood group before proceeding.",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Add information",
            }).then((result) => {
               if (result.isConfirmed) {
                  router.push("/admin/profile/edit");
               }
            });
            return;
         }

         // Navigate to donor details if all required fields are present
         router.push(`/blood-requests/add-request/`);
      }
   };

   return (
      <div className='-mt-20 relative z-20'>
         <div className="container">
            <div className="grid md:grid-cols-2 grid-cols-1">
               <div
               onClick={()=>handleNavigate()}
                  //  href={'/blood-requests/add-request/'}
                  className="bg-black cursor-pointer text-white p-6 sm:p-10 flex flex-wrap gap-10 items-center">
                  <div className="sm:flex-1">
                     <h2 className="text-3xl font-bold mb-5">
                        Make a Blood Request
                     </h2>
                     <p className='text-lg'>Can not find a donor? Post your custom blood request to reach potential donors.</p>
                  </div>
                  <LuLogIn className='text-6xl' />
               </div>
               <Link href={'/donors/'} className="bg-primary text-white p-6 sm:p-10 flex flex-wrap gap-10 items-center">
                  <div className="sm:flex-1">
                     <h2 className="text-3xl font-bold mb-5">
                        Search for a Donor
                     </h2>
                     <p className='text-lg'>Quickly find reliable donors near you and get the help you need.</p>
                  </div>
                  <LuUserRoundSearch className='text-6xl' />
               </Link>
            </div>
         </div>
      </div>
   )
}
