import { createSlice } from "@reduxjs/toolkit";

const favoriteProductSlice = createSlice({
  name: "favoriteProduct",
  initialState: {
    found: false,
    items: [],
    resultList: [],
  },
  reducers: {
    add(state, action) {
      state.resultList = [];
      state.items = [action.payload, ...state.items];
      state.found = true;
    },
    remove(state, action) {
      state.items = state.items.filter((item) => item.watch_id !== action.payload);
      state.resultList = [];
      if (state.items.length === 0) state.found = false;
    },
    deleteAll(state, action) {
      state.items = [];
      state.resultList = [];
    },
    set(state, action) {
      state.items = [];
      state.items = action.payload.map((item) => {
        return {
          watch_id: item.watch_id,
          name: item.name,
          size: item.case_size_num,
          image: item.media_content,
          style: item.gender,
          isFavorite: true,
        };
      });

      if (state.items.length !== 0) state.found = true;
    },
    setResultList(state, action) {
      state.resultList = action.payload.map((item) => {
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
  },
});

export const favoriteProductActions = favoriteProductSlice.actions;
export default favoriteProductSlice;
