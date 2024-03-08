import { createSlice } from "@reduxjs/toolkit";

const watchSlice = createSlice({
  name: "watch",
  initialState: {
    items: [],
  },
  reducers: {
    add(state, action) {
      state.items = [action.payload, ...state];
    },
    set(state, action) {
      state.items = action.payload.map((item) => {
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
          isFavorite: item.is_favorite ? true : false,
        };
      });
    },
    localUpdate(state, action) {
      const updateIdx = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[updateIdx] = action.payload;
    },

    // deepUpdate(state, action) {
    //   const updateIdx = state.items.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   state.items[updateIdx] = {
    //     ...state.items[updateIdx],
    //     description: action.payload.details.product_info.description,
    //     brand: action.payload.details.product_info.brand,
    //     gender: action.payload.details.product_info.gender,
    //     strap_type: action.payload.details.product_info.strap_material,
    //     seller: action.payload.details.product_info.user_name,
    //     image_list: action.payload.details.media,
    //     waterproof: action.payload.details.product_info.waterproof,
    //     nation: action.payload.details.product_info.origin,
    //   };
    // },
    delete(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    deleteAll(state, action) {
      state.items = [];
    },
  },
});

export const watchActions = watchSlice.actions;
export default watchSlice;
