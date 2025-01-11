import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

export const verifyToken = (token) => {
   if (typeof window !== 'undefined') {
      // Client-side: Decode without verification
      try {
         return jwtDecode(token);
      } catch (error) {
         console.error('Invalid token:', error);
         return null;
      }
   } else {
      // Server-side: Verify and decode
      try {
         return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
         console.error('Invalid token:', error);
         return null;
      }
   }
};
