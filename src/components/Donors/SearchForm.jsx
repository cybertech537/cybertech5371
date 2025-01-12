'use client'

import { getAllDistrict, getAllUpazila } from 'bd-divisions-to-unions';
import React, { useState } from 'react'

export default function SearchForm() {

   const districts = getAllDistrict('en')
   const upazilas = getAllUpazila("en");

   const [selectedDistrict, setSelectedDistrict] = useState(null)
   const [availableUpazilas, setAvailableUpazilas] = useState([])

   const handleDistrictChange = (e) => {
      const districtValue = e.target.value
      setSelectedDistrict(districtValue)

      const upazilasForDistrict = upazilas[districtValue] || [];
      setAvailableUpazilas(upazilasForDistrict);
   };

   return (
      <div className='py-10 bg-red-100'>
         <div className="container">
            <form className="flex flex-wrap items-end gap-6">
               <div className="text-lg w-full sm:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                  <div className="">
                     <label className='block font-semibold mb-2' htmlFor="blood-group">Blood Group</label>
                     <select name="bloodGroup" id="blood-group" className='w-full bg-white border-0 px-4 py-2.5'>
                        <option value="">Select </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                     </select>
                  </div>
                  <div>
                     <label htmlFor="district" className="block mb-2 text-lg font-semibold">
                        District
                     </label>
                     <select
                        id="district"
                        onChange={handleDistrictChange}
                        className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white"
                     >
                        <option value="">-- Select District --</option>
                        {Object.values(districts).flatMap((districtArray) => {
                           console.log("Before sorting:", districtArray);
                           const sortedArray = [...districtArray].sort((a, b) => a.title.localeCompare(b.title));
                           console.log("After sorting:", sortedArray);
                           return sortedArray.map((district) => (
                              <option key={district.value} value={district.value}>
                                 {district.title}
                              </option>
                           ));
                        })}
                     </select>
                  </div>

                  {/* Upazila Dropdown */}
                  <div>
                     <label htmlFor="upazila" className="block mb-2 text-lg font-semibold">
                        Thana / Upazila
                     </label>
                     <select
                        name='upazila'
                        id="upazila"
                        className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white"
                     >
                        <option value="">-- Select Upazila --</option>
                        {availableUpazilas &&
                           availableUpazilas.map((upazila) => (
                              <option key={upazila.value} value={upazila.value}>
                                 {upazila.title}
                              </option>
                           ))}
                     </select>
                  </div>
               </div>
               <button type="submit" className='btn btn-primary'>
                  Find Donors
               </button>
            </form>
         </div>
      </div>
   )
}
