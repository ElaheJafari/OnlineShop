import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, Product } from "../../models/product";

interface cartState {
  carts: CartProduct[];
  IsOpen: boolean;
}
const initialState: cartState = {
  carts: [],
  IsOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action: PayloadAction<Product>) => {
      const productId = action.payload._id;
      const isProductExist = state.carts.find((item) => item._id === productId);
      if (!isProductExist) state.carts.push({ ...action.payload, count: 1 });
      else {
        state.carts = state.carts.map((item) => {
          if (item._id === isProductExist._id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
      }
      state.IsOpen = true;
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.IsOpen = action.payload;
    },
  },
});

export const { AddToCart, setIsOpen } = cartSlice.actions;
export default cartSlice.reducer;
