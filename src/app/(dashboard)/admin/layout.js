
import Aside from "@/components/Dashboard/Aside";
import "../../globals.css";
// import AuthProvider from "@/services/AuthProvider";
import Navbar from "@/components/Dashboard/Navbar";

export const metadata = {
   title: "Donor Bridge",
   description: "Blood Donation Platform",
};

export default function AdminLayout({ children }) {
   return (
      <html lang="en">
         <body>
            {/* <AuthProvider> */}
               <div className="flex">
                  <Aside />
                  {/* Main Content */}
                  <main className="flex-1 p-5 bg-slate-100">
                     <Navbar />
                     {children}
                  </main>
               </div>
            {/* </AuthProvider> */}
         </body>
      </html>
   );
}

