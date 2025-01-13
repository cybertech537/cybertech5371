'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const token = document.cookie
         .split('; ')
         .find((row) => row.startsWith('token='))
         ?.split('=')[1];

      if (token) {
         try {
            const decodedUser = jwtDecode(token);
            console.log(decodedUser);
            setUser(decodedUser);
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
   return context;
};
