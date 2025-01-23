'use client';

import SearchForm from '@/components/Donors/SearchForm';
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaLocationDot, FaRegUser } from 'react-icons/fa6';
import { TbUserHeart } from 'react-icons/tb';
import axios from 'axios';
import { serverUrl } from '@/config/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/services/AuthProvider';
import Swal from 'sweetalert2';
import Loader from '@/components/loader/Loader';
import { MdOutlineBloodtype } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';

export default function Page() {
  const [donors, setDonors] = useState([]);
  const [total, setTotal] = useState(0); // Total donors count
  const [page, setPage] = useState(1); // Current page
  const [pages, setPages] = useState(0); // Total pages
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    search: '',
    bloodGroup: '',
    district: '',
    upazila: '',
  });
  const { user } = useAuth();
  const router = useRouter();

  const handleNavigate = (id) => {
    if (!user) {
      Swal.fire({
        title: 'Access Restricted',
        text: 'You need to log in to access this feature. Do you want to go to the login page?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#22c55e",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, go to login!",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
      return;
    }

    router.push(`/donors/${id}`);
  };

  const fetchDonors = async (params = {}, page = 1) => {
    try {
      const query = new URLSearchParams({ ...params, page }).toString();
      const response = await axios.get(`${serverUrl}api/user/v1/valid-donors?${query}`);
      const fetchedDonors = response?.data?.details?.data || [];
      setDonors(fetchedDonors);
      setLoading(false)
      setTotal(response?.data?.details?.paging?.total || 0);
      setPages(response?.data?.details?.paging?.pages || 0);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleSearch = (data) => {
    setSearchParams(data);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchDonors(searchParams, newPage);
  };

  useEffect(() => {
    fetchDonors(searchParams, page);
  }, [searchParams, page]);

  if (loading) return <Loader />;

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <div className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.length > 0 ? (
              donors.map((donor, index) => (
                <div
                  onClick={() => handleNavigate(donor?._id)}
                  key={index}
                  className="flex flex-wrap gap-4 bg-white shadow-md p-5 cursor-pointer"
                >
                  <div className="flex-1">
                    <ul className="text-lg space-y-3">
                      <li className='flex items-center gap-1'>
                        <FaRegUser className='text-primary text-2xl' />
                        <span className="inline-block ml-2 flex-1">{donor.name}</span>
                      </li>
                      <li className='flex items-center gap-1'>
                        <MdOutlineBloodtype className='text-primary text-2xl' />
                        <span className="inline-block ml-2 flex-1">{donor.bloodGroup}</span>
                      </li>
                      <li className='flex items-center gap-1'>
                        <IoLocationOutline className='text-primary text-2xl' />
                        <span className="inline-block ml-2 flex-1">
                          {donor.address?.district}, {donor.address?.upazila}
                        </span>
                      </li>
                      {/* <li>
                        <strong className="w-16 inline-block">Group</strong>:{' '}
                        <span className="inline-block ml-2">{donor.bloodGroup}</span>
                      </li>
                      <li>
                        <strong className="w-16 inline-block">Area</strong>:{' '}
                        <span className="inline-block ml-2">
                          {donor.address?.district}, {donor.address?.upazila}
                        </span>
                      </li> */}
                    </ul>
                  </div>
                  <TbUserHeart className="text-7xl text-primary" />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">No donors found.</p>
            )}
          </div>

          {donors.length > 12 &&
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                className="btn btn-primary"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                <FaArrowLeft /> Previous
              </button>
              <p className="text-lg">
                Page {page} of {pages}
              </p>
              <button
                className="btn btn-primary"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= pages}
              >
                Next <FaArrowRight />
              </button>
            </div>
          }
        </div>
      </div>
    </>
  );
}
