"use server";

import { supabase } from "@/lib/supabase";

export async function createOrder(formData: FormData, cartItems: any[], total: number) {
  console.log("--- POČETAK NARUDŽBE ---"); // Da vidiš u terminalu da je krenulo
  
  try {
    // 1. Priprema podataka
    const orderData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      zip: formData.get("zip") as string,
      items: cartItems, // Supabase ovo automatski pretvara u JSONB
      total: total,
      payment_method: 'pouzece',
      status: 'novo'
    };

    console.log("Šaljem podatke u Supabase:", orderData);

    // 2. Insert u bazu
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) {
      // OVO JE KLJUČNO: Ispisat će točnu grešku u VS Code terminalu
      console.error("❌ SUPABASE GREŠKA:", error.message, error.details);
      return { success: false, error: error.message };
    }

    console.log("✅ Uspješna narudžba, ID:", data.id);
    return { success: true, orderId: data.id };

  } catch (err) {
    console.error("❌ OZBILJNA GREŠKA SERVERA:", err);
    return { success: false, error: "Greška na serveru" };
  }
}