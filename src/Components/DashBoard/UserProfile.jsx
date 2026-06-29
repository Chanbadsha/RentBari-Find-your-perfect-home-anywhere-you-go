"use client";
import React, { useState } from "react";
import { Card, Input } from "@heroui/react";
import { FiCamera, FiCheckCircle, FiSave } from "react-icons/fi";
import Image from "next/image";

import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProfileSettings({ user }) {
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
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
  const onSubmit = async (data) => {
    try {
      setUpdateUserLoading(true);

      const { data: updatedUser, error } = await authClient.updateUser({
        name: data.name,
        image: imageUrl || user?.image,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile");
      }

      toast.success("Profile updated successfully");

      router.refresh();
    } catch (error) {
      console.error("Update User Error:", error);

      toast.error(
        error.message || "Failed to update profile. Please try again.",
      );
    } finally {
      setUpdateUserLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-background p-6 md:p-8 font-sans antialiased text-foreground">
      {/* Title Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Profile Settings
        </h1>
        <p className="text-foreground/70 text-sm mt-1">
          Manage your personal information and account security.
        </p>
      </div>

      {/* Main Two-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Profile Preview Card */}
        <Card className="border border-foreground/30 bg-background rounded-2xl p-6 shadow-sm text-center">
          <Card.Content className="p-0 flex flex-col items-center">
            {/* Avatar Image Container with Camera Overlay */}
            <div className="relative w-28 h-28 mb-4">
              <Image
                width={600}
                height={600}
                src={ValidImgUrl(user?.image)}
                alt={user?.name || "Profile"}
                className="w-full h-full object-cover rounded-full border border-foreground/30"
              />
              <button className="absolute bottom-1 right-1 bg-[#00523A] text-white p-2 rounded-full shadow-md hover:bg-[#00402e] transition-colors">
                <FiCamera size={14} />
              </button>
            </div>

            <Card.Title className="text-lg font-bold text-foreground leading-tight">
              {user?.name}
            </Card.Title>
            <Card.Description className="text-xs text-foreground/70 mt-1">
              {user?.email}
            </Card.Description>

            {/* Role Badge */}
            <span className="mt-3 capitalize inline-block px-4 py-1 bg-[#F9A825] text-white text-xs font-bold rounded-full shadow-sm">
              {user?.userRole}
            </span>

            {/* Profile Meta Details */}
            <div className="w-full mt-6 pt-6 border-t border-foreground/30 text-xs text-left space-y-3 font-medium">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Member since
                  </span>

                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                    {user?.createdAt &&
                      new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">
                  Identity status
                </span>

                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <FiCheckCircle className="text-emerald-600 dark:text-emerald-400" />
                  Verified
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Right Side: Form & Preferences Stack */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Form Card */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Personal Information
              </h2>
              <p className="text-sm text-foreground/60 mt-1">
                Update your account information and profile picture.
              </p>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-2">
                  Full Name
                </label>

                <Input
                  {...register("name", {
                    required: "Full name is required",
                  })}
                  defaultValue={user?.name}
                  placeholder="Enter your full name"
                  className="h-12 rounded-xl border border-foreground/20 w-full bg-background px-4 text-sm shadow-sm focus:ring-2 focus:ring-[#00523A]/20"
                />

                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-foreground/70 mb-2">
                  Email Address
                </label>

                <Input
                  {...register("email")}
                  defaultValue={user?.email}
                  readOnly
                  className="h-12 rounded-xl w-full border border-foreground/20 bg-foreground/5 px-4 text-sm"
                />
              </div>

              {/* Profile Photo */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-foreground/70 mb-3">
                  Profile Photo
                </label>

                <div className="flex flex-col md:flex-row items-center gap-6 p-5 border border-foreground/20 rounded-2xl bg-background">
                  {/* Avatar */}
                  <div className="relative">
                    {uploading ? (
                      <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    ) : (
                      <Image
                        src={preview || user?.image || "/avatar.png"}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-24 h-24 rounded-full object-cover border-4 border-background shadow-lg"
                      />
                    )}
                  </div>

                  {/* Upload */}
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-2.5 rounded-xl cursor-pointer transition-colors">
                      Upload New Photo
                      <input
                        {...register("image")}
                        type="file"
                        hidden
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleFileChange}
                      />
                    </label>

                    <p className="text-xs text-foreground/60 mt-3">
                      Recommended: JPG or PNG. Maximum size 10MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-foreground/70 mb-2">
                  Bio
                </label>

                <textarea
                  {...register("bio")}
                  rows={5}
                  defaultValue={user?.bio || ""}
                  placeholder="Tell others about yourself..."
                  className="w-full rounded-xl border border-foreground/20 bg-background px-4 py-3 text-sm shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00523A]/20"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="pt-5 border-t border-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                {user?.updatedAt && (
                  <p className="text-xs text-foreground/50">
                    Last updated{" "}
                    <span className="font-semibold text-foreground/70">
                      {new Date(user.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={updateUserLoading || uploading}
                className="flex items-center justify-center gap-2 min-w-[170px] px-6 py-3 rounded-xl bg-[#00523A] hover:bg-[#00402e] disabled:opacity-60 text-white font-semibold shadow-md transition-all"
              >
                {updateUserLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Preferences Section Card */}
          <Card className="border border-foreground/30 bg-background rounded-2xl p-6 shadow-sm">
            <Card.Header className="p-0 pb-4 border-b border-foreground/30">
              <Card.Title className="text-lg font-bold text-foreground">
                Preferences
              </Card.Title>
            </Card.Header>

            <Card.Content className="p-0 divide-y divide-slate-100">
              {/* Toggle 1 */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Email Notifications
                  </h4>
                  <p className="text-xs text-foreground/70 mt-0.5">
                    Receive alerts about new bookings and messages
                  </p>
                </div>
                {/* Active Toggle Switch */}
                <button className="w-11 h-6 bg-[#00523A] rounded-full p-0.5 transition-colors relative duration-200 shrink-0">
                  <span className="block w-5 h-5 bg-background rounded-full shadow-sm translate-x-5 transition-transform duration-200" />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Marketing Emails
                  </h4>
                  <p className="text-xs text-foreground/70 mt-0.5">
                    Get the latest property deals and updates
                  </p>
                </div>
                {/* Inactive Toggle Switch */}
                <button className="w-11 h-6 bg-slate-400 rounded-full p-0.5 transition-colors relative duration-200 shrink-0">
                  <span className="block w-5 h-5 bg-background rounded-full shadow-sm translate-x-0 transition-transform duration-200" />
                </button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
