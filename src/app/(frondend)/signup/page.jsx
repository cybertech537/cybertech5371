import Image from 'next/image'
import React from 'react'
import ClientSignup from '@/components/signup/ClientSignup';

export default function Signup() {
   return (
      <div className="bg-gray-50 py-14">
         <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
               <div className="hidden lg:block">
                  <Image src='/img/login.svg' width={400} height={500} alt="login" />
               </div>
               <ClientSignup />
            </div>
         </div>
      </div>
   )
}
