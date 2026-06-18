import {
  Calendar,
  CircleCheckFill,
  LockFill,
  Persons,
} from "@gravity-ui/icons";
import React from "react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Verified Listings",
      description:
        "Every property is manually checked for authenticity and quality.",

      icon: <CircleCheckFill />,
    },
    {
      title: "Secure Payments",
      description: "Bank-grade encryption for all your financial transactions.",

      icon: <LockFill />,
    },
    {
      title: "Trusted Owners",
      description:
        "We partner with only the most reliable landlords and developers.",

      icon: <Persons />,
    },
    {
      title: "Easy Booking",
      description: "Simple, one-click booking system for busy professionals.",

      icon: <Calendar />,
    },
  ];

  return (
    <section className=" bg-background/70 py-16 px-4 sm:px-6 lg:px-8 font-inter text-foreground">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold  tracking-tight sm:text-4xl">
          Why Choose Us
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base text-foreground/70 leading-relaxed">
          We redefine property searching with security, transparency, and a
          user-first experience.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-mainBackground border border-foreground/10 rounded-2xl lg:px-4 xl:p-8 p-8  flex flex-col items-center text-center shadow-sm transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="w-12 text-white h-12 rounded-full bg-secondary  flex items-center justify-center mb-5">
              {feature.icon}
            </div>

            <h3 className=" text-lg lg:text-xl font-semibold text-foreground mb-3">
              {feature.title}
            </h3>

            <p className="text-foreground/70 text-xs lg:text-sm leading-relaxed max-w-60">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
