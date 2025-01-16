'use client'

import { BiDonateBlood } from 'react-icons/bi';
import { GiHeartDrop } from 'react-icons/gi';
import { MdOutlineMap, MdOutlineBloodtype } from 'react-icons/md';
import { LuHeartHandshake } from "react-icons/lu";
import { serverUrl } from '@/config/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '@/components/loader/Loader';

export default function Dashboard() {
   const [totalUser, setTotalUser] = useState([])
   const [recipients, setRecipients] = useState([])
   const [completedDonation, setCompletedDonation] = useState([])
   const [loading, setLoading] = useState(true);

   const fetchUser = async (params = {}) => {
      try {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${serverUrl}api/user/v1/all`);
        const fetchedDonors = response?.data?.details?.paging || {};
        setTotalUser(fetchedDonors);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    const fetchCompletedDonation = async () => {
      try {
        const response = await axios.get(`${serverUrl}api/request/v1/`);
        const fetchedDonors = response?.data?.data || [];
        const filteredDonors = fetchedDonors.filter(donor => donor.isReceived); // Filter where isReceived is false
        setCompletedDonation(filteredDonors);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    const fetchRecipients = async () => {
      try {
        const response = await axios.get(`${serverUrl}api/request/v1/`);
        const fetchedDonors = response?.data?.data || [];
        setRecipients(fetchedDonors);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    useEffect(() => {
      fetchRecipients()
      fetchUser();
      fetchCompletedDonation()
    }, []);

    if (loading) return <Loader/>;

   return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Donors</span>
               <h3 className='text-2xl mt-2'>{totalUser?.total}</h3>
            </div>
            <GiHeartDrop className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Recipients</span>
               <h3 className='text-2xl mt-2'>{recipients?.length}</h3>
            </div>
            <BiDonateBlood className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Districts</span>
               <h3 className='text-2xl mt-2'>64</h3>
            </div>
            <MdOutlineMap className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Blood Groups</span>
               <h3 className='text-2xl mt-2'>8</h3>
            </div>
            <MdOutlineBloodtype className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Donations Completed</span>
               <h3 className='text-2xl mt-2'>{completedDonation?.length}</h3>
            </div>
            <LuHeartHandshake className='text-5xl text-primary' />
         </div>
      </div>
   );
}
