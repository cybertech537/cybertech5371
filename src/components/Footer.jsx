import Link from 'next/link'
import React from 'react'
import { FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";
import Logo from './shared/Logo';

export default function Footer() {
   return (
      <footer>
         <div className="bg-primary/10 py-12 lg:py-20 text-lg">
            <div className="container">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <aside className='sm:col-span-2 lg:col-span-1'>
                     {/* brand logo */}
                     <Logo path='/' className='mb-5' />
                     <p>
                        DonorBridge is an automated blood service that connects blood searchers with voluntary blood donors in a moment through SMS and website.
                     </p>
                     <div className="flex flex-wrap gap-4 text-3xl mt-8 text-primary">
                        <Link href={'https://facebook.com'} target='_blank' aria-label="Follow us on Facebook"><FiFacebook /></Link>
                        <Link href={'https://twitter.com'} target='_blank' aria-label="Follow us on Twitter"><FiTwitter /></Link>
                        <Link href={'https://linkedin.com'} target='_blank' aria-label="Follow us on Linkedin"><FiLinkedin /></Link>
                     </div>
                  </aside>
                  <nav>
                     <div className="text-black text-2xl mb-5 font-bold">
                        About Blood
                     </div>
                     <div className="flex flex-col gap-3">
                        <Link href={'/'} className='hover:underline'>What is blood?</Link>
                        <Link href={'/'} className='hover:underline'>What is blood donation?</Link>
                        <Link href={'/'} className='hover:underline'>Who can donate blood?</Link>
                        <Link href={'/'} className='hover:underline'>How often can I donate blood?</Link>
                        <Link href={'/'} className='hover:underline'>Different Blood Terms</Link>
                        <Link href={'/'} className='hover:underline'>Different Blood Groups</Link>
                     </div>
                  </nav>
                  <nav>
                     <div className="text-black text-2xl mb-5 font-bold">
                        Help & Support
                     </div>
                     <div className="flex flex-col gap-3">
                        <Link href={'#'} className='hover:underline'>FAQs</Link>
                        <Link href={'#'} className='hover:underline'>Blog</Link>
                        <Link href={'#'} className='hover:underline'>Contact us</Link>
                        <Link href={'#'} className='hover:underline'>Privacy Policy</Link>
                        <Link href={'/terms-and-conditions'} className='hover:underline'>Terms & Conditions</Link>
                     </div>
                  </nav>
               </div>
            </div>
         </div>
         <div className="bg-black text-center py-4 text-white/90">
            <div className="container">
               <p>
                  &copy; 2024 Centralized Blood Donation System. All rights reserved. Designed and developed with ❤️ to save lives.
               </p>
            </div>
         </div>
      </footer>
   )
}
