import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";

import LockOverlay from "../Overlay/LockOverlay";
import SellingScreen from "./SellingScreen";
import SoldScreen from "./SoldScreen";
import ManageWatch from "./ManageWatch";
import WatchDetails from "../../Components/watch/WatchDetails";
import ManageRequest from "./ManageRequest";
import color from "../../constants/color";
import {
  HeaderStyle,
  TopTapStyle,
  TopTabScreenStyle,
} from "../../constants/globalStyles";
import { Header } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();


const SellingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Selling"
        component={SellingScreen}
        options={{
          tabBarLabel: "Đang bán",
          ...HeaderStyle,
        }}
      />
      <Stack.Screen
      name="SellingStack" />
    </Stack.Navigator>
  );
}

const TopTabsContainer = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LockOverlay />
  }

  return (
    <Tab.Navigator
      initialRouteName="Selling"
      screenOptions={{
        ...TopTapStyle,
      }}
    >
      <Tab.Screen
        name="Selling"
        component={SellingScreen}
        options={{
          tabBarLabel: "Đang bán",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Sold"
        component={SoldScreen}
        options={{
          tabBarLabel: "Đã bán",
          ...TopTabScreenStyle,
        }}
      />
    </Tab.Navigator>
  );
};

export default function TradingScreen() {
  return (
    <Stack.Navigator
    initialRouteName="Trading">
      
      <Stack.Screen
        name="Trading"
        component={TopTabsContainer}
        options={{
          ...HeaderStyle,
          title: "Quản lý tin đăng",
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
          title: "Sản phẩm đang bán"
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
