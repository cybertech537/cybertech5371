'use client'
import { serverUrl } from '@/config/api'
import { useAuth } from '@/services/AuthProvider'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [requestedBlood, setRequestedBlood] = useState([]);
    const { user } = useAuth()

    const fetchDonors = async () => {
        if (!user?._id) {
            console.error("User ID is undefined, cannot fetch requests.");
            return;
        }
        try {
            const response = await axios.get(`${serverUrl}api/request/v1`);
            const fetchedRequests = response?.data?.data || [];
            console.log(fetchedRequests);
            setRequestedBlood(fetchedRequests);
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${serverUrl}api/request/v1/${id}`);
            if (response?.data?.success) {
                // Filter out the deleted request from the list
                setRequestedBlood((prevBloodRequests) =>
                    prevBloodRequests.filter((request) => request._id !== id)
                );
                alert('Request deleted successfully!');
                fetchDonors();
            } else {
                alert('Failed to delete the request');
            }
        } catch (error) {
            console.error('Error deleting request:', error);
            alert('Failed to delete the request');
        }
    };

    useEffect(() => {
        fetchDonors();
    }, [user?._id]);

    console.log(requestedBlood)
    console.log(user?._id)

    return (
        <div>
            <div className="mt-10 border-2 border-gray-200 bg-white p-10">
                <div className="mb-4">
                    <h2 className="text-2xl mb-2">
                        All Blood Request History: {requestedBlood?.length}
                    </h2>
                    <p>Below data shows how many times all requested blood.</p>
                </div>
                <div className='overflow-x-auto w-screen'>
                    <table className='table w-full'>
                        <thead>
                            <tr>
                                <th className="border-b border-gray-300 px-4 py-2">Area</th>
                                <th className="border-b border-gray-300 px-4 py-2">Blood Group</th>
                                <th className="border-b border-gray-300 px-4 py-2">Disease</th>
                                <th className="border-b border-gray-300 px-4 py-2">District</th>
                                <th className="border-b border-gray-300 px-4 py-2">Upazila</th>
                                <th className="border-b border-gray-300 px-4 py-2">Extra Contact</th>
                                <th className="border-b border-gray-300 px-4 py-2">Note</th>
                                <th className="border-b border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border-b border-gray-300 px-4 py-2">Required Date</th>
                                <th className="border-b border-gray-300 px-4 py-2">Created At</th>
                                <th className="border-b border-gray-300 px-4 py-2">Status</th>
                                <th className="border-b border-gray-300 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestedBlood.length > 0 ? (
                                requestedBlood.map((request) => (
                                    <tr key={request._id} className="hover:bg-gray-100">
                                        <td className="border-b border-gray-300 px-4 py-2">{request.area}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">{request.bloodGroup}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">{request.disease}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">{request.district}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">{request.upazila}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">{request.extraContact}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">{request.note}</td>
                                        <td className="border-b border-gray-300 px-4 py-2">{request.quantity} bag</td>
                                        <td className="border-b border-gray-300 px-4 py-2">
                                            {moment(request.requiredDate).format('MMMM Do YYYY')}
                                        </td>
                                        <td className="border-b border-gray-300 px-4 py-2">
                                            {moment(request.createdAt).format('MMMM Do YYYY')}
                                        </td>
                                        <td className="border-b border-gray-300 px-4 py-2">
                                            {request.isReceived ? (
                                                <span className="">Completed</span>
                                            ) : (
                                                <span className="">Pending</span>
                                            )}
                                        </td>
                                        <td className="border-b border-gray-300 px-4 py-2">
                                            <button onClick={() => handleDelete(request._id)} className='bg-red-500 text-white py-1 px-[6px]'>
                                                Delete
                                            </button>
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
