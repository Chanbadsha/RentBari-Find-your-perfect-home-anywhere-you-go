import React from "react";
import { Card, Input } from "@heroui/react";
import { FiCamera, FiCheckCircle, FiSave } from "react-icons/fi";

export default function ProfileSettings() {
  return (
    <div className="min-h-screen bg-[#F8FAF9] p-6 md:p-8 font-sans antialiased text-slate-800">
      {/* Title Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Profile Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal information and account security.
        </p>
      </div>

      {/* Main Two-Column Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Profile Preview Card */}
        <Card className="border border-slate-100 bg-white rounded-2xl p-6 shadow-sm text-center">
          <Card.Content className="p-0 flex flex-col items-center">
            {/* Avatar Image Container with Camera Overlay */}
            <div className="relative w-28 h-28 mb-4">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
                alt="Sarah Jenkins"
                className="w-full h-full object-cover rounded-full border border-slate-100"
              />
              <button className="absolute bottom-1 right-1 bg-[#00523A] text-white p-2 rounded-full shadow-md hover:bg-[#00402e] transition-colors">
                <FiCamera size={14} />
              </button>
            </div>

            <Card.Title className="text-lg font-bold text-slate-900 leading-tight">
              Sarah Jenkins
            </Card.Title>
            <Card.Description className="text-xs text-slate-400 mt-1">
              sarah.jenkins@example.com
            </Card.Description>

            {/* Role Badge */}
            <span className="mt-3 inline-block px-4 py-1 bg-[#F9A825] text-white text-xs font-bold rounded-full shadow-sm">
              Tenant
            </span>

            {/* Profile Meta Details */}
            <div className="w-full mt-6 pt-6 border-t border-slate-100 text-xs text-left space-y-3 font-medium">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Member since</span>
                <span className="text-slate-800 font-bold">March 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Identity status</span>
                <span className="text-[#00523A] font-bold flex items-center gap-1">
                  <FiCheckCircle className="inline" /> Verified
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Right Side: Form & Preferences Stack */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Form Card */}
          <Card className="border border-slate-100 bg-white rounded-2xl p-6 shadow-sm">
            <Card.Content className="p-0 space-y-5">
              {/* Form Grid rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 pl-0.5">
                    Full Name
                  </label>
                  <Input
                    aria-label="Full Name"
                    placeholder="Full Name"
                    defaultValue="Sarah Jenkins"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00523A]/10 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 pl-0.5">
                    Email Address
                  </label>
                  <Input
                    aria-label="Email Address"
                    placeholder="Email Address"
                    defaultValue="sarah.jenkins@example.com"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00523A]/10 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 pl-0.5">
                    Phone Number
                  </label>
                  <Input
                    aria-label="Phone Number"
                    placeholder="Phone Number"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00523A]/10 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 pl-0.5">
                    Profile Photo URL
                  </label>
                  <Input
                    aria-label="Profile Photo URL"
                    placeholder="Profile Photo URL"
                    defaultValue="https://example.com/avatar.jpg"
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00523A]/10 bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Bio Field */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 pl-0.5">
                  Bio (Optional)
                </label>
                <textarea
                  aria-label="Bio"
                  rows={4}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#00523A]/10 bg-slate-50/50 text-slate-700 resize-none"
                  defaultValue="I am a freelance graphic designer looking for a quiet space near the city center. I value clean environments and respectful neighbors."
                />
              </div>

              {/* Form Footer Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-xs text-slate-400 font-medium">
                  Last updated on Oct 12, 2024
                </span>
                <button className="flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm w-full sm:w-auto justify-center">
                  <FiSave size={16} />
                  Save Changes
                </button>
              </div>
            </Card.Content>
          </Card>

          {/* Preferences Section Card */}
          <Card className="border border-slate-100 bg-white rounded-2xl p-6 shadow-sm">
            <Card.Header className="p-0 pb-4 border-b border-slate-100">
              <Card.Title className="text-lg font-bold text-slate-900">
                Preferences
              </Card.Title>
            </Card.Header>

            <Card.Content className="p-0 divide-y divide-slate-100">
              {/* Toggle 1 */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Email Notifications
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Receive alerts about new bookings and messages
                  </p>
                </div>
                {/* Active Toggle Switch */}
                <button className="w-11 h-6 bg-[#00523A] rounded-full p-0.5 transition-colors relative duration-200 shrink-0">
                  <span className="block w-5 h-5 bg-white rounded-full shadow-sm translate-x-5 transition-transform duration-200" />
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">
                    Marketing Emails
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Get the latest property deals and updates
                  </p>
                </div>
                {/* Inactive Toggle Switch */}
                <button className="w-11 h-6 bg-slate-400 rounded-full p-0.5 transition-colors relative duration-200 shrink-0">
                  <span className="block w-5 h-5 bg-white rounded-full shadow-sm translate-x-0 transition-transform duration-200" />
                </button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
