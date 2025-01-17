'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import SocialLogin from '@/components/shared/SocialLogin';
import InputField from '@/components/shared/InputField';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ClientSignup() {

   const router = useRouter()

   const [otpSent, setOtpSent] = useState(false)
   const [timeLeft, setTimeLeft] = useState(60)
   const [phone, setPhone] = useState('')
   const [errorMsg, setErrorMsg] = useState('')
   const [successMsg, setSuccessMsg] = useState('')
   const [loading, setLoading] = useState(false)

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   // Countdown Timer
   useEffect(() => {
      if (otpSent && timeLeft > 0) {
         const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
         return () => clearInterval(timer);
      }
   }, [otpSent, timeLeft]);

   const SubmitHandler = async (data) => {
      setLoading(true)
      setErrorMsg('')
      setSuccessMsg('')
      try {
         const response = await fetch('http://localhost:5050/api/user/v1/registration', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         })

         const result = await response.json()

         if (response.ok) {
            setOtpSent(true)
            setPhone(data.phone)
            setSuccessMsg('OPT sent to your phone number. Please verify.')
         } else {
            toast.error(result.msg)
            setErrorMsg(result.msg || 'Registration failed. Please try again.');
         }

      } catch (error) {
         console.log(error.message)
      } finally {
         setLoading(false)
      }
   }

   const verifyOtpHandler = async (otp) => {
      setLoading(true)
      setSuccessMsg('')
      setErrorMsg('')
      try {
         const response = await fetch('http://localhost:5050/api/user/v1/verify', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone, otp })
         })

         const result = await response.json()

         if (response.ok) {
            setSuccessMsg('Verification successful! You can now log in.')
            toast.success('Verification successful! You can now log in.')
            router.push('/login')
         } else {
            setErrorMsg(result.msg || 'Ivalid OTP. Please try again.')
            toast.error(result.msg || 'Ivalid OTP. Please try again.')
         }
      } catch (error) {
         setErrorMsg('An error occurred. Please try again later.');
      } finally {
         setLoading(false)
      }
   }

   const resendOtpHandler = async (otp) => {
      setLoading(true)
      setSuccessMsg('')
      setErrorMsg('')
      try {
         const response = await fetch('http://localhost:5050/api/user/v1/resend', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone })
         })

         const result = await response.json()

         if (response.ok) {
            setTimeLeft(60)
            setSuccessMsg('OTP sent to your phone number.')
            toast.success('OTP sent to your phone number.')
         } else {
            setErrorMsg(result.msg || 'Ivalid OTP. Please try again.')
            toast.error(result.msg || 'Ivalid OTP. Please try again.')
         }
      } catch (error) {
         setErrorMsg('An error occurred. Please try again later.');
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="border border-gray-300 bg-white rounded-lg p-5 lg:p-10">
         <Toaster position="top-right" />
         {otpSent ? (
            <>
               <h1 className="text-3xl font-bold mb-5 text-center">Verify OTP</h1>
               {errorMsg && <div className="text-red-500 text-center mb-5">{errorMsg}</div>}
               {successMsg && <div className="text-green-500 text-center mb-5">{successMsg}</div>}
               <form
                  onSubmit={
                     (e) => {
                        e.preventDefault()
                        const otp = e.target.otp.value
                        verifyOtpHandler(otp)
                     }
                  }
                  className="space-y-5"
               >
                  <div className="form-group">
                     <label htmlFor="otp" className="block font-medium mb-1">
                        Enter OTP
                     </label>
                     <input
                        id="otp"
                        name="otp"
                        type="text"
                        placeholder="Enter the OTP sent to your phone"
                        {...register('otp', { required: 'OTP cannot be empty.' })}
                        className={`block w-full rounded border px-3 py-2 ${errors.otp ? 'border-red-500' : 'border-gray-300'
                           }`}
                     />
                     {errors.otp && (
                        <span className="text-red-500 text-sm">
                           {errors.otp.message}
                        </span>
                     )}
                  </div>

                  <button className="btn btn-primary w-full" type='submit' disabled={loading}>
                     {loading ? 'Verifying' : 'Verify OTP'}
                  </button>

               </form>
               <div className="text-center mt-5">
                  {timeLeft > 0 ? (
                     <p className="text-gray-500">
                        Resend OTP in <span className="font-bold">{timeLeft}s</span>
                     </p>
                  ) : (
                     <button
                        className="btn btn-secondary"
                        onClick={resendOtpHandler}
                        disabled={loading}
                     >
                        Resend OTP
                     </button>
                  )}
               </div>
            </>
         ) : (
            <>
               <h1 className="text-3xl font-bold mb-5 text-center">Sign Up</h1>
               {errorMsg && <div className="text-red-500 text-center mb-5">{errorMsg}</div>}
               {successMsg && <div className="text-green-500 text-center mb-5">{successMsg}</div>}
               <form onSubmit={handleSubmit(SubmitHandler)} className="space-y-5">
                  <InputField
                     name="name"
                     label="Full Name"
                     errors={errors}
                     register={register}
                     placeholder="Full Name"
                     validation={{ required: 'Name can not be empty.' }}
                  />

                  <InputField
                     name="email"
                     type="email"
                     label="Email"
                     errors={errors}
                     register={register}
                     placeholder="Enter email"
                  />

                  <InputField
                     name="phone"
                     label="Contact"
                     errors={errors}
                     register={register}
                     placeholder="01723-789454"
                     validation={{
                        required: 'Contact number can not be empty.',
                        pattern: {
                           value: /^(?:\+88|0088)?01[3-9]\d{8}$|^(?:\+88|0088)?0\d{8,10}$/,
                           message: 'Invalid contact number.',
                        },
                     }}
                  />

                  <InputField
                     name="password"
                     label="Password"
                     type="password"
                     errors={errors}
                     register={register}
                     validation={{
                        required: 'Password can not be empty.',
                        pattern: {
                           value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                           message: 'Password must be at least 8 characters long, include one letter, one number, and one special character.',
                        },
                     }}
                  />

                  <label className="text-base mt-5 flex items-center gap-1">
                     <input type="checkbox" name="" id="" />
                     <span>
                        I agree to <Link href={'/terms-and-conditions'} className='text-primary'>terms and conditions</Link>.
                     </span>
                  </label>

                  <button className="btn btn-primary w-full">Sign Up</button>

               </form>
               <div className="text-center text-gray-400 mt-10">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary hover:underline">
                     Login
                  </Link>
               </div>
            </>
         )}
      </div>
   );
}
