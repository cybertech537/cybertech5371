'use client'
import React, { useEffect, useState } from 'react'

export default function DateFormate({ item }) {

    const [formattedTimestamp, setFormattedTimestamp] = useState('');

    useEffect(() => {
        const convertTimestamp = () => {
            const timestamp = new Date(item?.date);
            const formatter = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });

            const formattedResult = formatter?.format(timestamp);
            setFormattedTimestamp(formattedResult);
        };

        convertTimestamp();
    }, [item?.date]);

  return (
    <div className='whitespace-nowrap'>
        {formattedTimestamp}
        </div>
  )
}
