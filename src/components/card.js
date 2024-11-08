// components/CountryCard.js
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CountryCard({ country }) {
  return (
    <Link href={`/${country.code.toLowerCase()}`}>
      <div className="p-4 shadow text-black rounded-lg border">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-16 h-10 mb-2"
        />
        <h3 className="text-lg font-semibold">{country.name}</h3>
        <p>{country.region}</p>
        <p>currency: {country.currency}</p>
      </div>
    </Link>
  );
}
