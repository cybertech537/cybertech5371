"use client";

import BloodRequestCard from '@/components/Card/BloodRequestCard';
import Loader from '@/components/loader/Loader';
import { serverUrl } from '@/config/api';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function BloodRequest() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    try {
      const response = await axios.get(`${serverUrl}api/request/v1/`);
      const fetchedDonors = response?.data?.data || [];
      const filteredDonors = fetchedDonors.filter(donor => !donor.isReceived); // Filter where isReceived is false
      console.log(filteredDonors);
      setDonors(filteredDonors);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className='pb-20'>
      <div className="relative bg-black/70 pt-24 pb-40">
        <Image
          src={'/img/bed-ward.jpg'}
          height={400}
          width={1920}
          alt='bed-ward'
          className='absolute h-full w-full left-0 top-0 object-cover -z-10'
        />
        <div className="container relative text-center">
          <div className="text-primary uppercase font-bold mb-5 text-xl">Donor Bridge</div>
          <h2 className="text-5xl text-white">All Blood Requests</h2>
        </div>
      </div>
      <div className="container">
        <div className="relative bg-white p-5 sm:p-10 shadow-lg -mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {donors?.length > 0 ? (
              donors.map((item, index) => (
                <div
                  key={item._id || index}
                  className="border border-gray-300 p-4 rounded-md hover:shadow-md"
                >
                  <Link href={`/blood-requests/${item?._id}`}>
                    <BloodRequestCard item={item} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center col-span-2 text-gray-500">No blood requests found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
