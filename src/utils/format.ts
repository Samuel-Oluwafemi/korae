export const money = (n: number) => `₦${n.toLocaleString("en-NG")}`;
export const FREE_SHIPPING_OVER = 150000,
  SHIPPING_FEE = 3500;
export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
