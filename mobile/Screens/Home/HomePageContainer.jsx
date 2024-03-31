import React from "react";
import Chat from './Chat'
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderStyle, TopTapStyle, TopTabScreenStyle } from "../../constants/globalStyles";
import WatchDetails from "../../Components/watch/WatchDetails";
import HomePage from "./HomePage";
import ChatDetail from "./ChatDetail";

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

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
