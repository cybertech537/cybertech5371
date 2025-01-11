import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeaderTop from "@/components/HeaderTop";
// import { AuthProvider } from "@/services/AuthProvider";

export const metadata = {
  title: "Donor Bridge",
  description: "Blood Donation Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <AuthProvider> */}
          <HeaderTop />
          <Navbar />
            {children}
          <Footer />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
