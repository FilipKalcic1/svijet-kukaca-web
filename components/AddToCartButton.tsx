"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner"; // Opcionalno za notifikaciju

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ id, name, price, image }: Props) {
  const { addItem } = useCart();

  const handleAdd = () => {
    // Ovdje hardkodiramo veličinu 'L' za primjer, 
    // ali idealno bi imao selektor veličine iznad.
    addItem({
      id: `${id}-L`, // Jedinstveni ID
      name,
      price,
      image,
      size: "L", // Default veličina
    });
    // Košarica će se sama otvoriti zbog logike u Contextu
  };

  return (
    <Button 
      onClick={handleAdd}
      size="lg" 
      className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white px-8 h-12 shadow-lg hover:scale-105 transition-transform"
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Dodaj u košaricu (25.00 €)
    </Button>
  );
}