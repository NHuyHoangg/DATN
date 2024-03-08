import { StyleSheet } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding1 from "../Screens/OnBoarding/OnBoarding1";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();
export default function OnBoardingStack({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        gestureEnabled: true,
        animation: "slide_from_right",
        headerShown: false,
        tabBarIndicatorShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen name="OnBoarding1" component={OnBoarding1} />
      <Tab.Screen name="OnBoarding2" component={OnBoarding1} />
      <Tab.Screen name="OnBoarding3" component={OnBoarding1} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
