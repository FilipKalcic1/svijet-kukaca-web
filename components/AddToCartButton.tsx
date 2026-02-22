"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: string;
};

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  size = "M",
}: Props) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: `${id}-${size}`,
      name: `${name} (Majica)`,
      price,
      image,
      size,
    });
  };

  return (
    <Button
      onClick={handleAdd}
      size="lg"
      className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white px-8 h-12 shadow-lg hover:scale-105 transition-transform"
    >
      <ShoppingBag className="w-4 h-4 mr-2" />
      Dodaj u košaricu ({price.toFixed(2)} €)
    </Button>
  );
}
