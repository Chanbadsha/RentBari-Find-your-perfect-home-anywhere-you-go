"use client";

import { AddProperty } from "@/app/lib/action/action";
import { authClient } from "@/app/lib/auth-client";
import {
  ArrowUpRightFromSquare,
  CircleInfo,
  Minus,
  Plus,
  Sliders,
  Snowflake,
} from "@gravity-ui/icons";
import { TextField } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CgGym } from "react-icons/cg";
import { FaCat, FaWifi } from "react-icons/fa";
import { FaKitchenSet, FaSquareParking } from "react-icons/fa6";
import { MdPool } from "react-icons/md";

export default function ListPropertyPage() {
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [isFurnished, setIsFurnished] = useState(false);
  const [extraFeatures, setExtraFeatures] = useState([]);
  const [houseRules, setHouseRules] = useState([]);

  const [featureInput, setFeatureInput] = useState("");
  const [ruleInput, setRuleInput] = useState("");
  const [featureError, setFeatureError] = useState("");
  // Toggles for extra features
  const [instantBooking, setInstantBooking] = useState(true);
  const [securityDeposit, setSecurityDeposit] = useState(false);
  const [ruleError, setRuleError] = useState("");
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [addPropertyLoading, setAddPropertyLoading] = useState(false);

  const handleFileChange = async (e) => {
    try {
      setUploading(true);

      const file = e.target.files?.[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Image upload failed");
      }

      const uploadedImageUrl = data.data.url;

      setImageUrl(uploadedImageUrl);
      setPreview(uploadedImageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      toast("Failed to upload image. Please try again.", {
        icon: "❌",
      });
    } finally {
      setUploading(false);
    }
  };
  const addExtraFeature = () => {
    const value = featureInput.trim();

    if (!value) {
      setFeatureError("Please enter a feature");
      return;
    }

    setExtraFeatures((prev) => [...prev, value]);
    setFeatureInput("");
    setFeatureError("");
  };

  const removeExtraFeature = (index) => {
    setExtraFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const addHouseRule = () => {
    const value = ruleInput.trim();

    if (!value) {
      setRuleError("Please enter a house rule");
      return;
    }

    setHouseRules((prev) => [...prev, value]);
    setRuleInput("");
    setRuleError("");
  };

  const removeHouseRule = (index) => {
    setHouseRules((prev) => prev.filter((_, i) => i !== index));
  };

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
  const { data } = authClient.useSession();
  const user = data?.user;
  const toggleAmenity = (key) => {
    setAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setAddPropertyLoading(true);
      if (extraFeatures.length === 0) {
        setFeatureError("Please add at least one extra feature");
        return;
      }

      if (houseRules.length === 0) {
        setRuleError("Please add at least one house rule");
        return;
      }

      const property = {
        ...data,
        amenities,
        bedrooms,
        bathrooms,
        securityDeposit,
        instantBooking,
        isFurnished,
        extraFeatures,
        houseRules,
        coverImage: imageUrl,
        userId: user?.id,
      };

      const result = await AddProperty(property);

      if (!result?.success) {
        throw new Error(result?.message || "Failed to add property");
      }

      toast("Property added successfully.", {
        icon: "✅",
      });
    } catch (error) {
      console.error("Add Property Error:", error);

      toast(error.message || "Failed to add property. Please try again.", {
        icon: "❌",
      });
    } finally {
      setAddPropertyLoading(false);
    }
  };

  return (
    <div className="w-full selection:bg-blue-600 selection:text-white min-h-screen bg-background text-foreground antialiased font-sans px-4 py-8 md:px-8 lg:px-16 ">
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
              <div className="bg-background border border-foreground/30 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-[#0a5246] font-bold text-base border-b border-foreground/20 pb-2">
                  <CircleInfo className="w-4 h-4" />
                  <h2>Basic Information</h2>
                </div>

                <div className="space-y-4">
                  {/* Property Title */}
                  <TextField className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                      Property Title
                    </label>

                    <input
                      {...register("propertyTitle", {
                        required: "Property title is required",
                      })}
                      type="text"
                      placeholder="e.g., Luxury 3-Bedroom Apartment with City View"
                      className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0a5246]"
                    />

                    {errors.propertyTitle && (
                      <p role="alert" className="text-red-500 text-xs mt-1">
                        {errors.propertyTitle.message}
                      </p>
                    )}
                  </TextField>

                  {/* Description */}
                  <TextField className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                      Description
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Tell us about your property's unique features, neighborhood, and vibe..."
                      {...register("description", {
                        required: "Description is required",
                        minLength: {
                          value: 200,
                          message:
                            "Description must be at least 200 characters",
                        },
                      })}
                      className="w-full  text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-[#0a5246]"
                    />

                    {errors.description && (
                      <p role="alert" className="text-red-500 text-xs mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </TextField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Property Type */}
                    <TextField className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                        Property Type
                      </label>

                      <select
                        {...register("propertyType", {
                          required: "Property type is required",
                        })}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-3"
                      >
                        <option value="">Select type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Penthouse">Penthouse</option>
                      </select>

                      {errors.propertyType && (
                        <p role="alert" className="text-red-500 text-xs mt-1">
                          {errors.propertyType.message}
                        </p>
                      )}
                    </TextField>

                    {/* Location */}
                    <TextField className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                        Location
                      </label>

                      <input
                        {...register("location", {
                          required: "Location is required",
                        })}
                        type="text"
                        placeholder="Enter full address"
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-3"
                      />

                      {errors.location && (
                        <p role="alert" className="text-red-500 text-xs mt-1">
                          {errors.location.message}
                        </p>
                      )}
                    </TextField>
                  </div>
                </div>
              </div>

              {/* 2. SPECIFICATIONS & PRICING BLOCK */}
              <div className="bg-background border border-foreground/30 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2 text-[#0a5246] font-bold text-base border-b border-foreground/20 pb-2">
                  <Sliders className="w-4 h-4" />
                  <h2>Specifications & Pricing</h2>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Rent Price */}
                    <TextField className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                        Rent Price ($)
                      </label>

                      <input
                        type="number"
                        {...register("rentPrice", {
                          required: "Rent price is required",
                          min: {
                            value: 1,
                            message: "Rent price must be greater than 0",
                          },
                        })}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#0a5246]"
                      />

                      {errors.rentPrice && (
                        <p className="text-red-500 text-xs">
                          {errors.rentPrice.message}
                        </p>
                      )}
                    </TextField>

                    {/* Rent Type */}
                    <TextField className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                        Rent Type
                      </label>

                      <select
                        {...register("rentType", {
                          required: "Rent type is required",
                        })}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-2.5"
                      >
                        <option value="">Select type</option>
                        <option value="week">Weekly</option>
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                      </select>

                      {errors.rentType && (
                        <p className="text-red-500 text-xs">
                          {errors.rentType.message}
                        </p>
                      )}
                    </TextField>

                    {/* Flat Size */}
                    <TextField className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                        Size (sqft)
                      </label>

                      <input
                        type="number"
                        {...register("flatSize", {
                          required: "Size is required",
                          min: {
                            value: 100,
                            message: "Minimum size is 100 sqft",
                          },
                        })}
                        className="w-full text-sm font-medium bg-background border border-foreground/30 rounded-xl px-4 py-2.5"
                      />

                      {errors.flatSize && (
                        <p className="text-red-500 text-xs">
                          {errors.flatSize.message}
                        </p>
                      )}
                    </TextField>
                  </div>

                  <div className="flex flex-wrap items-end gap-6 pt-2">
                    {/* Bedrooms */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                        Bedrooms
                      </label>

                      <input
                        type="hidden"
                        {...register("bedrooms", {
                          required: true,
                          min: {
                            value: 1,
                            message: "At least 1 bedroom required",
                          },
                        })}
                        value={bedrooms}
                      />

                      <div className="flex items-center bg-background border border-foreground/30 rounded-xl px-2 py-1 min-w-35 justify-between">
                        <button
                          type="button"
                          onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                          className="p-1.5 text-foreground/70 hover:text-foreground transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-sm font-bold px-3">
                          {bedrooms}
                        </span>

                        <button
                          type="button"
                          onClick={() => setBedrooms(bedrooms + 1)}
                          className="p-1.5 text-foreground/70 hover:text-foreground/60 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {errors.bedrooms && (
                        <p className="text-red-500 text-xs">
                          {errors.bedrooms.message}
                        </p>
                      )}
                    </div>

                    {/* Bathrooms */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase tracking-wide">
                        Bathrooms
                      </label>

                      <input
                        type="hidden"
                        {...register("bathrooms", {
                          required: true,
                          min: {
                            value: 1,
                            message: "At least 1 bathroom required",
                          },
                        })}
                        value={bathrooms}
                      />

                      <div className="flex items-center bg-background border border-foreground/30 rounded-xl px-2 py-1 min-w-35 justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setBathrooms(Math.max(1, bathrooms - 1))
                          }
                          className="p-1.5 text-foreground/70 hover:text-foreground/60 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-sm font-bold px-3">
                          {bathrooms}
                        </span>

                        <button
                          type="button"
                          onClick={() => setBathrooms(bathrooms + 1)}
                          className="p-1.5 text-foreground/70 hover:text-foreground/60 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {errors.bathrooms && (
                        <p className="text-red-500 text-xs">
                          {errors.bathrooms.message}
                        </p>
                      )}
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
              <div className="bg-background border border-foreground/30 rounded-2xl p-6 shadow-xs space-y-4">
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
                    { id: "Pool", label: "Pool", icon: <MdPool /> },
                    {
                      id: "Parking",
                      label: "Parking",
                      icon: <FaSquareParking />,
                    },
                    { id: "Gym", label: "Gym", icon: <CgGym /> },
                    {
                      id: "AirCon",
                      label: "Air Con",
                      icon: <Snowflake className="w-4 h-4" />,
                    },
                    { id: "Kitchen", label: "Kitchen", icon: <FaKitchenSet /> },
                    {
                      id: "PetFriendly",
                      label: "Pet Friendly",
                      icon: <FaCat />,
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleAmenity(item.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all active:scale-98 ${
                        amenities[item.id]
                          ? "bg-[#0a5246]/5 text-[#0a5246] border-[#0a5246]/30 shadow-xs"
                          : "bg-background border-foreground/30 text-foreground/70 hover:bg-gray-100/70"
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

              {/* 4. EXTRA FEATURES LIST (ARRAY) */}
              <div className="bg-background border border-foreground/30 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0a5246] font-bold text-base border-b border-foreground/20 pb-2">
                  <Plus className="w-4 h-4" />
                  <h2>Extra Features</h2>
                </div>

                <div className="space-y-2">
                  {/* Input Row */}
                  <div className="flex gap-2 items-stretch">
                    <input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      placeholder="e.g. Rooftop access, Balcony view"
                      className="flex-1 text-sm border border-foreground/30 rounded-xl px-4 py-2
                 focus:outline-none focus:border-[#0a5246] focus:ring-2 focus:ring-[#0a5246]/10"
                    />

                    <button
                      type="button"
                      onClick={addExtraFeature}
                      disabled={!featureInput.trim()}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
        flex items-center justify-center
        ${
          featureInput.trim()
            ? "bg-[#0a5246] text-white hover:bg-[#073c33]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
                    >
                      Add
                    </button>
                  </div>

                  {/* Error Message */}
                  {featureError && (
                    <p className="text-xs text-red-500 font-medium pl-1">
                      {featureError}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {extraFeatures.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full border border-foreground/30 flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeExtraFeature(idx)}
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. HOUSE RULES (ARRAY) */}
              <div className="bg-background border border-foreground/30 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0a5246] font-bold text-base border-b border-foreground/20 pb-2">
                  <CircleInfo className="w-4 h-4" />
                  <h2>House Rules</h2>
                </div>

                <div className="space-y-2">
                  {/* Input Row */}
                  <div className="flex gap-2 items-stretch">
                    <input
                      value={ruleInput}
                      onChange={(e) => setRuleInput(e.target.value)}
                      placeholder="e.g. No smoking, No loud music after 10PM"
                      className="flex-1 text-sm border border-foreground/30 rounded-xl px-4 py-2 
                 focus:outline-none focus:border-[#0a5246] focus:ring-2 focus:ring-[#0a5246]/10"
                    />

                    <button
                      type="button"
                      onClick={addHouseRule}
                      disabled={!ruleInput.trim()}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200
        flex items-center justify-center
        ${
          ruleInput.trim()
            ? "bg-[#0a5246] text-white hover:bg-[#073c33]"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
                    >
                      Add
                    </button>
                  </div>

                  {/* Error Message */}
                  {ruleError && (
                    <p className="text-xs text-red-500 font-medium pl-1">
                      {ruleError}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {houseRules.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full border border-foreground/30 flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeHouseRule(idx)}
                        className="text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: MEDIA UPLOADER & EXTRA FEATURES PANEL */}
            <div className="space-y-6">
              {/* 1. MEDIA/PHOTOS DISPLAY WRAPPER */}
              <div className="bg-background border border-foreground/30 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 font-bold text-foreground/60 text-sm">
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

                {uploading ? (
                  <div className="border border-dashed border-gray-300 bg-background/50 rounded-xl p-6 flex flex-col items-center justify-center h-48">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

                    <p className="mt-4 text-sm font-semibold text-foreground">
                      Uploading Image...
                    </p>

                    <p className="text-xs text-foreground/60 mt-1">
                      Please wait a moment
                    </p>
                  </div>
                ) : preview ? (
                  <div className="relative h-48 rounded-xl overflow-hidden border">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <label className="border border-dashed border-gray-300 bg-background/50 rounded-xl p-6 text-center cursor-pointer hover:bg-background transition-colors group block">
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

                    <input
                      {...register("coverImage", {
                        required: "Cover image is required",
                      })}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {errors.coverImage && (
                      <p role="alert" className="text-red-500 text-xs mt-1">
                        {errors.coverImage.message}
                      </p>
                    )}
                  </label>
                )}

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
              <div className="bg-background border border-foreground/30 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 font-bold text-foreground/60 text-sm">
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
                      <h4 className="text-xs font-bold text-foreground/60 flex items-center gap-1">
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
                      <h4 className="text-xs font-bold text-foreground/60 flex items-center gap-1">
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
                <div className="bg-background border border-emerald-500/10 rounded-xl p-3 text-left">
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
                  disabled={addPropertyLoading}
                  className="
    w-full py-3.5
    bg-[#0a5246] hover:bg-[#073c33]
    disabled:opacity-70 disabled:cursor-not-allowed
    text-white text-sm font-bold
    rounded-xl shadow-md
    transition-all active:scale-[0.99]
    flex items-center justify-center gap-2
  "
                >
                  {addPropertyLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Listing Property...</span>
                    </>
                  ) : (
                    <>
                      <span>List Property</span>
                      <ArrowUpRightFromSquare className="w-3.5 h-3.5" />
                    </>
                  )}
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
