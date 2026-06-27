import { stripe } from "@/app/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CircleCheckFill, House } from "@gravity-ui/icons";
import { AddBooking } from "@/app/lib/action/action";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Missing Stripe session.");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  if (session.status !== "complete") {
    redirect("/");
  }

  const booking = {
    propertyId: session.metadata.propertyId,
    userId: session.metadata.userId,
    rentType: session.metadata.rentType,
    amount: session.amount_total / 100,
    transactionId: session.payment_intent.latest_charge,
    paymentIntentId: session.payment_intent.id,
    paymentStatus: session.payment_status,
  };
  const bookingResult = await AddBooking(booking);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl border border-foreground/10 bg-background shadow-xl p-10 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CircleCheckFill className="h-12 w-12 text-green-600" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-foreground">
          Payment Successful 🎉
        </h1>

        <p className="mt-3 text-foreground/70 leading-relaxed">
          Thank you for choosing <span className="font-semibold">RentBari</span>
          . Your payment has been received successfully.
        </p>

        {/* Order Info */}
        <div className="mt-8 rounded-2xl border border-foreground/10 bg-foreground/2 p-5 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-foreground/60">Payment Status</span>
            <span className="font-semibold text-green-600">
              {session.payment_status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground/60">Transaction ID</span>
            <span className="font-medium text-sm">
              {session.payment_intent.latest_charge}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground/60">Receipt Email</span>
            <span className="font-medium">
              {session.customer_details?.email || "N/A"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/tenant"
            className="flex-1 rounded-xl bg-secondary text-white py-3 font-semibold hover:opacity-90 transition"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/properties"
            className="flex-1 rounded-xl border border-foreground/20 py-3 font-semibold hover:bg-foreground/5 transition flex items-center justify-center gap-2"
          >
            <House className="h-4 w-4" />
            Browse Properties
          </Link>
        </div>

        <p className="mt-6 text-xs text-foreground/50">
          A payment confirmation has been sent to{" "}
          <span className="font-medium">{session.customer_details?.email}</span>
          .
        </p>
      </div>
    </main>
  );
}
