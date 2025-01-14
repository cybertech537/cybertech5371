'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const token = document.cookie
         .split('; ')
         .find((row) => row.startsWith('agreeToken='))
         ?.split('=')[1];
console.log(token)
      if (token) {
         try {
            fetch('http://localhost:5050/api/user/v1/me', {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }).then(res=>res.json())
             .then(data=>
               setUser(data?.details))
            // const decodedUser = jwtDecode(token);
            // console.log(decodedUser);
            // setUser(decodedUser);
         } catch (error) {
            console.error('Invalid token:', error);
         }
      }
   }, []);

   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   );
};``

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
   return context;
};
