import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      {/* Logo / Brand */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Rent<span className="text-primary">Bari</span>
        </h1>
      </div>

      {/* Loader */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>

      {/* Text */}
      <h2 className="text-xl font-semibold mb-2">
        Loading your perfect home...
      </h2>

      <p className="text-sm text-foreground/60 max-w-md">
        We are fetching the latest properties, offers, and nearby listings for
        you.
      </p>

      {/* Animated dots */}
      <div className="flex gap-1 mt-6">
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default loading;
