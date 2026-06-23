"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function ReviewsSection() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const staticReviews = [
    {
      id: 1,
      name: "Rafsan Chowdhury",
      date: "Dec 12, 2023",
      stars: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      text: "Stayed here for a week with my family. The ocean view is unmatched anywhere else in Cox's Bazar. Management was very responsive. The pool was pristine!",
    },
    {
      id: 2,
      name: "Nadia Ahmed",
      date: "Nov 28, 2023",
      stars: 4,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      text: "The architecture is incredible. Highly recommend for anyone looking for a quiet retreat away from the main town center.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setComment("");
    setRating(0);
  };

  return (
    <div className="w-full mb-10 rounded-2xl p-8 bg-background font-inter text-foreground/70">
      {/* 1. SECTION HEADER OVERVIEW */}
      <div className="flex items-center justify-between border-b border-foreground/20 pb-4 mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Reviews (14)
        </h2>
        <div className="flex items-center gap-1.5 font-bold text-foreground/70 text-lg">
          <FaStar fill="#f59e0b" className="text-amber-500 w-5 h-5" />
          <span>4.9</span>
        </div>
      </div>

      {/* 2. INTERACTIVE WRITE-A-REVIEW COMPONENT CARD */}
      <div className="border border-gray-100 rounded-2xl p-5 shadow-xs bg-background mb-8">
        <h3 className="text-xs font-bold tracking-wide uppercase text-foreground/80 mb-3">
          Write a Review
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Selection Row */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starNum) => (
              <button
                key={starNum}
                type="button"
                className="transition-transform duration-100 active:scale-90 focus:outline-none"
                onClick={() => setRating(starNum)}
                onMouseEnter={() => setHoverRating(starNum)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <FaStar
                  className="w-5 h-5 transition-colors"
                  fill={
                    (hoverRating || rating) >= starNum ? "#FBBF24" : "#E5E7EB "
                  }
                  stroke={
                    (hoverRating || rating) >= starNum ? "#F59E0B" : "#D1D5DB"
                  }
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>

          {/* Comment Box */}
          <div className="relative">
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience at this property..."
              className="w-full text-sm font-medium text-foreground/80 bg-transparent placeholder-gray-400 border border-gray-200 rounded-xl px-4 py-3 transition-colors focus:outline-none focus:border-[#105e53] focus:ring-1 focus:ring-[#105e53]/30 resize-none"
              required
            />
          </div>

          {/* Submit Action Block */}
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0a5246] hover:bg-[#073c33] text-white font-bold text-xs rounded-lg transition-colors shadow-xs active:scale-98"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* 3. PERSISTENT REVIEWS FEED */}
      <div className="space-y-6">
        {staticReviews.map((rev) => (
          <div
            key={rev.id}
            className="flex gap-4 items-start border-b border-gray-50/50 pb-6 last:border-0"
          >
            {/* User Profile Frame */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={rev.avatar}
                alt={`${rev.name} avatar`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Review Payload Details */}
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <h4 className="text-sm font-bold text-foreground truncate">
                  {rev.name}
                </h4>
                <span className="text-[11px] font-bold text-foreground/70 uppercase tracking-wider">
                  {rev.date}
                </span>
              </div>

              {/* Dynamic Star Multiplier */}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((index) => (
                  <FaStar
                    key={index}
                    className="w-3.5 h-3.5"
                    fill={index <= rev.stars ? "#f59e0b" : "#e5e7eb"}
                    stroke={index <= rev.stars ? "#f59e0b" : "#d1d5db"}
                  />
                ))}
              </div>

              {/* Verified Comment Body */}
              <p className="text-sm font-normal leading-relaxed text-foreground/70 pr-2">
                {rev.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
