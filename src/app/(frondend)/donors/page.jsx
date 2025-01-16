
'use client';

import SearchForm from '@/components/Donors/SearchForm';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { TbUserHeart } from 'react-icons/tb';
import axios from 'axios';
import { serverUrl } from '@/config/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/services/AuthProvider';
import Swal from 'sweetalert2';

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
  const { user } = useAuth()

  const router = useRouter()

  const handleNavigate = (id) => {
    // const router = useRouter();
    console.log(user)
    if (!user) {
      Swal.fire({
        title: "Access Restricted",
        text: "You need to log in to access this feature. Do you want to go to the login page?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, go to login!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Swal.fire({
          //   title: "Redirecting!",
          //   text: "Navigating to the login page.",
          //   icon: "success",
          // }).then(() => {
          // });
          router.push("/login");
        }
      });
      return;
    }

    if (user?.name) {
      const { district, upazila } = user.address || {};
      const { bloodGroup } = user;

      if (!district || !upazila || !bloodGroup) {
        Swal.fire({
          title: "Missing Information",
          text: "Please add your district, upazila, and blood group before proceeding.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Add information",
        }).then((result) => {
          if (result.isConfirmed) {
            // Swal.fire({
            //   title: "Redirecting!",
            //   text: "Navigating to the login page.",
            //   icon: "success",
            // }).then(() => {
            // });
            router.push("/admin/profile/edit");
          }
        });
        return;
      }

      // Navigate to donor details if all required fields are present
      router.push(`/donors/${id}`);
    }
  };

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
      <SearchForm onSearch={handleSearch} />
      <div className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleDonors.length > 0 ? (
              visibleDonors.map((donor, index) => (
                <div
                  onClick={() => handleNavigate(donor?._id)}
                  // href={`/donors/${donor._id}`}
                  key={index}
                  className="flex flex-wrap gap-4 bg-white shadow-md p-5 cursor-pointer"
                >
                  <div className="flex-1">
                    <ul className="text-lg">
                      <li>
                        <strong className="w-16 inline-block">Name</strong>:{' '}
                        <span className="inline-block ml-2">{donor.name}</span>
                      </li>
                      <li>
                        <strong className="w-16 inline-block">Group</strong>:{' '}
                        <span className="inline-block ml-2">{donor.bloodGroup}</span>
                      </li>
                      <li>
                        <strong className="w-16 inline-block">Area</strong>:{' '}
                        <span className="inline-block ml-2">
                          {donor.address?.district}, {donor.address?.upazila}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <TbUserHeart className="text-7xl text-primary" />
                </div>
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
  );
}
