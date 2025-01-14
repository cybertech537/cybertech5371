"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { FiFacebook, FiLinkedin, FiTwitter, FiUser } from 'react-icons/fi'
import { GiHeartDrop } from 'react-icons/gi'
import { FaDisease } from 'react-icons/fa6'
import { IoCalendarClearSharp } from 'react-icons/io5'
import { LuMapPin } from 'react-icons/lu'
import { serverUrl } from '@/config/api'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import DateFormate from '@/components/dateformate/DateFormate';

export default function DonorDetail() {

  const router = useRouter();
  const { id } = useParams() // Extracting the `id` from the URL
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Ensure `id` is available before fetching

    const fetchDonorData = async () => {
      try {
        const response = await axios.get(`${serverUrl}api/user/v1/details/${id}`);
        setDonor(response?.data?.details); // Adjust based on your API response format
        setLoading(false);
      } catch (err) {
        console.error('Error fetching donor data:', err);
        setError('Failed to fetch donor data.');
        setLoading(false);
      }
    };

    fetchDonorData();
  }, [id]);

  console.log(donor)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='py-20 bg-slate-50'>
      <div className="container">
        <div className="">
          <div className="flex flex-wrap gap-8 border-2 border-gray-200 bg-white p-10">
            <div className="">
              <Image src={donor?.image} alt='profile' height={200} width={200} className='border-4 border-white shadow-lg rounded-full object-cover' />
            </div>
            <div className="md:flex-1">
              <h2 className='text-2xl lg:text-3xl'>{donor?.name}</h2>
              <div className="inline-flex gap-2 text-lg items-center text-gray-500">
                <GiHeartDrop className='text-primary mt-1' />
                Blood Donation Fighter
              </div>
              <div className="flex flex-wrap gap-4 text-2xl mt-4 text-primary">
                <Link href={'https://facebook.com'} target='_blank'><FiLinkedin /></Link>
                <Link href={'https://facebook.com'} target='_blank'><FiFacebook /></Link>
                <Link href={'https://facebook.com'} target='_blank'><FiTwitter /></Link>
              </div>
              <div className="text-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                <div className="">
                  <div className="uppercase text-gray-600 mb-2 text-base">
                    Contact
                  </div>
                  <div className="font-bold">
                    <Link href={`tel:${donor?.phone}`}>{donor?.phone}</Link>
                  </div>
                </div>
                <div className="">
                  <div className="uppercase text-gray-600 mb-2 text-base">
                    Blood Group
                  </div>
                  <div className="font-bold">{donor?.bloodGroup}</div>
                </div>
                <div className="">
                  <div className="uppercase text-gray-600 mb-2 text-base">
                    Address
                  </div>
                  <div className="font-bold">
                    {donor?.address?.upazila}, {donor?.address?.district}
                  </div>
                </div>
                <div className="">
                  <div className="uppercase text-gray-600 mb-2 text-base">
                    Total Donation
                  </div>
                  <div className="font-bold">
                    {donor?.donationCount} times
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto mt-10 border-2 border-gray-200 bg-white p-10">
          <h2 className="text-2xl mb-4">
            Donation History
          </h2>
          <table className='table'>
            <thead>
              <tr>
                <th className='border-b'>
                  <div className="flex gap-1 items-center text-sm">
                    <FiUser className='text-primary text-lg' />
                    Recipant Name
                  </div>
                </th>
                <th className='border-b'>
                  <div className="flex gap-1 items-center text-sm">
                    <FaDisease className='text-primary text-lg' />
                    Disease
                  </div>
                </th>
                <th className='border-b'>
                  <div className="flex gap-1 items-center text-sm">
                    <LuMapPin className='text-primary text-lg' />
                    Area
                  </div>
                </th>
                <th className='border-b'>
                  <div className="flex gap-1 items-center text-sm">
                    <IoCalendarClearSharp className='text-primary text-lg' />
                    Donation Date
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                donor?.donationHistory?.map((history)=>
              <tr key={history?._id}>
                <td className='border-b'>{donor?.name}</td>
                <td className='border-b'>Road Accident</td>
                <td className='border-b'>{donor?.address?.upazila}, {donor?.address?.district}</td>
                <td className='border-b'><DateFormate item={history}/></td>
              </tr>
              )
            }
              {/* <tr>
                <td className='border-b'>Mark Neel</td>
                <td className='border-b'>Road Accident</td>
                <td className='border-b'>Mirpur, Dhaka</td>
                <td className='border-b'>10/10/2024</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
