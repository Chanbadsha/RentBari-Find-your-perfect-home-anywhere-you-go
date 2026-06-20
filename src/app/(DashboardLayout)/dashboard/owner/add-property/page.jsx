"use client";

import React, { useState } from "react";
import {
  CircleInfo,
  Sliders,
  Snowflake,
  ArrowUpRightFromSquare,
  Trash,
  Plus,
  Minus,
} from "@gravity-ui/icons";
import Image from "next/image";
import { FaWifi } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { TextField } from "@heroui/react";

// Extra visual-match icons for amenities and unique specifications
const PoolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12h19.5M2.25 12v6.75A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V12M2.25 12V6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25V12"
    />
  </svg>
);

const ParkingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 6h4a2.5 2.5 0 1 1 0 5h-4V6Zm0 0v11"
    />
  </svg>
);

const GymIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 9h16.5m-16.5 6h16.5M4.5 6v12M19.5 6v12M9 6v12M15 6v12"
    />
  </svg>
);

const KitchenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM5 19.5h14a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 19 7.5H5A1.5 1.5 0 0 0 3.5 9v9a1.5 1.5 0 0 0 1.5 1.5Z"
    />
  </svg>
);

const PetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5c1.5 0 2.5 1 2.5 2.5S13.5 9.5 12 9.5 9.5 8.5 9.5 7 10.5 4.5 12 4.5ZM6 9c1.2 0 2 .8 2 2s-.8 2-2 2-2-.8-2-2 .8-2 2-2Zm12 0c1.2 0 2 .8 2 2s-.8 2-2 2-2-.8-2-2 .8-2 2-2Z"
    />
  </svg>
);

