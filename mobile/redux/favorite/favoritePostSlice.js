import { createSlice } from "@reduxjs/toolkit";

const favoritePostSlice = createSlice({
  name: "favoritePost",
  initialState: {
    found: false,
    items: [],
  },
  reducers: {
    add(state, action) {
      state.items = [action.payload, ...state.items];
      state.found = true;
    },
    remove(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (state.items.length === 0) state.found = false;
    },
    set(state, action) {
      state.items = [];
      state.items = action.payload.map((item) => {
        return {
          id: item.post_id,
          watch_id: item.watch_id,
          name: item.name,
          status: item.status,
          size: item.case_size_num,
          price: item.price,
          formatted_price: item.formatted_price,
          image: item.media_content,
          date: item.date_ago,
          location: item.province,
          isFavorite: true,
        };
      });

      if (state.items.length !== 0) state.found = true;
    },
    deleteAll(state, action) {
      state.items = [];
    }
  },
});

export const favoritePostActions = favoritePostSlice.actions;
export default favoritePostSlice;
