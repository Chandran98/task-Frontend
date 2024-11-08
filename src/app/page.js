"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryCard from "../components/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllcountry } from "../redux/service";

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  const [page, setPage] = useState(1);
  const options = [
    { value: "", label: "All Regions" },
{ value: "Africa", label: "Africa" },
{ value: "Americas", label: "Americas" },
{ value: "Asia", label: "Asia" },
{ value: "Europe", label: "Europe" },
{ value: "Oceania", label: "Oceania" },
];
  const dispatch = useDispatch();
  const { allCountryData, loading ,error } = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(getAllcountry());
  }, [dispatch]);

  useEffect(() => {
    if (allCountryData) {
      setCountries(allCountryData);
      setFilteredCountries(allCountryData);
    }
  }, [allCountryData]);

  useEffect(() => {
    let filtered = countries;

    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    setFilteredCountries(filtered.slice(0, page * 10)); 
  }, [searchQuery, region, countries, page]);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black ">Country List</h1>
    <div className=" flex gap-5">

    <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border text-black rounded-lg p-2 mb-4 w-full"
      />
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="border text-black rounded-lg p-2 mb-4 w-1/2"
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
     
  
    </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading &&  <p className="pl-6 text-sm font-bold text-center text-black sm:text-lg">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country, i) => (
          <CountryCard key={i} country={country} />
        ))}
      </div>

      {filteredCountries.length > 0 && !loading && (
        <button
          onClick={loadMore}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}
