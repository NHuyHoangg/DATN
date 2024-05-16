import React from "react";
import Chat from './Chat'
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderStyle, TopTapStyle, TopTabScreenStyle } from "../../constants/globalStyles";
import WatchDetails from "../../Components/watch/WatchDetails";
import HomePage from "./HomePage";
import ChatDetail from "./ChatDetail";
import Payment from "./Payment";
import MyAddress from "../Account/MyAddress";
import CreateAddress from "../Account/CreateAddress";
import Recharge from "../Account/Recharge";
import ShoppingHistory from "../Account/ShoppingHistory";

const Stack = createNativeStackNavigator();

export default function HomePageContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          ...HeaderStyle,
          title: "Trang chủ",
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={WatchDetails}
        name="WatchDetails"
        options={{
          ...HeaderStyle,
          title: "Chi tiết sản phẩm",
          // headerShown: false,
        }}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          ...HeaderStyle,
          title: "Xác nhận thanh toán",
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

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
