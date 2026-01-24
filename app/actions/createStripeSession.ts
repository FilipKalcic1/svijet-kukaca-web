"use server";

import { supabase } from "@/lib/supabase";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia" as any, // Dodaj 'as any' i greška nestaje
  typescript: true,
});

export async function createStripeSession(formData: FormData, cartItems: any[], total: number) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    // 1. SPREMI NARUDŽBU U BAZU (Status: PENDING)
    const orderData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      zip: formData.get("zip") as string,
      items: cartItems,
      total: total,
      payment_method: 'stripe',
      status: 'pending' // Čeka plaćanje
    };

    const { data: order, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw new Error("Greška pri kreiranju narudžbe u bazi: " + error.message);

    // 2. PRIPREMI PROIZVODE ZA STRIPE FORMAT
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          // images: [item.image], // Možeš dodati i sliku ako je na javnom URL-u
        },
        unit_amount: Math.round(item.price * 100), // Stripe traži cente (npr. 25.00€ = 2500)
      },
      quantity: item.quantity,
    }));

    // 3. KREIRAJ STRIPE CHECKOUT SESIJU
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Kartice, Google Pay, Apple Pay
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/checkout/success?order_id=${order.id}`, // Vrati se ovdje ako prođe
      cancel_url: `${baseUrl}/checkout`, // Vrati se ovdje ako odustane
      customer_email: orderData.email,
      metadata: {
        orderId: order.id, // Poveznica da znamo koja je narudžba plaćena
      },
    });

    // Vrati URL na koji frontend treba preusmjeriti korisnika
    return { url: session.url };

  } catch (error: any) {
    console.error("Stripe Error:", error);
    return { error: error.message };
  }
}