// pages/country/[code].js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CountryDetail() {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    const fetchCountry = async () => {
      if (!code) return;
      setLoading(true);
      try {
        const { data } = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError("Country data could not be retrieved.");
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return country ? (
    <div className="p-6">
      <img
        src={country.flags[0]}
        alt={`${country.name.common} flag`}
        className="w-32 h-20 mb-4"
      />
      <h1 className="text-3xl font-bold">{country.name.common}</h1>
      <p>
        <strong>Population:</strong> {country.population}
      </p>
      <p>
        <strong>Region:</strong> {country.region}
      </p>
      <p>
        <strong>Currency:</strong> {Object.keys(country.currencies).join(", ")}
      </p>
      <p>
        <strong>Languages:</strong>{" "}
        {Object.values(country.languages).join(", ")}
      </p>
    </div>
  ) : null;
}
