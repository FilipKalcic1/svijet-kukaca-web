"use server";

import { supabase } from "@/lib/supabase";
import type { CartItem } from "@/context/CartContext";

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

export async function createOrder(
  formData: FormData,
  cartItems: CartItem[],
  _total?: number
) {
  try {
    const name = sanitize(formData.get("name"));
    const email = sanitize(formData.get("email"));
    const phone = sanitize(formData.get("phone"));
    const address = sanitize(formData.get("address"));
    const city = sanitize(formData.get("city"));
    const zip = sanitize(formData.get("zip"));

    if (!name || !email || !phone || !address || !city || !zip) {
      return { success: false, error: "Sva polja su obavezna." };
    }

    if (!validateEmail(email)) {
      return { success: false, error: "Neispravna email adresa." };
    }

    if (!validateItems(cartItems)) {
      return { success: false, error: "Neispravni artikli u košarici." };
    }

    // Recalculate total server-side to prevent price manipulation
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
      payment_method: "pouzece",
      status: "novo",
    };

    const { data, error } = await supabase
      .from("orders")
      .insert([orderData])
      .select()
      .single();

    if (error) {
      return { success: false, error: "Greška pri kreiranju narudžbe." };
    }

    return { success: true, orderId: data.id };
  } catch {
    return { success: false, error: "Greška na serveru." };
  }
}
