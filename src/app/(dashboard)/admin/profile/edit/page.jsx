"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import InputField from '@/components/shared/InputField';
import { useAuth } from '@/services/AuthProvider';
import { getAllDistrict, getAllUpazila } from 'bd-divisions-to-unions';
import { useState } from 'react';
import { serverUrl } from '@/config/api';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/loader/Loader';


export default function Profile() {

   const { user, refetchUser } = useAuth();
   const districts = getAllDistrict('en');
   const upazilas = getAllUpazila("en");

   const [selectedDistrict, setSelectedDistrict] = useState({ title: '', code: '' });
   const [selectedUpazila, setSelectedUpazila] = useState('');
   const [availableUpazilas, setAvailableUpazilas] = useState([]);

   const handleDistrictChange = (e) => {
      const districtValue = e.target.value;
      // Find the selected district object from the list

      const district = Object.values(districts)  // Get an array of arrays from the object
         .flatMap((districtArray) => districtArray)  // Flatten the arrays into a single array
         .find((d) => d.value === +districtValue);  // Find the district by value
      setSelectedDistrict(district || { title: '', code: '' });


      // Fetch upazilas for the selected district
      const upazilasForDistrict = upazilas[districtValue] || [];
      setAvailableUpazilas(upazilasForDistrict);
   };

   const handleUpazilaChange = (e) => {
      setSelectedUpazila(e.target.value);
   };

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()

   const SubmitHandler = async (data) => {
      const formData = new FormData();

      // Append basic data
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("bloodGroup", data.bloodGroup);
      formData.append("lastDonationDate", data.lastDonationDate || "");
      formData.append("age", data.age || "");
      formData.append("occupation", data.occupation);
      formData.append("socialMedia[instagram]", data.socialMedia?.instagram || "");
      formData.append("socialMedia[facebook]", data.socialMedia?.facebook || "");
      formData.append("socialMedia[twitter]", data.socialMedia?.twitter || "");
      if(!selectedDistrict.title){
         formData.append("address[district]", user?.address?.district);
      }else{
         formData.append("address[district]", selectedDistrict.title);

      }

      if(!selectedUpazila){
         formData.append("address[upazila]", user?.address?.upazila);
      }else{
         formData.append("address[upazila]", selectedUpazila);
      }
      formData.append("address[area]", data.address?.area || "");

      // Append the image file if it exists
      if (data.image && data.image.length > 0) {
         formData.append("image", data.image[0]); // Assume single file
      }

      const token = localStorage.getItem("agreeToken");

      if (!token) {
         console.error("No token found in local storage.");
         return;
      }

      try {
         const response = await fetch(`${serverUrl}api/user/v1/update`, {
            method: "PUT",
            body: formData,
            headers: {
               Authorization: `Bearer ${token}`, // Include token if required
            },
         });

         if (response.ok) {
            const result = await response.json();
            refetchUser()
            toast.success('Save your changes');
            window.location.href = '/admin/profile'
         } else {
            toast.error('something was wrong');
            console.error("Failed to update profile:", await response.json());
         }
      } catch (error) {
         toast.error('something was wrong');
         console.error("Error updating profile:", error);
      }
   };

if(!user)return <Loader/>

   return (
      <div className="bg-white p-5 shadow max-w-7xl">
         <form onSubmit={handleSubmit(SubmitHandler)} className='space-y-10'>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

               <div>
                  <label className="block font-medium mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                     defaultValue={user?.name}
                     {...register("name", { required: "Name is required" })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
               </div>

               <div>
                  <label className="block font-medium mb-1">Email <span className="text-red-500">*</span></label>
                  <input
                     defaultValue={user?.email}
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

               <div>
                  <label className="block font-medium mb-1">Contact <span className="text-red-500">*</span></label>
                  <input
                     defaultValue={user?.phone}
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

               <div>
                  <label className="block font-medium mb-1">Blood group <span className="text-red-500">*</span></label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none" {...register("bloodGroup", { required: "Blood group is required." })}>
                     <option defaultValue={user?.bloodGroup}>{user?.bloodGroup}</option>
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

               <div>
                  <label className="block font-medium mb-1">Last Donation Date</label>
                  <input
                     defaultValue={user?.lastDonationDate}
                     type="date"
                     {...register("lastDonationDate")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                  />
                  {errors.lastDonationDate && <p className="text-red-500">{errors.lastDonationDate.message}</p>}
               </div>

               <div>
                  <label className="block font-medium mb-1">Age</label>
                  <input
                     type="number"
                     defaultValue={user?.age}
                     {...register("age", {
                        pattern: {
                           value: /^[1-9][0-9]?$/,
                           message: 'Age must be between 18 and 99.',
                        }
                     })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter age"
                  />
               </div>

               {/* district dropdown */}
               <div>
                  <label htmlFor="district" className="block font-medium mb-1">
                     District
                  </label>
                  <select
                     id="district"
                     onChange={handleDistrictChange}
                     className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white"
                  >
                     <option defaultValue={user?.address?.district}>{user?.address?.district}</option>
                     {Object.values(districts).flatMap((districtArray) =>
                        districtArray.map((district) => (
                           <option key={district.value} value={district.value}>
                              {district.title}
                           </option>
                        ))
                     )}
                  </select>
               </div>

               {/* Upazila Dropdown */}
               <div>
                  <label htmlFor="upazila" className="block font-medium mb-1">
                     Upazila
                  </label>
                  <select
                     name="upazila"
                     id="upazila"
                     onChange={handleUpazilaChange}
                     className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white"
                  >
                     <option defaultValue={user?.address?.upazila}>{user?.address?.upazila}</option>
                     {availableUpazilas &&
                        availableUpazilas.map((upazila) => (
                           <option key={upazila.title} value={upazila.title}>
                              {upazila.title}
                           </option>
                        ))}
                  </select>
               </div>

               {/* Address (Optional) */}


               <div>
                  <label className="block font-medium mb-1">Area</label>
                  <input
                     defaultValue={user?.address?.area}
                     {...register("address.area")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter area"
                  />
               </div>

               {/* Preferred Donation Location (Optional) */}

               <div>
                  <label className="block font-medium mb-1">Job / Profession <span className="text-red-500">*</span></label>
                  <input
                     defaultValue={user?.occupation}
                     {...register("occupation", { required: "occupation is required" })}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
                  {errors.occupation && <p className="text-red-500">{errors.occupation.message}</p>}
               </div>

               {/* <InputField*/}
               <div>
                  <label className="block font-medium mb-1">Instagram URL</label>
                  <input defaultValue={user?.socialMedia?.instagram}
                     {...register("socialMedia.instagram")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
               </div>

               <div>
                  <label className="block font-medium mb-1">Facebook URL</label>
                  <input
                     defaultValue={user?.socialMedia?.facebook}
                     {...register("socialMedia.facebook")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
               </div>

               <div>
                  <label className="block font-medium mb-1">Twitter URL</label>
                  <input
                     defaultValue={user?.socialMedia?.twitter}
                     {...register("socialMedia.twitter")}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:outline-none"
                     placeholder="Enter name"
                  />
               </div>

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
