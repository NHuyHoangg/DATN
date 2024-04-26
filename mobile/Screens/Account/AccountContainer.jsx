import React from "react";
import Account from "./Account";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../Home/Chat";
import { HeaderStyle } from "../../constants/globalStyles";
import DetailInfo from "./DetailInfo";
import SupportPage from "./SupportPage";
import ShoppingHistory from "./ShoppingHistory";
import ChangePassword from "./ChangePassword";
import CreateAddress from "./CreateAddress";
import MyAddress from "./MyAddress";
import ChangeAddress from "./ChangeAdress";
import Review from "./Review";

const Stack = createNativeStackNavigator();

export default function AccountScreen() {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          ...HeaderStyle,
          title: "Tài khoản",
        }}
      />
      <Stack.Screen
        name="Info"
        component={DetailInfo}
        options={{
          ...HeaderStyle,
          title: "Chi tiết",
        }}
      />
      <Stack.Screen
        name="ShoppingHistory"
        component={ShoppingHistory}
        options={{
          ...HeaderStyle,
          title: "Lịch sử mua hàng",
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportPage}
        options={{
          ...HeaderStyle,
          title: "Hỗ trợ khách hàng",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          ...HeaderStyle,
          title: "Đổi mật khẩu",
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
        name="Review"
        component={Review}
        options={{
          ...HeaderStyle,
          title: "Nhận xét",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
