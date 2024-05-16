import { StyleSheet, View, Text  } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HeaderStyle, TopTapScrollStyle, TopTabScreenStyle } from "../../constants/globalStyles";
import PostFavourite from '../Favourite/PostFavourite';
import OrderWaitVerify from './OrderWaitVerify';
import OrderDelivering from './OrderDelivering';
import OrderDone from './OrderDone';
import OrderReturn from './OrderReturn';
import OrderWaitGet from './OrderWaitGet';
import React from 'react'

const Tab = createMaterialTopTabNavigator();

export default function ShoppingHistory({}) {
  return (
    <Tab.Navigator
      initialRouteName="WaitVerify"
      screenOptions={{
        ...TopTapScrollStyle,
      }}
    >
      <Tab.Screen
        name="WaitVerify"
        component={OrderWaitVerify}
        options={{
          tabBarLabel: "Chờ xác nhận",
          ...TopTabScreenStyle,
        }}
        
      />
      <Tab.Screen
        name="WaitGet"
        component={OrderWaitGet}
        options={{
          tabBarLabel: "Chờ lấy hàng",
          ...TopTabScreenStyle,
        }}
        
      />
      <Tab.Screen
        name="Delivering"
        component={OrderDelivering}
        options={{
          tabBarLabel: "Đang vận chuyển",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Done"
        component={OrderDone}
        options={{
          tabBarLabel: "Hoàn thành",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Return"
        component={OrderReturn}
        options={{
          tabBarLabel: "Trả hàng",
          ...TopTabScreenStyle,
        }}
      />
    </Tab.Navigator>
  );

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text : {
    width: '70%',
    fontFamily: 'montserrat-light',
    fontSize: 15,
    textAlign: 'center',
  }
})