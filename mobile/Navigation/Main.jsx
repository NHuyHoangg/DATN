import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePageScreen from "../Screens/Home/HomePageContainer";
import FavouriteScreen from "../Screens/Favourite/FavouriteContainer";
import TradingScreen from "../Screens/Trading/TradingContainer";
import AccountScreen from "../Screens/Account/AccountContainer";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
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
            case "TradingTab":
              return <AntDesign name="tagso" size={27} color={color} />;
            case "AccountTab":
              return <Ionicons name="person-circle" size={27} color={color} />;
          }
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "montserrat-regular",
          fontSize: 12,
          paddingBottom: 5,
        },
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: color.soil_yellow,
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
        name="TradingTab"
        component={TradingScreen}
        options={{ title: "Trao đổi" }}
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
