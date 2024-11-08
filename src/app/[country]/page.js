"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getcountryByCode } from "@/redux/service";
const EventInfo = () => {
  const [cdata, setData] = useState(null);

  const params = useParams();

  const dispatch = useDispatch();
  const { singleCountryData, loading, error } = useSelector(
    (state) => state.country
  );

  useEffect(() => {
    dispatch(getcountryByCode(params.country));
  }, [dispatch]);

  useEffect(() => {
    if (singleCountryData) {
      setData(singleCountryData);
    }
  }, [singleCountryData]);

  return (
    <>
      <section className=" flex  card-body m-8 flex-col items-center  gap-6">
        <div className=" flex gap-4 mb-10 items-start justify-start">
          {cdata && (
            <>
              <h2 className=" text-3xl pl-10 font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                {cdata[0].name.common}
              </h2>
              <img
                className="w-20 h-14 rounded-md"
                src={cdata[0].flags.png}
                alt=""
              />
            </>
          )}
          {loading && (
            <p className="pl-6 text-sm font-bold text-center text-black sm:text-lg">
              Loading...
            </p>
          )}
        </div>
        {cdata && (
          <div className="py-10 relative items-center justify-center bg-gray-100 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              {
                <div className="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 gap-x-16 xl:gap-x-24">
                  <div className="relative mb-12">
                    <img
                      className="w-full rounded-md"
                      src={
                        "https://explore-cayman.imgix.net/images/cayman-kai-aerial.jpg?auto=format&crop=focalpoint&domain=explore-cayman.imgix.net&fit=crop&fp-x=0.5&fp-y=0.5&h=1332&ixlib=php-3.3.1&q=82&usm=20&w=2000"
                      }
                      alt=""
                    />

                    <div className="absolute w-full max-w-xs px-4 -translate-x-1/2 sm:px-0 sm:max-w-sm left-1/2 -bottom-12">
                      <div className="overflow-hidden bg-white rounded">
                        <div className="px-10 py-6">
                          <div className="flex items-center justify-center">
                            <p className="pl-6 text-sm font-bold text-center text-black sm:text-lg">
                              {cdata[0].name.official}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      Official Name : {cdata[0].name.official}
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      Capital : {cdata[0].capital[0]}
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      Region : {cdata[0].region}
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      languages : {cdata[0].languages.eng}
                    </p>{" "}
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      population : {cdata[0].population}
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      currenci :{" "}
                      {cdata[0].currencies
                        ? Object.keys(cdata[0].currencies).join(", ")
                        : "N/A"}
                    </p>
                    <p className="mt-6 text-lg leading-relaxed text-gray-600">
                      TimeZone : {cdata[0].timezones}
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>
        )}
      
      </section>
    </>
  );
};

export default EventInfo;
