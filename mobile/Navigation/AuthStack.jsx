import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Login from "../Screens/Authenticate/Login";
import SignUp from "../Screens/Authenticate/SignUp";
import color from "../constants/color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "../Screens/Authenticate/ForgotPassword";

const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "montserrat-black",
          fontSize: 16,
        },
        headerStyle: { backgroundColor: "#ffffff" },
        headerTintColor: color.baemin1,
        contentStyle: { backgroundColor: "white" },
      }}
    >
    
    
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          title: "ĐĂNG NHẬP",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          fontSize: 14,
          title: "ĐĂNG KÝ",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          title: "LẤY LẠI MẬT KHẨU",
        }}
      />
   
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
