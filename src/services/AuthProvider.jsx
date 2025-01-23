'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { serverUrl } from '@/config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {

   }, []);

   const fetchUserData = async () => {
      const token = document.cookie
         .split('; ')
         .find((row) => row.startsWith('agreeToken='))
         ?.split('=')[1];
      console.log(token)
      if (token) {
         try {
            fetch(`${serverUrl}api/user/v1/me`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }).then(res => res.json())
               .then(data =>
                  setUser(data?.details))
            // const decodedUser = jwtDecode(token);
            // console.log(decodedUser);
            // setUser(decodedUser);
         } catch (error) {
            console.error('Invalid token:', error);
         }
         finally{
            setLoading(false)
         }
      }
   };

   // Call fetchUserData on component mount
   useEffect(() => {
      fetchUserData();
   }, []);

   const refetchUser = () => fetchUserData();

   return (
      <AuthContext.Provider value={{ user, loading, setUser, refetchUser }}>
         {children}
      </AuthContext.Provider>
   );
}; ``

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};
