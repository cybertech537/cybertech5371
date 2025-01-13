"use client"

import React from 'react'
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

               <div className="">
                  <InputField
                     name={'lastDonationDate'}
                     label={'Last Donation Date'}
                     type={'date'}
                     errors={errors}
                     register={register}
                     validation={{}} // No 'required' rule here
                  />
               </div>

               {/* Age (Optional) */}
               <InputField
                  name={'age'}
                  label={'Age'}
                  type={'number'}
                  errors={errors}
                  register={register}
                  placeholder={'Your Age'}
                  validation={{
                     required: 'Age can not be empty.',
                     pattern: {
                        value: /^[1-9][0-9]?$/, // Optional validation to ensure age is 1-99
                        message: 'Age must be between 18 and 99.',
                     },
                  }}
               />

               <InputField
                  name="district"
                  label="District"
                  type="select"
                  register={register}
                  validation={{ required: 'District is required.' }}
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
                  name="policestation"
                  label="Thana / Upazila"
                  type="select"
                  register={register}
                  validation={{ required: 'Thana / Upazila is required.' }}
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
                  name={'donated_to'}
                  label={'Donated To'}
                  placeholder={'Search the recipient by contact number'}
                  errors={errors}
                  register={register}
               />

               {/* Preferred Donation Location (Optional) */}
               <InputField
                  name={'occupation'}
                  label={'Job / Profession'}
                  errors={errors}
                  register={register}
                  placeholder={'Occupation'}
                  validation={{}} // No 'required' rule here
               />

               <InputField
                  name={'instagram'}
                  label={'Instagram URL'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               />
               <InputField
                  name={'facebook'}
                  label={'Facebook URL'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               />
               <InputField
                  name={'twitter'}
                  label={'Twitter URL'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               />
               <InputField
                  type='file'
                  name={'profileImage'}
                  label={'Profile Image'}
                  errors={errors}
                  register={register}
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
