import PageHero from '@/components/shared/PageHero';
import Image from 'next/image';

export default function AboutUs() {


   return (
      <>
         <div className="bg-gray-50 pb-14">
            <PageHero title='Terms and Conditions'/>

            <div className="container">
               <div className="-mt-16 relative z-10 border border-gray-300 bg-white rounded p-5 lg:p-10">
                  <div className="prose max-w-full">
                     <h2>Welcome to our Free Blood Donation Platform.</h2>

                     <h3>By registering and using our services, you agree to the following terms:</h3>

                     <h3>Dual Role as Donor and Recipient</h3>
                     <p>By registering, you acknowledge that you are joining a community where everyone is both a potential donor and a recipient.</p>
                     <ul>
                        <li>As a new donor, you may receive blood once only until you donate.</li>
                        <li>After donating blood at least once, you become eligible to request blood multiple times in the future.</li>
                     </ul>

                     <h3>Commitment to Helping Others</h3>
                     <p>This platform thrives on mutual support. By helping others, you ensure that help will be available when you need it. Together, we create a community of care and responsibility.</p>

                     <h3>Profile Update Requirement</h3>
                     <p>After registration, it is mandatory to complete and update your profile. This ensures that we can connect you with those in need and provide better service.</p>

                     <h3>Health and Safety</h3>
                     <p>By agreeing to donate blood, you confirm that you meet the health requirements for blood donation as per the applicable guidelines. Please consult a medical professional if you are unsure.</p>

                     <h3>Community Guidelines</h3>
                     <ul>
                        <li>Respect all members of the community.</li>
                        <li>Do not misuse the platform for any fraudulent or harmful activities.</li>
                        <li>Ensure all information provided during registration and profile updates is accurate and truthful.</li>
                     </ul>

                     <h3>Disclaimer</h3>
                     <p>This platform is a voluntary service. We do not guarantee the availability of blood at all times but strive to connect donors and recipients effectively.</p>
                     <p>By continuing with registration, you agree to these terms and conditions.</p>
                     
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
