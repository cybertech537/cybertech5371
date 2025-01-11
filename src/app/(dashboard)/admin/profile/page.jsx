"use client"

import React from 'react'
import Link from 'next/link';
import SocialLogin from '@/components/shared/SocialLogin';
import { useForm } from 'react-hook-form';
import InputField from '@/components/shared/InputField';

export default function Profile() {

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()
   const SubmitHandler = (data) => console.log(data)

   return (
      <div className="bg-white p-5 shadow max-w-7xl">
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

               <InputField
                  name="bloodGroup"
                  label="Blood Group"
                  type="select"
                  register={register}
                  validation={{ required: 'Blood group is required.' }}
                  errors={errors}
                  options={[
                     { value: 'A+', label: 'A+' },
                     { value: 'A-', label: 'A-' },
                     { value: 'B+', label: 'B+' },
                     { value: 'B-', label: 'B-' },
                     { value: 'AB+', label: 'AB+' },
                     { value: 'AB-', label: 'AB-' },
                     { value: 'O+', label: 'O+' },
                     { value: 'O-', label: 'O-' },
                  ]}
               />

               <InputField
                  name={'lastDonationDate'}
                  label={'Last Donation Date'}
                  type={'date'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               />

               {/* Age (Optional) */}
               <InputField
                  name={'age'}
                  label={'Age'}
                  type={'number'}
                  errors={errors}
                  register={register}
                  placeholder={'Your Age'}
                  validation={{
                     pattern: {
                        value: /^[1-9][0-9]?$/, // Optional validation to ensure age is 1-99
                        message: 'Age must be between 1 and 99.',
                     },
                  }}
               />

               {/* Address (Optional) */}
               <InputField
                  name={'address'}
                  label={'Address'}
                  errors={errors}
                  register={register}
                  placeholder={'Your Address'}
                  validation={{}} // No 'required' rule here
               />

               {/* Availability (Optional) */}
               <InputField
                  name={'availability'}
                  label={'Availability'}
                  type={'select'}
                  errors={errors}
                  register={register}
                  validation={{}}
                  options={[
                     { value: 'weekdays', label: 'Weekdays' },
                     { value: 'weekends', label: 'Weekends' },
                  ]}
               />

               {/* Preferred Donation Location (Optional) */}
               <InputField
                  name={'preferredLocation'}
                  label={'Preferred Donation Location'}
                  errors={errors}
                  register={register}
                  placeholder={'Your Preferred Location'}
                  validation={{}} // No 'required' rule here
               />

            </div>

            <div className="">
               <button className='btn btn-primary w-full rounded'>
                  Update
               </button>
            </div>
         </form>
      </div>
   )
}
