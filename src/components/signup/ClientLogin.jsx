'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import InputField from '@/components/shared/InputField';
import SocialLogin from '@/components/shared/SocialLogin';
import toast, { Toaster } from 'react-hot-toast';
// import { useAuth } from '@/services/AuthProvider';
import axios from 'axios';
// import { Router } from 'next/router';

export default function ClientLogin() {

   // const router = Router()

   // const { setUser } = useAuth();


   const [step, setStep] = useState('login');
   const [errorMsg, setErrorMsg] = useState('')
   const [successMsg, setSuccessMsg] = useState('')
   const [loading, setLoading] = useState(false)
   const [phone, setPhone] = useState('')

   const {
      register,
      handleSubmit,
      resetField,
      formState: { errors },
   } = useForm();

   const SubmitHandler = async (data) => {
      setLoading(true)
      setErrorMsg('')
      setSuccessMsg('')
      try {
         const response = await fetch('http://localhost:5050/api/user/v1/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         })

         const result = await response.json()

         if (response.ok) {
            setPhone(data.phone);
            setStep('otp');

            resetField('otp')

            toast.success('OTP sent to your phone!');
            setSuccessMsg('OTP sent to your phone!')
         } else {
            toast.error(result.msg)
            setErrorMsg(result.msg || 'Login failed. Please try again.');
         }

      } catch (error) {
         console.log(error.message)
      } finally {
         setLoading(false)
      }
   }

   const handleOtpVerification = async (data) => {
      setLoading(true);
      try {
         const response = await fetch('http://localhost:5050/api/user/v1/verify-login-otp', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, otp: data.otp }),
         });

         const result = await response.json();

         console.log('response: ', response)
         console.log('result: ', result)

         if (response.ok) {

            localStorage.setItem("agreeToken", result.token);
            const userResponse = await axios.get(`http://localhost:5050/api/user/v1/me`, {
               headers: {
                  Authorization: `Bearer ${result.token}`,
               },
            });

            if (userResponse.data.success) {
               // Store the user details in localStorage as a single object
               const userDetails = userResponse.data.details;


               localStorage.setItem("userData", JSON.stringify(userDetails));

            }

            toast.success('Successfully Logged in!');
            // router.push('/admin/dashboard')

         } else {
            toast.error(result.msg || 'OTP verification failed. Please try again.');
         }
      } catch (error) {
         console.error(error.message);
         toast.error('Something went wrong. Please try again.');
      } finally {
         setLoading(false);
      }
   };


   const resendOtp = async () => {
      setLoading(true);
      try {
         const response = await fetch('http://localhost:5050/api/user/v1/resend', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone }),
         });

         const result = await response.json();

         if (response.ok) {
            resetField('otp')
            toast.success('OTP resent successfully!');
         } else {
            toast.error(result.msg || 'Failed to resend OTP. Please try again.');
         }
      } catch (error) {
         console.error(error.message);
         toast.error('Something went wrong. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="border border-gray-300 bg-white rounded-lg p-5 lg:p-10">
         <Toaster position="top-right" />
         <h1 className="text-3xl font-bold mb-5 text-center">
            {step === 'login' ? 'Login' : 'Verify OTP'}
         </h1>

         {step === 'login' ? (
            <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-5">
               <InputField
                  name="phone"
                  type="number"
                  label="Contact Number"
                  errors={errors}
                  register={register}
                  placeholder="Enter Contact"
                  validation={{
                     required: 'This field cannot be empty.'
                  }}
               />

               <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder={'Enter Passowrd'}
                  errors={errors}
                  register={register}
                  validation={{
                     required: 'Password cannot be empty.',
                  }}
               />

               <button className="btn btn-primary w-full">
                  Login
                  {loading && <span className="loading loading-spinner loading-md"></span>}
               </button>

               <div className="text-center">Or Login with</div>

               <SocialLogin />
            </form>
         ) : (
            <form onSubmit={handleSubmit(handleOtpVerification)} className="space-y-5">
               <InputField
                  name="otp"
                  label="Enter OTP"
                  errors={errors}
                  register={register}
                  placeholder="Enter the OTP sent to your phone"
                  validation={{
                     required: 'OTP cannot be empty.',
                  }}
               />

               <button className="btn btn-primary w-full">
                  Verify OTP
                  {loading && <span className="loading loading-spinner loading-md"></span>}
               </button>

               <div className="text-center mt-4">
                  <button
                     type="button"
                     className="text-primary hover:underline"
                     onClick={resendOtp}
                     disabled={loading}
                  >
                     Resend OTP
                  </button>
               </div>
            </form>
         )}
         <div className="text-center text-gray-400 mt-10">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
               Sign Up
            </Link>
         </div>
      </div>
   );
}
