"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryCard from '../../components/card';
import Link from 'next/link';

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCountries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
      console.log('daa',data.da);
      setCountries(data);
      setFilteredCountries(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load countries.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  // Handle search and region filtering
  useEffect(() => {
    let filtered = countries;

    if (searchQuery) {
      filtered = filtered.filter(country =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter(country => country.region === region);
    }

    setFilteredCountries(filtered.slice(0, page * 10)); // Display batches of 10
  }, [searchQuery, region, countries, page]);

  const loadMore = () => setPage(prevPage => prevPage + 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Country List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="border rounded-lg p-2 mb-4 w-full"
      />
      <select
        value={region}
        onChange={e => setRegion(e.target.value)}
        className="border rounded-lg p-2 mb-4 w-full"
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
{filteredCountries.map((country,i) => (
          <CountryCard key={i} country={country} />
          // <div key={i}>{country.region}</div>
        ))} 
        
      </div>

      {filteredCountries.length > 0 && !loading && (
        <button onClick={loadMore} className="mt-4 p-2 bg-blue-500 text-white rounded">
          Load More
        </button>
      )}
    </div>
  );
}
