"use client"

import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import SocialLogin from '@/components/shared/SocialLogin';
import { useForm } from 'react-hook-form';

export default function Signup() {

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()
   const SubmitHandler = (data) => console.log(data)

   return (
      <div className="bg-gray-50 py-14">
         <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
               <div className="hidden lg:block">
                  <Image src='/img/login.svg' width={400} height={500} alt="login" />
               </div>
               <div className="border border-gray-300 bg-white  rounded-lg p-5 lg:p-10">
                  <h1 className='text-3xl font-bold mb-5 text-center'>Sign Up</h1>
                  <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-5">
                     <div className=''>
                        <label htmlFor='name' className='block mb-2 text-lg font-semibold'>
                           Name
                           <span className="text-red-600 inline-block ml-1">*</span>
                        </label>
                        <input id="name" {...register('name', { required: "Name can not be empty." })} placeholder='Your Name' className='w-full px-4 py-2.5 rounded border border-gray-200' />
                        {errors.name && (
                           <p className='text-red-600'>{errors.name.message}</p>
                        )}
                     </div>
                     <div className=''>
                        <label htmlFor='email' className='block mb-2 text-lg font-semibold'>
                           Email
                           <span className="text-red-600 inline-block ml-1">*</span>
                        </label>
                        <input id="email" {...register('email', { required: "Email can not be empty." })} type="email" placeholder='Enter email' className='w-full px-4 py-2.5 rounded border border-gray-200' />
                        {errors.email && (
                           <p className='text-red-600'>{errors.email.message}</p>
                        )}
                     </div>
                     <div className=''>
                        <label htmlFor='contact' className='block mb-2 text-lg font-semibold'>
                           Contact
                           <span className="text-red-600 inline-block ml-1">*</span>
                        </label>
                        <input id="contact" {...register('contact', { required: "Contact can not be empty." })} type="email" placeholder='01723-789454' className='w-full px-4 py-2.5 rounded border border-gray-200' />
                        {errors.contact && (
                           <p className='text-red-600'>{errors.contact.message}</p>
                        )}
                     </div>
                     <div className=''>
                        <label htmlFor='password' className='block mb-2 text-lg font-semibold'>
                           Password
                           <span className="text-red-600 inline-block ml-1">*</span>
                        </label>
                        <input
                           id="password"
                           {...register('password', {
                              required: "Password cannot be empty.",
                              pattern: {
                                 value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                 message: "Password must be at least 8 characters long, include one letter, one number, and one special character."
                              }
                           })}
                           type="password"
                           placeholder='Enter password'
                           className='w-full px-4 py-2.5 rounded border border-gray-200'
                        />
                        {errors.password && (
                           <p className='text-red-600'>{errors.password.message}</p>
                        )}
                     </div>

                     <button className='btn btn-primary w-full'>
                        Sign Up
                     </button>

                     <div className="text-center">Or Sign Up with</div>

                     <SocialLogin />
                  </form>
                  <div className="text-center text-gray-400 mt-10">
                     Already have an account? <Link href={'/login'} className='text-primary hover:underline'>Login</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
