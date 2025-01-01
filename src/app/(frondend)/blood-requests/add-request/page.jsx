"use client"

import React from 'react'
import Link from 'next/link';
import SocialLogin from '@/components/shared/SocialLogin';
import { useForm } from 'react-hook-form';
import PageHero from '@/components/shared/PageHero';
import InputField from '@/components/shared/InputField';

export default function AddRequest () {

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()
   const SubmitHandler = (data) => console.log(data)

   return (
      <div className="bg-gray-50 pb-14">
         <PageHero title='Request for Blood'
            description='No donor available? Submit your blood request and connect with donors directly.' />

         <div className="container">
            <div className="-mt-16 relative z-10 border border-gray-300 bg-white rounded p-5 lg:p-10 max-w-3xl mx-auto">
               <form onSubmit={handleSubmit(SubmitHandler)} className='space-y-10'>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

                     <InputField
                        name={'disease'}
                        label={'Disease'}
                        errors={errors}
                        register={register}
                        validation={{
                           required: 'Field is required'
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
                        name={'requiredDate'}
                        label={'When Needed?'}
                        type={'date'}
                        errors={errors}
                        register={register}
                        validation={{
                           required: "Date is required"
                        }}
                     />

                     <InputField
                        name={'area'}
                        label={'Area'}
                        errors={errors}
                        register={register}
                        placeholder={'Enter Area'}
                        validation={{
                           required: "Area is required"
                        }}
                     />

                     <InputField
                        name={'extraContact'}
                        label={'Extra Contact'}
                        errors={errors}
                        register={register}
                        validation={{}}
                     />

                     <InputField
                        name={'quantity'}
                        label={'Quantity Needed'}
                        type='select'
                        errors={errors}
                        register={register}
                        validation={{ required: 'Quantity is required.' }}
                        options={[
                           { value: '1', label: '1 Bag' },
                           { value: '2', label: '2 Bag' },
                           { value: '3', label: '3 Bag' },
                           { value: '4', label: '4 Bag' },
                        ]}
                     />

                     <InputField
                        classname='col-span-full'
                        type='textarea'
                        name={'note'}
                        label={'Message/Note'}
                        errors={errors}
                        register={register}
                        placeholder={'Optional, for additional details or requests.'}
                        validation={{}}
                     />

                  </div>

                  <div className="">
                     <button className='btn btn-primary w-full rounded'>
                        Post the Request
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}
