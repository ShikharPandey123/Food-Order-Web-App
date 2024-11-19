import { createSlice } from "@reduxjs/toolkit";

const userProgressSlice = createSlice({
  name: "userProgress",
  initialState: {
    progress: "", // Possible values: '', 'cart', 'checkout'
  },
  reducers: {
    showCart(state) {
      state.progress = "cart";
    },
    hideCart(state) {
      state.progress = "";
    },
    showCheckout(state) {
      state.progress = "checkout";
    },
    hideCheckout(state) {
      state.progress = "";
    },
  },
});

export const userProgressActions = userProgressSlice.actions;
export default userProgressSlice.reducer;
