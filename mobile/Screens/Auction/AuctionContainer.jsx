import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";

import LockOverlay from "../Overlay/LockOverlay";
import AuctionDone from "./AuctionDone";
import AuctionInProgress from "./AuctionInProgress";
import AuctionDetail from "./AuctionDetail";
import ManageWatch from "./ManageWatch";
import WatchDetails from "../../Components/watch/WatchDetails";
import MyAddress from "../Account/MyAddress";
import CreateAddress from "../Account/CreateAddress";
import Recharge from "../Account/Recharge";
import color from "../../constants/color";
import {
  HeaderStyle,
  TopTapStyle,
  TopTabScreenStyle,
} from "../../constants/globalStyles";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TopTabsContainer = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LockOverlay />;
  }

  return (
    <Tab.Navigator
      initialRouteName="InProgress"
      screenOptions={{
        ...TopTapStyle,
      }}
    >
      <Tab.Screen
        name="InProgress"
        component={AuctionInProgress}
        options={{
          tabBarLabel: "Đang diễn ra",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Done"
        component={AuctionDone}
        options={{
          tabBarLabel: "Đã kết thúc",
          ...TopTabScreenStyle,
        }}
      />
    </Tab.Navigator>
  );
};

export default function AuctionScreen() {
  return (
    <Stack.Navigator initialRouteName="Trading">
      <Stack.Screen
        name="Trading"
        component={TopTabsContainer}
        options={{
          ...HeaderStyle,
          title: "Đấu giá",
          color: color.baemin1,
        }}
      />
      <Stack.Screen
        name="ManageWatch"
        component={ManageWatch}
        options={{
          ...HeaderStyle,
          title: "Quản lý đồng hồ",
        }}
      />
      <Stack.Screen
        name="WatchDetails"
        component={WatchDetails}
        options={{
          ...HeaderStyle,
          title: "Sản phẩm đang bán",
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
        name="AuctionDetail"
        component={AuctionDetail}
        options={{
          ...HeaderStyle,
          title: "Phiên đấu giá",
        }}
      />
      {/* <Stack.Screen
      name="ManageRequest"
      component={ManageRequest}
      options={{
        ...HeaderStyle,
        title: "Quản lý yêu cầu"
      }}
       /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