export default function ListPropertyPage() {
  // Field States matching image_cd0ce3.png values
  // const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [location, setLocation] = useState("");
  const [rentPrice, setRentPrice] = useState("2500");
  const [rentType, setRentType] = useState("Monthly");
  const [size, setSize] = useState("1200");
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2.5);
  const [isFurnished, setIsFurnished] = useState(false);

  // Toggles for extra features
  const [instantBooking, setInstantBooking] = useState(true);
  const [securityDeposit, setSecurityDeposit] = useState(false);

  // Selected Amenities List
  const [amenities, setAmenities] = useState({
    WIFI: true,
    Pool: true,
    Parking: true,
    Gym: false,
    AirCon: true,
    Kitchen: true,
    PetFriendly: true,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // console.log(watch("example"));

  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full  min-h-screen bg-background text-foreground antialiased font-sans px-4 py-8 md:px-8 lg:px-16 selection:bg-[#0a5246]/10">
      <div className="w-full  mx-auto space-y-8">
        {/* TOP LEVEL ACTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              List New Property
            </h1>
            <p className="text-sm text-foreground/70 font-medium mt-1">
              Provide accurate details to attract the best tenants.
            </p>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <button className="px-4 py-2 text-xs font-bold text-foreground/80 bg-background hover:bg-gray-50 rounded-lg border border-foreground/30 transition-all">
              Discard Draft
            </button>
            <button className="px-5 py-2 bg-[#0a5246] hover:bg-[#073c33] text-white text-xs font-bold rounded-lg shadow-xs transition-all">
              List Property
            </button>
          </div>
        </div>

        {/* TWO-COLUMN GRID ARCHITECTURE */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {" "}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* LEFT COLUMN: PRIMARY FORMS BLOCK (Takes 2 span units) */}
            <div className="lg:col-span-2 space-y-6">
              {/* 1. BASIC INFORMATION BLOCK */}
              <div className="bg-background border border-gray-100/80 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-[#0a5246] font-bold text-base border-b border-foreground/20 pb-2">
                  <CircleInfo className="w-4 h-4" />
                  <h2>Basic Information</h2>
                </div>

                <div className="space-y-4">
                  <TextField className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Property Title
                    </label>
                    <input
                      {...register("propertyTitle")}
                      type="text"
                      placeholder="e.g., Luxury 3-Bedroom Apartment with City View"
                      className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-[#0a5246] focus:bg-background transition-all"
                    />
                  </TextField>

                  <TextField className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your property's unique features, neighborhood, and vibe..."
                      {...register("description")}
                      className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-[#0a5246] focus:bg-background transition-all resize-none"
                    />
                  </TextField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField className="space-y-1.5">
                      <label
                        htmlFor="propertyType"
                        className="text-xs font-bold text-foreground uppercase tracking-wide"
                      >
                        Property Type
                      </label>
                      <select
                        id="propertyType"
                        {...register("propertyType")}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0a5246] focus:bg-background transition-all appearance-none cursor-pointer"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Penthouse">Penthouse</option>
                      </select>
                    </TextField>

                    <TextField className="space-y-1.5">
                      <label
                        htmlFor="location"
                        className="text-xs font-bold text-foreground uppercase tracking-wide"
                      >
                        Location
                      </label>
                      <div className="relative">
                        <input
                          id="location"
                          type="text"
                          placeholder="Enter full address"
                          {...register("location")}
                          className="w-full text-sm font-medium text-foreground bg-background border border-foreground/30 rounded-xl pl-4 pr-10 py-3 placeholder-foreground/70 focus:outline-none focus:border-[#0a5246]  transition-all"
                        />
                      </div>
                    </TextField>
                  </div>
                </div>
              </div>

              {/* 2. SPECIFICATIONS & PRICING BLOCK */}
              <div className="bg-background border border-gray-100/80 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-[#0a5246] font-bold text-base border-b border-foreground/20 pb-2">
                  <Sliders className="w-4 h-4" />
                  <h2>Specifications & Pricing</h2>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Rent Price ($)
                      </label>
                      <input
                        type="number"
                        value={rentPrice}
                        onChange={(e) => setRentPrice(e.target.value)}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0a5246] focus:bg-background transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Rent Type
                      </label>
                      <select
                        value={rentType}
                        onChange={(e) => setRentType(e.target.value)}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0a5246] focus:bg-background transition-all cursor-pointer"
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Size (sqft)
                      </label>
                      <input
                        type="number"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0a5246] focus:bg-background transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-end gap-6 pt-2">
                    {/* Bed Counter */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Bedrooms
                      </label>
                      <div className="flex items-center bg-background border border-foreground/30 rounded-xl px-2 py-1 min-w-35 justify-between">
                        <button
                          type="button"
                          onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                          className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold px-3 text-gray-800">
                          {bedrooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBedrooms(bedrooms + 1)}
                          className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bath Counter */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        Bathrooms
                      </label>
                      <div className="flex items-center bg-background border border-foreground/30 rounded-xl px-2 py-1 min-w-35 justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setBathrooms(Math.max(1, bathrooms - 0.5))
                          }
                          className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm font-bold px-3 text-gray-800">
                          {bathrooms}
                        </span>
                        <button
                          type="button"
                          onClick={() => setBathrooms(bathrooms + 0.5)}
                          className="p-1.5 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Furnished Checkbox toggle */}
                    <label className="flex items-center gap-2 cursor-pointer pb-2 self-center sm:self-end select-none">
                      <input
                        type="checkbox"
                        checked={isFurnished}
                        onChange={(e) => setIsFurnished(e.target.checked)}
                        className="rounded border-gray-300 text-[#0a5246] focus:ring-[#0a5246]/40 w-4 h-4 accent-[#0a5246]"
                      />
                      <span className="text-sm font-semibold text-foreground/80">
                        Furnished
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 3. AMENITIES SELECTION BLOCK */}
              <div className="bg-background border border-gray-100/80 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0a5246] font-bold text-base border-b border-foreground/20 pb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Z"
                    />
                  </svg>
                  <h2>Amenities</h2>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {[
                    {
                      id: "WIFI",
                      label: "WIFI",
                      icon: <FaWifi className="w-4 h-4" />,
                    },
                    { id: "Pool", label: "Pool", icon: <PoolIcon /> },
                    { id: "Parking", label: "Parking", icon: <ParkingIcon /> },
                    { id: "Gym", label: "Gym", icon: <GymIcon /> },
                    {
                      id: "AirCon",
                      label: "Air Con",
                      icon: <Snowflake className="w-4 h-4" />,
                    },
                    { id: "Kitchen", label: "Kitchen", icon: <KitchenIcon /> },
                    {
                      id: "PetFriendly",
                      label: "Pet Friendly",
                      icon: <PetIcon />,
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAmenity(item.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all active:scale-98 ${
                        amenities[item.id]
                          ? "bg-[#0a5246]/5 text-[#0a5246] border-[#0a5246]/30 shadow-xs"
                          : "bg-background border-foreground/30 text-gray-500 hover:bg-gray-100/70"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}

                  {/* Custom Item addition block */}
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-dashed border-gray-300 text-gray-400 bg-transparent hover:bg-background transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Custom
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MEDIA UPLOADER & EXTRA FEATURES PANEL */}
            <div className="space-y-6">
              {/* 1. MEDIA/PHOTOS DISPLAY WRAPPER */}
              <div className="bg-background border border-gray-100/80 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <h3>Photos</h3>
                </div>

                {/* Master Upload Zone Box */}
                <div className="border border-dashed border-gray-300 bg-background/50 rounded-xl p-6 text-center cursor-pointer hover:bg-background transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mx-auto shadow-xs border border-gray-100 group-hover:scale-105 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="#0a5246"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0017.25 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </div>
                  <span className="block text-xs font-bold text-gray-700 mt-3">
                    Upload Cover Photo
                  </span>
                  <span className="block text-[10px] font-medium text-gray-400 mt-1">
                    PNG, JPG up to 10MB
                  </span>
                </div>

                {/* Upload Previews Carousel Array Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-foreground/30">
                    <Image
                      height={600}
                      width={600}
                      src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=150&q=80"
                      alt="living room draft"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-foreground/30">
                    <Image
                      height={600}
                      width={600}
                      src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=150&q=80"
                      alt="kitchen draft"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="aspect-square border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-background/50 hover:bg-background cursor-pointer transition-colors">
                    <Plus className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 2. EXTRA FEATURES SWITCHES MODULE */}
              <div className="bg-background border border-gray-100/80 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-4 h-4 text-emerald-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 21l8.982-11.849a3 3 0 00-4.065-4.065L4 14l5.813 1.904z"
                    />
                  </svg>
                  <h3>Extra Features</h3>
                </div>

                <div className="space-y-3">
                  {/* Switch Item 1: Instant Booking */}
                  <div className="flex items-start justify-between p-3 rounded-xl bg-background border border-gray-100 gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>{" "}
                        Instant Booking
                      </h4>
                      <p className="text-[11px] font-medium text-gray-400 leading-normal">
                        Allow guests to book without waiting for approval.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInstantBooking(!instantBooking)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none shrink-0 ${instantBooking ? "bg-[#0a5246]" : "bg-gray-200"}`}
                    >
                      <div
                        className={`bg-background w-4 h-4 rounded-full shadow-xs transform duration-200 ${instantBooking ? "translate-x-4" : "translate-x-0"}`}
                      />
                    </button>
                  </div>

                  {/* Switch Item 2: Security Deposit */}
                  <div className="flex items-start justify-between p-3 rounded-xl bg-background border border-gray-100 gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>{" "}
                        Security Deposit
                      </h4>
                      <p className="text-[11px] font-medium text-gray-400 leading-normal">
                        Require a refundable deposit for potential damages.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSecurityDeposit(!securityDeposit)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none shrink-0 ${securityDeposit ? "bg-[#0a5246]" : "bg-gray-200"}`}
                    >
                      <div
                        className={`bg-background w-4 h-4 rounded-full shadow-xs transform duration-200 ${securityDeposit ? "translate-x-4" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Pro Tip Indicator Notice Box */}
                <div className="bg-emerald-50/50 border border-emerald-500/10 rounded-xl p-3 text-left">
                  <span className="text-[9px] font-black text-emerald-800 tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
                    Pro Tip
                  </span>
                  <p className="text-[11px] font-medium text-emerald-700/90 mt-1.5 leading-relaxed">
                    Listings with high-quality photos and detailed descriptions
                    receive <strong className="font-bold">40% more</strong>{" "}
                    inquiries.
                  </p>
                </div>
              </div>

              {/* LOWER SUBMIT ACTION CALLOUT */}
              <div className="space-y-3 pt-2 text-center">
                <p className="text-[11px] text-gray-400 leading-normal font-medium px-2">
                  By listing your property, you agree to RentBari&apos;s{" "}
                  <a href="#" className="text-[#0a5246] underline font-bold">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#0a5246] underline font-bold">
                    Fair Housing Policy
                  </a>
                  .
                </p>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#0a5246] hover:bg-[#073c33] text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <span>List Property</span>
                  <ArrowUpRightFromSquare className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  className="text-xs font-bold text-gray-400 hover:text- transition-colors mx-auto block py-1"
                >
                  Save as Template
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
