'use client'

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
// import { useRouter } from "next/navigation";
import { Router } from "next/router";

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = Router();


    useEffect(() => {
      const token = localStorage.getItem("agreeToken");
      const userDataString = localStorage.getItem("userData");
      const userData = userDataString ? JSON.parse(userDataString) : null;

      // console.log({token},{userData});
      if (token && userData && userData.role) {
        try {
          const decoded = jwt.decode(token);
          if (decoded && decoded.exp) {
            const isExpired = Date.now() >= decoded.exp * 1000;
            if (isExpired) {
              console.error("Token verification error:", err);
              localStorage.removeItem("agreeToken");
              localStorage.removeItem("userData");
              router.push("/login");
            }
          } else {
            console.log("No expiration claim in the token");
          }
          // jwt.verify(token, 'very_secret'); // Replace 'your-secret-key' with your actual secret key
          if (
            allowedRoles.length === 0 ||
            allowedRoles.includes(userData.role)
          ) {
            setIsAuthenticated(true);
          } else {
            router.push("/unauthorized");
          }
        } catch (err) {
          console.error("Token verification error:", err);
          localStorage.removeItem("agreeToken");
          localStorage.removeItem("userData");
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
    }, [router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
