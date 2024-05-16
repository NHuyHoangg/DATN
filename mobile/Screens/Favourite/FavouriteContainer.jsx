import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { HeaderStyle, TopTapStyle, TopTabScreenStyle } from "../../constants/globalStyles";

import PostFavourite from "./PostFavourite";
import ProductFavourite from "./ProductFavourite"
import WatchDetails from "../../Components/watch/WatchDetails";
import ViewSavedWatchs from "./ViewSavedWatchs";
import Payment from "../Home/Payment";
import MyAddress from "../Account/MyAddress";
import CreateAddress from "../Account/CreateAddress";
import ChangeAddress from "../Account/ChangeAdress";
import ChooseAddress from "../Home/ChooseAddress";
import Recharge from "../Account/Recharge";
import ShoppingHistory from "../Account/ShoppingHistory";
import { useSelector } from "react-redux";
import LockOverlay from "../Overlay/LockOverlay";

const Stack = createNativeStackNavigator();

export default function FavouriteScreen() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return (
      <LockOverlay />
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favourite"
        component={PostFavourite}
        options={{
          ...HeaderStyle,
          title: "Yêu thích",
        }}
      />
      <Stack.Screen
        component={WatchDetails}
        name="WatchDetails"
        options={{
          ...HeaderStyle,
          title: "Bản tin yêu thích",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        component={Payment}
        name="Payment"
        options={{
          ...HeaderStyle,
          title: "Xác nhận thanh toán",
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyAddress"
        component={MyAddress}
        options={{
          ...HeaderStyle,
          title: "Địa chỉ của tôi",
        }}
      />
      <Stack.Screen
        name="CreateAddress"
        component={CreateAddress}
        options={{
          ...HeaderStyle,
          title: "Tạo địa chỉ",
        }}
      />
      <Stack.Screen
        name="ChangeAddress"
        component={ChangeAddress}
        options={{
          ...HeaderStyle,
          title: "Sửa địa chỉ",
        }}
      />
      <Stack.Screen
        name="ChooseAddress"
        component={ChooseAddress}
        options={{
          ...HeaderStyle,
          title: "Chọn địa chỉ",
        }}
      />
      <Stack.Screen
        name="Recharge"
        component={Recharge}
        options={{
          ...HeaderStyle,
          title: "Thanh toán",
        }}
      />
      <Stack.Screen
        name="ShoppingHistory"
        component={ShoppingHistory}
        options={{
          ...HeaderStyle,
          title: "Đơn mua",
        }}
      />
      {/* <Stack.Screen
      component={ViewSavedWatchs} 
      name="ViewSavedWatchs"
      options={{
        ...HeaderStyle,
        title: "Sản phẩm tương tự"
      }}
      /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
