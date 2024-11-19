import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { isCartVisible: false },
  reducers: {
    showCart(state) {
      state.isCartVisible = true;
    },
    hideCart(state) {
      state.isCartVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
