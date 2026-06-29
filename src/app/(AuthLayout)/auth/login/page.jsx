import LoginForm from "@/Components/Auth/LoginForm";
import { ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import logo from "@/images/logo.png";
import Image from "next/image";
const LoginPage = async ({ searchParams }) => {
  const callbackUrl = searchParams?.next || "/";
  return (
    <div className="min-h-screen  bg-background">
      <div className="w-full min-h-screen  grid md:grid-cols-2 ">
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center bg-[#3729ce] text-white">
          <div className="ml-8 lg:ml-20 lg:max-w-xl  flex flex-col gap-6">
            {/* BRAND */}
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Image
                  src={logo}
                  alt="Logo"
                  width={600}
                  height={600}
                  className="w-6 h-6 xl:w-8 xl:h-8"
                />
                <p className="font-extrabold uppercase text-primary text-xl md:text-2xl lg:text-3xl">
                  Rent<span className="text-secondary">Bari</span>
                </p>
              </h1>

              <h3 className="text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Access Your Rental Dashboard
              </h3>

              <p className="text-sm mr-6 lg:mr-0 text-white/80 leading-relaxed max-w-lg">
                Login to continue exploring verified properties, track your
                bookings, and manage everything in one place.
              </p>
            </div>

            {/* FEATURE 1 */}
            <article className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <div className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white">
                <Zap className="w-5 h-5" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">
                  Quick Access to Listings
                </span>

                <p className="text-xs text-white/70 leading-relaxed">
                  Jump back into thousands of verified rental properties
                  tailored to your preferences.
                </p>
              </div>
            </article>

            {/* FEATURE 2 */}
            <article className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <div className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">
                  Manage Your Rentals Easily
                </span>

                <p className="text-xs text-white/70 leading-relaxed">
                  Track bookings, saved favorites, and rental activity all in
                  one place.
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* RIGHT */}
        <section className="w-full px-6 lg:px-0 flex flex-col my-12  justify-center max-w-md mx-auto">
          <div className="mb-8 space-y-1 text-center sm:text-left ">
            <h3 className="text-3xl font-semibold tracking-tight text-foreground">
              Sign In
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Welcome Back to Your Next Home.
            </p>
          </div>

          <LoginForm />

          <div className="text-center mt-6  text-sm text-default-600">
            <p>
              New to RentBari?
              <Link
                href={`/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                className="font-semibold text-primary hover:underline underline-offset-4 transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
