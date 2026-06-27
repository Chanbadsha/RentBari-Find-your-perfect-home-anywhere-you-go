import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/lib/stripe";
import { getPropertiesById } from "@/app/lib/api/properties";
import { getUserSession } from "@/app/lib/core/session";

export async function POST(request) {
  try {
    const user = await getUserSession();
    const formData = await request.formData();
    const id = formData.get("propertyId");
    const property = await getPropertiesById(id);
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      metadata: {
        tenantId: user.id,
        propertyId: id,
        rentType: property?.rentType,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: property?.propertyTitle,
              description: property?.location,
              images: [property?.coverImage],
            },
            unit_amount: property?.rentPrice * 100, // cents
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      success_url: `${origin}/properties/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
