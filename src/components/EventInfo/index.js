import React, { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../services/api";
import { useStateValue } from "../../services/StateProvider";
import "./EventInfo.css";
import Sidebar from "../../components/Sidebar";

import { Link } from "react-router-dom";
import Select from "react-select";
import Modal from "../../utils/modal";
const EventInfo = ({ history }) => {
  const [{ user, isSidebarOpen }, dispatch] = useStateValue();
  const [event, setEvent] = useState({});
  const [isSubscribed, setSubscribedStatus] = useState(false);
  const URL = window.location.pathname;
  const [openmodal, setModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const inputBlog = [
    { label: "Name", value: "John" },
    { label: "Surname", value: "Brahim" },
    { label: "Specialty", value: "Developer" },
    { label: "Address", value: "Chennai" },
  ];

  const options2 = [
    { value: "1", label: "Select" },
    { value: "2", label: "Male" },
    { value: "3", label: "Female" },
    { value: "4", label: "Other" },
  ];
  const options3 = [
    { value: "1", label: "Russia" },
    { value: "2", label: "Canada" },
    { value: "3", label: "China" },
    { value: "4", label: "India" },
  ];
  const options4 = [
    { value: "1", label: "Krasnodar" },
    { value: "2", label: "Tyumen" },
    { value: "3", label: "Chelyabinsk" },
    { value: "4", label: "Moscow" },
  ];
  const getEvents = async () => {
    //URL is -> /event/:eventId wher eventId is the id of the Event when a user clicks it
    const response = await api.get(URL);
    const event = response.data || [];
    console.log("event", event);
    setEvent(event);
    setSubscribedStatus(event.usersSubscribed.includes(user));
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  useEffect(() => {
    getEvents();
    // If at some point the user log outs we change the subscription status to false
    setSubscribedStatus(false);
    // eslint-disable-next-line
  }, []);
  console.log(openmodal, "openmodal");
  const handleSubscribeEvent = async () => {
    setModal(!openmodal);
    // if (!user) {
    //   return history.push("/login");
    // }
    // if (isSubscribed) {
    //   //The user is subscribed! Let's unsubscribe the user
    //   // Let's unsubscribe the user from the event on the backend
    //   const response = await api.post(
    //     `${event.id}/unsubscribe`,
    //     {},
    //     { headers: { user } }
    //   );
    //   response.data
    //     ? setSubscribedStatus(false)
    //     : alert("Could not unsubscribe, Ops!");
    // } else {
    //   // THe user is not subscribed let's add it into the event
    //   const response = await api.post(
    //     `/event/${URL}/register`,
    //     {},
    //     { headers: { user } }
    //   );
    //   if (response) {
    //     // The user is now subscribed
    //     setSubscribedStatus(true);
    //   } else {
    //     alert("Ops! Something went wrong!");
    //   }
    // }
  };

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
      />
      <Navbar toggle={() => dispatch({ type: "TOGGLE_SIDEBAR" })} />
      {/* <HeroSection/> */}
      <section id="event" className="container">
        <section class=" card-body ">
          <h2 class=" text-3xl pl-10 font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
            Event Profile
          </h2>
        </section>

        {event && (
          <section class="py-10 relative bg-gray-100 sm:py-16 lg:py-24">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div class="grid items-center grid-cols-1 gap-y-8 lg:grid-cols-2 gap-x-16 xl:gap-x-24">
                <div class="relative mb-12">
                  <img
                    class="w-full rounded-md"
                    src={event.thumbnail_url}
                    alt=""
                  />

                  <div class="absolute w-full max-w-xs px-4 -translate-x-1/2 sm:px-0 sm:max-w-sm left-1/2 -bottom-12">
                    <div class="overflow-hidden bg-white rounded">
                      <div class="px-10 py-6">
                        <div class="flex items-center">
                          <p class="flex-shrink-0 text-3xl font-bold text-blue-600 sm:text-4xl">
                            {event.price} ₹
                          </p>
                          <p class="pl-6 text-sm font-medium text-black sm:text-lg">
                            Price tag
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-center w-16 h-16 bg-white rounded-full">
                    <svg
                      class="w-8 h-8 text-orange-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h2 class="mt-10 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
                    {event.title}
                  </h2>
                  <p class="mt-6 text-lg leading-relaxed text-gray-600">
                    {event.description} Lorem ipsum dolor sit amet,
                    consecteturadipiscing elit. In nisl nulla, dapibus nec
                    antea,tincidunt efficitur tortor. Pellentesque
                    feugiatlaoreetnisi, quis fermentum diam volutpat
                    interdum.Suspendissepotenti. Pellentesque habitant morbi
                    tristiquesenectus etnetus et malesuada fames ac turpis
                    egestas. Sednonefficitur velit. Phasellus eget tortor
                    volutpat,egestasmetus ac, bibendum neque. Vivamus quis
                    interdumlectus.Donec mi sem, bibendum fringilla elementum
                    quis,scelerisquequis diam. Nullam euismod
                  </p>
                  {isModalOpen ? (
                    <></>
                  ) : (
                    <button
                      onClick={openModal}
                      className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 rounded-md mt-9 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                    >
                      Subscribe
                    </button>
                  )}

                  {/* {openmodal ? (
                    <button
                      className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 rounded-md mt-9 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                      onClick={() => setModal(!openmodal)}
                    >
                      {isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </button>
                  ) : (
                    <button
                      className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 rounded-md mt-9 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:opacity-80 focus:opacity-80"
                      onClick={() => setModal(!openmodal)}
                    >
                      {isSubscribed ? "Subscribe" : "Unsubscribe"}
                    </button>
                  )}{" "} */}
                </div>
              </div>
            </div>
          </section>

          // <div id="event" className="event">
          //   <img src={event.thumbnail_url} alt="Sport event illustration" />
          //   <div clas="event__description">
          //     <h3>{event.title}</h3>
          //     <p>{event.description}</p>
          //     <p className="event__details">
          //       <strong>$ {event.price}</strong>
          //       <span>{event.sport}</span>
          //     </p>
          //     <button className="btn primary" onClick={handleSubscribeEvent}>{isSubscribed ? "Unsubscribe" : "Subscribe" }</button>

          //   </div>
          // </div>
        )}
        {/* {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Modal Title"
          ></Modal>
        )} */}
      </section>
      <Footer />
    </>
  );
};

export default EventInfo;
