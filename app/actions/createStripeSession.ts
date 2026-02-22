"use server";

import { supabase } from "@/lib/supabase";
import type { CartItem } from "@/context/CartContext";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

function sanitize(value: FormDataEntryValue | null): string {
  if (!value || typeof value !== "string") return "";
  return value.trim().slice(0, 500);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateItems(items: CartItem[]): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.every(
    (item) =>
      typeof item.id === "string" &&
      typeof item.name === "string" &&
      typeof item.price === "number" &&
      item.price > 0 &&
      typeof item.quantity === "number" &&
      item.quantity > 0 &&
      item.quantity <= 100
  );
}

export async function createStripeSession(
  formData: FormData,
  cartItems: CartItem[],
  _total?: number
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const name = sanitize(formData.get("name"));
    const email = sanitize(formData.get("email"));
    const phone = sanitize(formData.get("phone"));
    const address = sanitize(formData.get("address"));
    const city = sanitize(formData.get("city"));
    const zip = sanitize(formData.get("zip"));

    if (!name || !email || !phone || !address || !city || !zip) {
      return { error: "Sva polja su obavezna." };
    }

    if (!validateEmail(email)) {
      return { error: "Neispravna email adresa." };
    }

    if (!validateItems(cartItems)) {
      return { error: "Neispravni artikli u košarici." };
    }

    // Recalculate total server-side
    const calculatedTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderData = {
      name,
      email,
      phone,
      address,
      city,
      zip,
      items: cartItems,
      total: calculatedTotal,
      payment_method: "stripe",
      status: "pending",
    };

    const { data: order, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) {
      return { error: "Greška pri kreiranju narudžbe." };
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?order_id=${order.id}`,
      cancel_url: `${baseUrl}/checkout`,
      customer_email: email,
      metadata: {
        orderId: order.id,
      },
    });

    return { url: session.url };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška na serveru.";
    return { error: message };
  }
}
