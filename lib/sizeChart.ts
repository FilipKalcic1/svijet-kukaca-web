// TODO: Verify dimensions with manufacturer.
// These are approximate kids' unisex t-shirt sizes.

export interface SizeRow {
  size: string;
  age: string;
  height: string;
  chest: string;
  length: string;
}

export const SIZE_CHART: SizeRow[] = [
  { size: "S",   age: "4–6 godina",   height: "110–116 cm", chest: "30–32 cm", length: "42–46 cm" },
  { size: "M",   age: "6–8 godina",   height: "116–128 cm", chest: "32–34 cm", length: "46–50 cm" },
  { size: "L",   age: "8–10 godina",  height: "128–134 cm", chest: "34–36 cm", length: "50–54 cm" },
  { size: "XL",  age: "10–12 godina", height: "134–146 cm", chest: "36–38 cm", length: "54–58 cm" },
  { size: "XXL", age: "12–14 godina", height: "146–152 cm", chest: "38–40 cm", length: "58–62 cm" },
];
