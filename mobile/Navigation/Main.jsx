import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageScreen from "../Screens/Home/HomePageContainer";
import FavouriteScreen from "../Screens/Favourite/FavouriteContainer";
import TradingScreen from "../Screens/Trading/TradingContainer";
import AccountScreen from "../Screens/Account/AccountContainer";
import NotiScreen from "../Screens/Notification/NotiContainer";
import AuctionScreen from "../Screens/Auction/AuctionContainer"
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AuctionSvg from "../assets/images/svg/Auction";
import color from "../constants/color";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();

export default function Main() {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "HomeTab":
              return <Ionicons name="home-outline" size={27} color={color} />;
            case "FavouriteTab":
              return <Ionicons name="heart-outline" size={27} color={color} />;
            case "AuctionTab":
              return <AuctionSvg height={27} width={27} fill={color} />;
            case "TradingTab":
              return <AntDesign name="tagso" size={27} color={color} />;
            case "NotiTab":
              return <Ionicons name="notifications-outline" size={27} color={color} />;
            case "AccountTab":
              return <Ionicons name="person-circle-outline" size={27} color={color} />;
          }
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "montserrat-regular",
          fontSize: 10,
          paddingBottom: 5,
        },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: color.baemin1,
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {},
        tabBarStyle: {
          height: "8%",
          paddingHorizontal: 30,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomePageScreen}
        options={{ title: "Trang chủ" }}
      />
      <Tab.Screen
        name="FavouriteTab"
        component={FavouriteScreen}
        options={{ title: "Yêu thích" }}
      />
      <Tab.Screen
        name="AuctionTab"
        component={AuctionScreen}
        options={{ title: "Đấu giá" }}
      />
      <Tab.Screen
        name="TradingTab"
        component={TradingScreen}
        options={{ title: "Trao đổi" }}
      />
      <Tab.Screen
        name="NotiTab"
        component={NotiScreen}
        options={{ title: "Thông báo" }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{ title: "Tài khoản" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
