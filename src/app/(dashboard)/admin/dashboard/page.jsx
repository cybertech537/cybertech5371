import { BiDonateBlood } from 'react-icons/bi';
import { GiHeartDrop } from 'react-icons/gi';
import { MdOutlineMap, MdOutlineBloodtype } from 'react-icons/md';
import { LuHeartHandshake } from "react-icons/lu";

export default function Dashboard() {
   return (
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Donors</span>
               <h3 className='text-2xl mt-2'>2500</h3>
            </div>
            <GiHeartDrop className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Recipients</span>
               <h3 className='text-2xl mt-2'>12000</h3>
            </div>
            <BiDonateBlood className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Districts</span>
               <h3 className='text-2xl mt-2'>64</h3>
            </div>
            <MdOutlineMap className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Blood Groups</span>
               <h3 className='text-2xl mt-2'>8</h3>
            </div>
            <MdOutlineBloodtype className='text-5xl text-primary' />
         </div>
         <div className="shadow-lg rounded bg-white p-4 flex justify-between items-center">
            <div className="">
               <span className='text-gray-400 font-semibold text-xl'>Donations Completed</span>
               <h3 className='text-2xl mt-2'>11,590</h3>
            </div>
            <LuHeartHandshake className='text-5xl text-primary' />
         </div>
      </div>
   );
}
