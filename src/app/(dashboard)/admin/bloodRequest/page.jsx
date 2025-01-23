'use client'
import { serverUrl } from '@/config/api'
import { useAuth } from '@/services/AuthProvider'
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaDisease } from 'react-icons/fa6'
import { FiUser } from 'react-icons/fi'
import { IoCalendarClearSharp } from 'react-icons/io5'
import { LuMapPin } from 'react-icons/lu'
import { RiExternalLinkLine } from 'react-icons/ri'

export default function Page() {
    const [requestedBlood, setRequestedBlood] = useState([]);
    const { user } = useAuth()

    const fetchDonors = async () => {
        if (!user?._id) {
            console.error("User ID is undefined, cannot fetch requests.");
            return;
        }
        try {
            const response = await axios.get(`${serverUrl}api/request/v1/user/${user?._id}`);
            const fetchedRequests = response?.data?.data || [];
            console.log(fetchedRequests);
            setRequestedBlood(fetchedRequests);
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    const handleToggleReceived = async (id, isReceived) => {
        if (isReceived) return; // Prevent toggling if already received
        try {
          await axios.patch(`${serverUrl}api/request/v1/${id}`, { isReceived: true });
          alert("Marked as received!");
          fetchDonors(); // Refresh the list after updating
        } catch (error) {
          console.error("Error updating request:", error);
        }
      };

    useEffect(() => {
        fetchDonors();
    }, [user?._id]);

    console.log(requestedBlood)
    console.log(user?._id)

    return (
        <div>
            <div className="overflow-x-auto mt-10 border-2 border-gray-200 bg-white p-10">
                <div className="mb-4">
                    <h2 className="text-2xl mb-2">
                        Blood Request History: {requestedBlood?.length}
                    </h2>
                    <p>Below data shows how many times your requested blood.</p>
                </div>
                <div className="overflow-x-auto overflow-y-hidden">
                    <table className='table'>
                        <thead>
                            <tr>
                                <th className='border-b border-gray-300 px-0'></th>
                                <th className="border-b border-gray-300 px-4 py-2">Area</th>
                                <th className="border-b border-gray-300 px-4 py-2">Blood Group</th>
                                <th className="border-b border-gray-300 px-4 py-2">Disease</th>
                                <th className="border-b border-gray-300 px-4 py-2">District</th>
                                <th className="border-b border-gray-300 px-4 py-2">Upazila</th>
                                <th className="border-b border-gray-300 px-4 py-2">Extra Contact</th>
                                {/* <th className="border-b border-gray-300 px-4 py-2">Note</th> */}
                                <th className="border-b border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border-b border-gray-300 px-4 py-2">Required Date</th>
                                <th className="border-b border-gray-300 px-4 py-2">Created At</th>
                                <th className="border-b border-gray-300 pl-4 pr-0 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestedBlood.length > 0 ? (
                                requestedBlood.map((request) => (
                                    <tr key={request._id} className="hover:bg-gray-100">
                                        <td className='border-b whitespace-nowrap border-gray-300 px-0'>
                                            <Link href={`/blood-requests/${request._id}`} className='text-primary text-xl' target='_blank'>
                                                <RiExternalLinkLine />
                                            </Link>
                                        </td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.area}</td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.bloodGroup}</td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.disease}</td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.district}</td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.upazila}</td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.extraContact}</td>
                                        {/* <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.note}</td> */}
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">{request.quantity} bag</td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">
                                            {moment(request.requiredDate).format('MMMM Do YYYY')}
                                        </td>
                                        <td className="border-b whitespace-nowrap border-gray-300 px-4 py-2">
                                            {moment(request.createdAt).format('MMMM Do YYYY')}
                                        </td>
                                        <td className="border-b whitespace-nowrap border-gray-300 pl-4 pr-0 py-2">
                                            {request.isReceived ? (
                                                <span className="text-gray-500">Received</span>
                                            ) : (
                                                <button
                                                    onClick={() => handleToggleReceived(request._id, request.isReceived)}
                                                    className="bg-primary py-1 px-3 text-white font-semibold"
                                                >
                                                    Mark as Received
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        className="border-b border-gray-300 px-4 py-2 text-center"
                                        colSpan="10"
                                    >
                                        No requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
