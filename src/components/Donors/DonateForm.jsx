'use client'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { serverUrl } from '@/config/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/services/AuthProvider';
import Swal from 'sweetalert2';

const DonateForm = ({ setIsOpen }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Render nothing on the server

    return <DonateFormContent setIsOpen={setIsOpen} />;
};

const DonateFormContent = ({ setIsOpen }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const { user, refetchUser } = useAuth();

    const fetchDonors = async () => {
        try {
            const response = await axios.get(`${serverUrl}api/user/v1/all`);
            const fetchedDonors = response?.data?.details?.data || [];
            setUsers(fetchedDonors);
        } catch (error) {
            console.error('Error fetching donors:', error);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    const handleInputChange = (value) => {
        if (value.trim() === '') {
            setSuggestions([]);
        } else {
            const filteredUsers = users.filter((user) =>
                user?.phone.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredUsers);
        }
        setValue('recipientNumber', value);
        setSelectedUserId(null);
    };

    const handleSuggestionClick = (user) => {
        setValue('recipientNumber', user?.phone);
        setSelectedUserId(user._id);
        setSuggestions([]);
    };

    const onSubmit = async (data) => {
        const formData = {
            ...data,
            donorId: user?._id,
            recipientId: selectedUserId,
        };
        console.log('Form Data:', formData);

        const token = localStorage.getItem("agreeToken");

        if (!token) {
            console.error("No token found in local storage.");
            return;
        }

        try {
            const response = await fetch(`${serverUrl}api/user/v1/updateDonor`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include token if required
                },
            });

            if (response.ok) {
                refetchUser()
                setIsOpen(false)
                // const result = await response.json();
                // // refetchUser()
                // console.log(result)
                Swal.fire({
                    title: "You donate successfully",
                    icon: "success",
                    draggable: true
                });
                toast.success('Save your changes');
                // window.location.href = '/admin/profile'
            } else {
                setIsOpen(false)
                const { msg } = await response.json(); // Destructure the `msg` field
                console.log(msg);
                // toast.error("msg");
                Swal.fire({
                    icon: "error",
                    title: "Sorry...",
                    text: (msg),
                });
            }
        } catch (error) {
            toast.error('something was wrong');
            console.error("Error updating profile:", error);
        }

    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Donation Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-4 relative">
                    <label htmlFor="recipientNumber" className="block text-sm font-medium mb-2">
                        Recipient Number
                    </label>
                    <input
                        id="recipientNumber"
                        type="text"
                        {...register('recipientNumber', { required: 'Recipient number is required' })}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors.recipientNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.recipientNumber && (
                        <span className="text-red-500 text-sm">{errors.recipientNumber.message}</span>
                    )}
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-y-auto">
                            {suggestions.map((user) => (
                                <li
                                    key={user._id}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSuggestionClick(user)}
                                >
                                    {user?.phone}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Disease */}
                <div className="mb-4">
                    <label htmlFor="disease" className="block text-sm font-medium mb-2">Disease</label>
                    <input
                        id="disease"
                        type="text"
                        {...register("disease", { required: "Disease is required" })}
                        className={`w-full px-3 py-2 border rounded ${errors.disease ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.disease && (
                        <span className="text-red-500 text-sm">{errors.disease.message}</span>
                    )}
                </div>
                {/* Area */}
                <div className="mb-4">
                    <label htmlFor="area" className="block text-sm font-medium mb-2">Area</label>
                    <input
                        id="area"
                        type="text"
                        {...register("area", { required: "Area is required" })}
                        className={`w-full px-3 py-2 border rounded ${errors.area ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.area && (
                        <span className="text-red-500 text-sm">{errors.area.message}</span>
                    )}
                </div>

                {/* Donation Date */}
                <div className="mb-4">
                    <label htmlFor="donationDate" className="block text-sm font-medium mb-2">Donation Date</label>
                    <input
                        id="donationDate"
                        type="date"
                        {...register("donationDate", { 
                            required: "Donation Date is required", 
                            validate: (value) => {
                                const selectedDate = new Date(value);
                                const today = new Date();

                                // Set both dates to midnight so time part is ignored
                                selectedDate.setHours(0, 0, 0, 0);
                                today.setHours(0, 0, 0, 0);

                                // Ensure selected date is not in the future
                                return selectedDate <= today || "Donation date cannot be in the future";
                            }
                        })}
                        className={`w-full px-3 py-2 border rounded ${errors.donationDate ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.donationDate && (
                        <span className="text-red-500 text-sm">{errors.donationDate.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default DonateForm;
