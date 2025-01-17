'use client'
import Loader from '@/components/loader/Loader';
import { serverUrl } from '@/config/api';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns';
import moment from 'moment';

export default function RecipientDetail() {

  const { id } = useParams() // Extracting the `id` from the URL
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Ensure `id` is available before fetching

    const fetchRequestData = async () => {
      try {
        const response = await axios.get(`${serverUrl}api/request/v1/${id}`);
        setRequest(response?.data?.data); // Adjust based on your API response format
        setLoading(false);
      } catch (err) {
        console.error('Error fetching request data:', err);
        setError('Failed to fetch request data.');
        setLoading(false);
      }
    };

    fetchRequestData();
  }, [id]);

  console.log(request)

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className='py-16 bg-slate-50'>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className='text-center mb-6 text-4xl'>Urgent Blood Needed</h1>
          <div className="border-2 border-gray-200 bg-white p-5 sm:p-10">
            <div className="flex flex-wrap gap-3 items-center">
              <Image src={'https://i.ibb.co.com/Sy3Y3sX/Jahid.jpg'} alt='profile' height={60} width={60} className='border-4 border-primary shadow-lg rounded-full object-cover' />
              <div className="flex-1">
                <p>
                  Requested by <span className='text-primary'>{request?.userId?.name}</span>
                </p>
                <p>{formatDistanceToNow(new Date(request?.createdAt), { addSuffix: true })}</p>
              </div>
            </div>
            <div className="text-lg mt-5">
              <p>{request?.note}</p>
            </div>
            <div className="text-lg grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-10">
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Contact
                </div>
                <div className="font-bold">
                  <Link href={`tel:${request?.userId?.phone}`}>{request?.userId?.phone}</Link>
                </div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Extra Contact
                </div>
                <div className="font-bold">
                  <Link href={`tel:${request?.extraContact}`}>{request?.extraContact}</Link>
                </div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Area
                </div>
                <div className="font-bold">
                {request?.upazila}, {request?.district}
                </div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Needed on
                </div>
                {/* requiredDate */}
                <div className="font-bold">{moment(request?.requiredDate).format('MMMM Do YYYY')}</div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Disease
                </div>
                <div className="font-bold">{request?.disease}</div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Quantity
                </div>
                <div className="font-bold">{request?.quantity} Bag</div>
              </div>
              <div className="py-3 border-t-2">
                <div className="uppercase text-gray-600 mb-2 text-base">
                  Blood Group
                </div>
                <div className="font-bold">{request?.bloodGroup}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
