import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";

import LockOverlay from "../Overlay/LockOverlay";
import AuctionMine from "./AuctionMine";
import AuctionJoin from "./AuctionJoin";
import AuctionDetail from "./AuctionDetail";
import ManageWatch from "./ManageWatch";
import WatchDetails from "../../Components/watch/WatchDetails";
import MyAddress from "./MyAddress";
import CreateAddress from "./CreateAddress";
import Recharge from "./Recharge";
import color from "../../constants/color";
import {
  HeaderStyle,
  TopTapStyle,
  TopTabScreenStyle,
} from "../../constants/globalStyles";

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function Auction() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <LockOverlay />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Join"
      screenOptions={{
        ...TopTapStyle,
      }}
    >
      <Tab.Screen
        name="Join"
        component={AuctionJoin}
        options={{
          tabBarLabel: "Lịch sử tham gia",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Mine"
        component={AuctionMine}
        options={{
          tabBarLabel: "Đấu giá của tôi",
          ...TopTabScreenStyle,
        }}
      />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({});
