"use client"

import React from 'react'
import Link from 'next/link';
import SocialLogin from '@/components/shared/SocialLogin';
import { useForm } from 'react-hook-form';
import InputField from '@/components/shared/InputField';
import PageHero from '@/components/shared/PageHero';

export default function RegisterRecipient() {

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()
   const SubmitHandler = (data) => console.log(data)

   return (
      <div className="bg-gray-50 pb-14">
         <PageHero title='Register to Request Blood'
            description='Join to connect with donors and request blood when needed.' />
         <div className="container">
            <div className="-mt-16 relative z-10 border border-gray-300 bg-white rounded p-5 lg:p-10 max-w-3xl mx-auto">
               <form onSubmit={handleSubmit(SubmitHandler)} className='space-y-10'>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                     <InputField
                        name={'fullname'}
                        label={'Full Name'}
                        errors={errors}
                        register={register}
                        placeholder={'Full Name'}
                        validation={{ required: 'Name can not be empty.' }} />

                     <InputField
                        name={'email'}
                        type={'email'}
                        label={'Email'}
                        errors={errors}
                        register={register}
                        placeholder={'Enter email'}
                        validation={{
                           //required: 'Email can not be empty.',
                           pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: 'Invalid email address.',
                           }
                        }} />

                     <InputField
                        name={'contact'}
                        label={'Contact'}
                        errors={errors}
                        register={register}
                        placeholder={'01723-789454'}
                        validation={{
                           required: 'Contact number can not be empty.',
                           pattern: {
                              value: /^(?:\+88|0088)?01[3-9]\d{8}$|^(?:\+88|0088)?0\d{8,10}$/,
                              message: 'Invalid contact number.',
                           }
                        }} />

                     <InputField
                        name={'password'}
                        label={'Password'}
                        type={'password'}
                        errors={errors}
                        register={register}
                        validation={{
                           required: 'Password can not be empty.',
                           pattern: {
                              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message: "Password must be at least 8 characters long, include one letter, one number, and one special character."
                           }
                        }} />
                  </div>

                  <div className="">
                     <button className='btn btn-primary w-full rounded'>
                        Register
                     </button>
                  </div>

                  <div className="text-center">Or Register with</div>

                  <SocialLogin />
               </form>
               <div className="text-center text-gray-400 mt-10">
                  Already have an account? <Link href={'/login'} className='text-primary hover:underline'>Login</Link>
               </div>
            </div>
         </div>
      </div>
   )
}
