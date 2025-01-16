'use client'
import SearchForm from '@/components/Donors/SearchForm';
import Link from 'next/link';
import { TbUserHeart } from "react-icons/tb";
import React, { useEffect, useState } from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import axios from 'axios';
import { serverUrl } from '@/config/api';

export default function Page() {

  const [donors, setDonors] = useState([]);
  const [visibleDonors, setVisibleDonors] = useState([]);
  const [showAll, setShowAll] = useState(false); // Track whether to show all donors
  const [searchParams, setSearchParams] = useState({
    search: '',
    bloodGroup: '',
    district: '',
    upazila: '',
  });

  const fetchDonors = async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await axios.get(`${serverUrl}api/user/v1/all?${query}`);
      const fetchedDonors = response?.data?.details?.data || [];
      setDonors(fetchedDonors);
      setVisibleDonors(fetchedDonors.slice(0, 6)); // Show only the first 6 initially
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleSearch = (data) => {
    setSearchParams(data);
  };

  const toggleDonors = () => {
    if (showAll) {
      setVisibleDonors(donors.slice(0, 6)); // Show only the first 6
    } else {
      setVisibleDonors(donors); // Show all donors
    }
    setShowAll(!showAll); // Toggle the state
  };

  useEffect(() => {
    fetchDonors(searchParams);
  }, [searchParams]);

  return (
    <>
      <SearchForm  onSearch={handleSearch} />
      <div className='py-16 bg-gradient-to-b from-red-50 to-white'>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {visibleDonors.length > 0 ? (
              visibleDonors.map((donor, index) => (
                <Link href={`/donors/${donor._id}`} key={index} className='flex flex-wrap gap-4 bg-white shadow-md p-5'>
                  <div className="flex-1">
                    <ul className='text-lg'>
                      <li><strong className='w-16 inline-block'>Name</strong>: <span className='inline-block ml-2'>{donor.name}</span></li>
                      <li><strong className='w-16 inline-block'>Group</strong>: <span className='inline-block ml-2'>{donor.bloodGroup}</span></li>
                      <li>
                        <strong className='w-16 inline-block'>Area</strong>:
                        <span className='inline-block ml-2'>
                          District, Thana
                        </span>
                      </li>
                      <li>
                        <strong className='w-16 inline-block'>Contact</strong>:
                        <span className='inline-block ml-2'>
                          01953182201
                        </span>
                      </li>
                    </ul>
                  </div>
                  <TbUserHeart className='text-7xl text-primary' />
                </Link>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No donors found.
              </p>
            )}
          </div>
          {donors.length > 6 && (
            <div className="text-center mt-12">
              <button className="btn btn-primary" onClick={toggleDonors}>
                {showAll ? 'Show Less' : 'Load More'}
                {showAll ? <FaArrowUpLong /> : <FaArrowDownLong />}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
