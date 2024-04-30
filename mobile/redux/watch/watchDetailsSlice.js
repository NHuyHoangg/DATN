import { createSlice } from "@reduxjs/toolkit";

const watchDetailsSlice = createSlice({
  name: "details",
  initialState: {
    item: {
      id: "",
      images: [],
    },
  },
  reducers: {
    set(state, action) {
      state.item = {
        // basic infor
        id: action.payload.product_info.id,
        watch_id: action.payload.product_info.watch_id,
        name: action.payload.product_info.name,
        status: action.payload.product_info.status,
        size: action.payload.product_info.case_size_num,
        price: action.payload.product_info.price,
        formatted_price: action.payload.product_info.formatted_price,
        date: action.payload.product_info.date_ago,
        location: action.payload.product_info.province,
        isFavorite: action.payload.product_info.isFavorite,
        // details infor
        view: action.payload.product_info.view,
        description: action.payload.product_info.description,
        brand: action.payload.product_info.brand,
        gender: action.payload.product_info.gender,
        strap_type: action.payload.product_info.strap_material,
        seller: action.payload.product_info.user_name,
        waterproof: action.payload.product_info.waterproof_num ? "Có" : "Không",
        // nation: action.payload.product_info.origin,
        // image list
        images: action.payload.media.map((item) => item.content),
        updatedImages: action.payload.media.map((item) => item.content),
        // seller infor
        user_name: action.payload.product_info.user_name,
        phone: action.payload.product_info.phone,
        province: action.payload.product_info.province,
        district: action.payload.product_info.district,
        ward: action.payload.product_info.ward,
        street: action.payload.product_info.street,
      };
    },
    addImages(state, action) {
      // console.log("addImage");
      const maxNumOfImages = 6;
      const numOfImages = maxNumOfImages - state.item.images.length;
      let preprocessedImages =
        action.payload.length > numOfImages
          ? action.payload.slice(0, numOfImages)
          : action.payload;

      // preprocessedImages = preprocessedImages.map(
      //   (asset) => resizeImage(asset.uri)
      // );
      // preprocessedImages = preprocessedImages.map(
      //   (asset) => "data:image/png;base64," + asset.base64
      // );

      state.item.updatedImages =
        state.item.updatedImages.concat(preprocessedImages);
    },
    removeImages(state, action) {
      const idx = action.payload;
      state.item.updatedImages = state.item.updatedImages.filter(
        (_, index) => index !== idx
      );
    },
    overrideUpdatedImages(state, action) {
      state.item.updatedImages = [...state.item.images];
    },
    clearUpdatedImages(state, action) {
      state.item.updatedImages = [];
    },
    updatePost(state, action) {
      state.item.images = [...state.item.updatedImages];
      state.item.name = action.payload.name;
      state.item.price = action.payload.price;
      state.item.brand = action.payload.brand;
      state.item.status = action.payload.status;
      state.item.size = action.payload.case_size;
      state.item.description = action.payload.description;
      state.item.waterproof = action.payload.waterproof;
      state.item.gender = action.payload.gender;
      state.item.strap_type = action.payload.strap_material;
    },
  },
});

export const watchDetailsActions = watchDetailsSlice.actions;
export default watchDetailsSlice;
