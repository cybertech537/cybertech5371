"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import InputField from '@/components/shared/InputField';
import { useAuth } from '@/services/AuthProvider';

export default function Profile() {

   const { user } = useAuth();

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

               <div>
                  <label className="block font-medium mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                     {...register("name", { required: "Name is required" })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
               </div>

               <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                     {...register("email", {
                        required: "Email is required",
                        pattern: {
                           value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                           message: "Please enter a valid email address",
                        },
                     })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter email"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
               </div>

               {/* <InputField
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
                  }} /> */}

               <div>
                  <label className="block font-medium mb-1">Contact</label>
                  <input
                     {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                           value: /^(?:\+88|0088)?01[3-9]\d{8}$|^(?:\+88|0088)?0\d{8,10}$/,
                           message: 'Invalid contact number.',
                        },
                     })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
               </div>

               {/* <InputField
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
               /> */}
               <div>
                  <label className="block font-medium mb-1">Blood group</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none" {...register("bloodGroup", { required: "Blood group is required." })}>
                     {/* <option defaultValue="Available">Available</option> */}
                     <option value="A+">A+</option>
                     <option value="A-">A-</option>
                     <option value="B+">B+</option>
                     <option value="B-">B-</option>
                     <option value="AB+">AB+</option>
                     <option value="AB-">AB-</option>
                     <option value="O+">O+</option>
                     <option value="O-">O-</option>
                  </select>
               </div>

               {/* <div className="">
                  <InputField
                     name={'lastDonationDate'}
                     label={'Last Donation Date'}
                     type={'date'}
                     errors={errors}
                     register={register}
                     validation={{}} // No 'required' rule here
                  />
               </div> */}
               <div>
                  <label className="block font-medium mb-1">Last Donation Date</label>
                  <input
                     type="date"
                     {...register("lastDonationDate")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                  />
                  {errors.lastDonationDate && <p className="text-red-500">{errors.lastDonationDate.message}</p>}
               </div>

               {/* Age (Optional) */}
               {/* <InputField
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
               /> */}
               <div>
                  <label className="block font-medium mb-1">Age</label>
                  <input
                     {...register("age", {
                        required: "Age is required",
                        pattern: {
                           value: /^[1-9][0-9]?$/,
                           message: 'Age must be between 18 and 99.',
                        }
                     })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter age"
                  />
                  {errors.age && <p className="text-red-500">{errors.age.message}</p>}
               </div>

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
               {/* <InputField
                  name={'address'}
                  label={'Address'}
                  errors={errors}
                  register={register}
                  placeholder={'Your Address'}
                  validation={{}} // No 'required' rule here
               /> */}

               <div>
                  <label className="block font-medium mb-1">Area</label>
                  <input
                     {...register("address.area")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter area"
                  />
                  {errors.address?.area && <p className="text-red-500">{errors.address?.area.message}</p>}
               </div>

               {/* Preferred Donation Location (Optional) */}
               {/* <InputField
                  name={'occupation'}
                  label={'Job / Profession'}
                  errors={errors}
                  register={register}
                  placeholder={'Occupation'}
                  validation={{}} // No 'required' rule here
               /> */}
               <div>
                  <label className="block font-medium mb-1">Job / Profession</label>
                  <input
                     {...register("occupation", { required: "occupation is required" })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
                  {errors.occupation && <p className="text-red-500">{errors.occupation.message}</p>}
               </div>

               {/* <InputField
                  name={'instagram'}
                  label={'Instagram URL'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               /> */}
               <div>
                  <label className="block font-medium mb-1">Instagram URL</label>
                  <input
                     {...register("socialMedia.instagram")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
               </div>

               {/* <InputField
                  name={'facebook'}
                  label={'Facebook URL'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               /> */}
               <div>
                  <label className="block font-medium mb-1">Facebook URL</label>
                  <input
                     {...register("socialMedia.facebook")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
               </div>

               {/* <InputField
                  name={'twitter'}
                  label={'Twitter URL'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               /> */}
               <div>
                  <label className="block font-medium mb-1">Twitter URL</label>
                  <input
                     {...register("socialMedia.twitter")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
               </div>

               {/* <InputField
                  type='file'
                  name={'profileImage'}
                  label={'Profile Image'}
                  errors={errors}
                  register={register}
                  validation={{}} // No 'required' rule here
               /> */}
               <div>
                  <label className="block font-medium mb-1">Profile Image</label>
                  <input
                  type="file"
                     {...register("image")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
               </div>

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
