import { Schema, model } from "mongoose";

const orderSchema = Schema(
  {
    coustmerId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    deliveryAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: Number, required: true },
    },
    transationId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const OrderModel = model("orders", orderSchema);
