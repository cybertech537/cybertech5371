import React from 'react';
import loaderImg from '../../../public/img/loaderImg.gif'
import Image from 'next/image';

const Loader = () => {
    return (
        <div className='flex justify-center items-center'>

        <Image className='mx-auto' src={loaderImg} alt='loading image'/>
        </div>
    );
};

export default Loader;