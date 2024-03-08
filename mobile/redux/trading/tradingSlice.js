import { createSlice } from "@reduxjs/toolkit";
const tradingSlice = createSlice({
  name: "trading",
  initialState: {
    sellingItems: [],
    soldItems: [],
  },
  reducers: {
    setSellingItems(state, action) {
      state.sellingItems = action.payload.map((item) => {
        return {
          id: item.post_id,
          watch_id: item.watch_id,
          name: item.name,
          status: item.status,
          size: item.case_size_num,
          price: item.price,
          image: item.media_content,
          date: item.date_ago,
          location: item.province,
        };
      });
    },
    setSoldItems(state, action) {
      state.soldItems = action.payload.map((item) => {
        return {
          id: item.post_id,
          watch_id: item.watch_id,
          name: item.name,
          status: item.status,
          size: item.case_size_num,
          price: item.price,
          image: item.media_content,
          date: item.date_ago,
          location: item.province,
        };
      });
    },
    addNewSellingItem(state, action) {
      console.log("addNewSellingItem, ", action.payload);
      state.sellingItems = [action.payload, ...state.sellingItems];
    },
    updateSellingItem(state, action) {
      console.log("updateSellingItem, ", action.payload);
      const idx = state.sellingItems.findIndex(
        (item) => item.id === +action.payload.id
      );
      console.log("idx = ", idx);
      state.sellingItems[idx] = {
        ...state.sellingItems[idx],
        name: action.payload.name,
        status: action.payload.status,
        size: action.payload.size,
        price: action.payload.price,
        image: action.payload.image,
      };
    },

    deleteSellingItem(state, action) {
      state.sellingItems = state.sellingItems.filter(
        (item) => item.id !== action.payload
      );
    },
    moveToSoldPosts(state, action) {
      console.log("moveToSoldPosts, ", action.payload);
      state.sellingItems = state.sellingItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.soldItems = [action.payload, ...state.soldItems];
    },
    moveToSellingPosts(state, action) {
      state.soldItems = state.soldItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.sellingItems = [action.payload, ...state.sellingItems];
    },
    deleteAll(state, action) {
      state.sellingItems = [];
      state.soldItems = [];
    },
  },
});

export const tradingActions = tradingSlice.actions;
export default tradingSlice;
