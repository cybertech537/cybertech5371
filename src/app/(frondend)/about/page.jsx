import PageHero from '@/components/shared/PageHero';
import Image from 'next/image';

export default function AboutUs() {


   return (
      <>
         <div className="bg-gray-50 pb-14">
            <PageHero title='About Us'
               description='Know more about us' />

            <div className="container">
               <div className="-mt-16 relative z-10 border border-gray-300 bg-white rounded p-5 lg:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                     <div className="space-y-5">
                        <h2 className='text-5xl'>Who We Are</h2>
                        <h3 className='text-2xl'>We are here not for income, but for outcome</h3>
                        <p className='text-lg'>Donor Bridge is an automated blood service that connects blood searchers with voluntary donors in a moment through SMS. It is always a free service for all.</p>
                     </div>
                     <div className="">
                        <Image src={`/img/about.jpg`} height={500} width={650} alt='about' className='' />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="py-16">
            <div className="container">
               <div className="">
                  <h2 className='text-4xl mb-5'>Why Join Us?</h2>
                  <div className="prose  max-w-full">
                     <h2>Joining our Free Blood Donation Platform means becoming part of a community dedicated to saving lives.</h2>
                     <h2>Here is why you should join</h2>
                     <h3>Be a Lifesaver</h3>
                     <p>Every drop of blood you donate can save a life. Your contribution ensures that someone in need gets a second chance at life.</p>

                     <h3>Access to Support When You Need It</h3>
                     <p>As a member of our community, you can rely on others to support you in times of need. Your first donation opens the door to a network of helpers.</p>

                     <h3>Promote Mutual Care</h3>
                     <p>Our platform is built on the principle of mutual aid: "Help others, and others will help you." Together, we create a safety net for everyone.</p>

                     <h3>Convenient and Transparent</h3>
                     <p>Our system makes it easy to connect donors with recipients. Clear guidelines and an efficient process ensure a seamless experience.</p>

                     <h3>Make a Difference</h3>
                     <p>By joining, you become part of a movement that values humanity and compassion. Your small act of kindness can create a ripple effect of goodwill.</p>

                     <p>Join us today and be a part of a life-changing community. Together, we are stronger.</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
