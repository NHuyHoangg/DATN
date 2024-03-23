import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { HeaderStyle, TopTapStyle, TopTabScreenStyle } from "../../constants/globalStyles";

import Noti from "./Noti";
// import ProductFavourite from "./ProductFavourite"
import WatchDetails from "../../Components/watch/WatchDetails";
import ViewSavedWatchs from "../Favourite/ViewSavedWatchs";
import { useSelector } from "react-redux";
import LockOverlay from "../Overlay/LockOverlay";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TopTabsContainer = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return (
      <LockOverlay />
    )
  }

  return (
    <Noti></Noti>  
  )

  // return (
  //   <Tab.Navigator
  //     initialRouteName="Post"
  //     screenOptions={{
  //       ...TopTapStyle,
  //     }}
  //   >
  //     <Tab.Screen
  //       name="Post"
  //       component={PostFavourite}
  //       options={{
  //         tabBarLabel: "Bảng tin",
  //         ...TopTabScreenStyle,
  //       }}
  //     />
      
  //     <Tab.Screen
  //       name="Product"
  //       component={ProductFavourite}
  //       options={{
  //         tabBarLabel: "Sản phẩm",
  //         ...TopTabScreenStyle,
  //       }}
  //     />
  //   </Tab.Navigator>
  // );
}

export default function NotiScreen() {
  return (
    <>
    <Stack.Navigator>
      <Stack.Screen
        name="NotiContainer"
        component={TopTabsContainer}
        options={{
          ...HeaderStyle,
          title: "Thông báo",
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
      component={ViewSavedWatchs} 
      name="ViewSavedWatchs"
      options={{
        ...HeaderStyle,
        title: "Sản phẩm tương tự"
      }}
      />
    </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
