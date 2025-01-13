'use client'
import { getAllDistrict, getAllUpazila } from 'bd-divisions-to-unions';
import { useState } from 'react';

export default function SearchForm() {
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

   const handleSubmit = (e) => {
      e.preventDefault();
      const result = {
         district: selectedDistrict.title,
         upazila: selectedUpazila
      };
      console.log("Selected Data:", result);
   };

   return (
      <div className='py-10 bg-red-100'>
         <div className="container">
            <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-6">
               <div className="text-lg w-full sm:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                  <div>
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
                        <span className="text-red-600 inline-block ml-1">*</span>
                     </label>
                     <select
                        id="district"
                        onChange={handleDistrictChange}
                        className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white"
                     >
                        <option value="">-- Select District --</option>
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
                     <label htmlFor="upazila" className="block mb-2 text-lg font-semibold">
                        Upazila
                        <span className="text-red-600 inline-block ml-1">*</span>
                     </label>
                     <select
                        name="upazila"
                        id="upazila"
                        onChange={handleUpazilaChange}
                        className="w-full px-4 py-2.5 rounded border border-gray-200 bg-white"
                     >
                        <option value="">-- Select Upazila --</option>
                        {availableUpazilas &&
                           availableUpazilas.map((upazila) => (
                              <option key={upazila.title} value={upazila.title}>
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
   );
}
