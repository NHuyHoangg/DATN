import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import favoritePostSlice from "./favorite/favoritePostSlice";
import favoriteProductSlice from "./favorite/favoriteProductSlice";
import uiSlice from "./ui/uiSlice";
import watchSlice from "./watch/watchSlice";
import watchDetailsSlice from "./watch/watchDetailsSlice";
import tradingSlice from "./trading/tradingSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  // tạo các reducer con trong reducer cha
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    favoritePost: favoritePostSlice.reducer,
    favoriteProduct: favoriteProductSlice.reducer,
    watch: watchSlice.reducer,
    details: watchDetailsSlice.reducer,
    trading: tradingSlice.reducer,
    user: userSlice.reducer
  },
});

export default store;
