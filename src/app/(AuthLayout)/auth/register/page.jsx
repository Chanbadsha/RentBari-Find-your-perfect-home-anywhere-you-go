import RegisterForm from "@/Components/Auth/RegisterForm";
import logo from "@/images/logo.png";
import { ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = async ({ searchParams }) => {
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
                Find Your Perfect Home, Effortlessly.
              </h3>

              <p className="text-sm mr-6 lg:mr-0 text-white/80 leading-relaxed max-w-lg">
                Join RentBari to discover verified rental properties, connect
                with trusted owners, and book your next home with confidence.
              </p>
            </div>

            {/* FEATURE 1 */}
            <article className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <div className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white">
                <Zap className="w-5 h-5" />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">
                  Verified Properties
                </span>

                <p className="text-xs text-white/70 leading-relaxed">
                  Browse carefully reviewed listings with accurate details,
                  photos, and transparent pricing.
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
                  Secure Booking Experience
                </span>

                <p className="text-xs text-white/70 leading-relaxed">
                  Book properties online, track reservations, and enjoy safe
                  payment processing every step of the way.
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* RIGHT */}
        <section className="w-full px-6 lg:px-0 flex flex-col my-12  justify-center max-w-md mx-auto">
          <div className="mb-8 space-y-1 text-center sm:text-left ">
            <h3 className="text-3xl font-semibold tracking-tight text-foreground">
              Create account
            </h3>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Your Perfect Home Journey Starts Here.
            </p>
          </div>

          <RegisterForm />

          <div className="text-center mt-6 text-sm text-default-600">
            <p>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-primary hover:underline underline-offset-4 transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
