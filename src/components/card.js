// components/CountryCard.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CountryCard({ country }) {
  const [time, setTime] = useState('');

  // Calculate and update the local time
  // useEffect(() => {
  //   const updateTime = () => {
  //     const now = new Date();
  //     const localTime = new Date(now.toLocaleDateString('en-US', { timeZone: country.timezones[0] }));
  //     setTime(localTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
  //   };
  //   updateTime();
  //   const timer = setInterval(updateTime, 60000); // Update every minute
  //   return () => clearInterval(timer);
  // }, [country]);

  return (
    <Link href={`/main/${country.cca2}`}>
    
    <div className="p-4 shadow rounded-lg border">
      <img src={country.flags.png} alt={`${country.name.common} flag`} className="w-16 h-10 mb-2" />
      <h3 className="text-lg font-semibold">{country.name.common}</h3>
      <p>{country.region}</p>
      {/* <p>Local Time: {time}</p> */}
    </div>
    </Link>
  );
}
