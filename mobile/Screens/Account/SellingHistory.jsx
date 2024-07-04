import { StyleSheet, View, Text  } from 'react-native'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HeaderStyle, TopTapScrollStyle, TopTabScreenStyle } from "../../constants/globalStyles";
import PostFavourite from '../Favourite/PostFavourite';
import SellerOrderWaitVerify from './SellerOrderWaitVerify';
import SellerOrderDelivering from './SellerOrderDelivering';
import SellerOrderDone from './SellerOrderDone';
import SellerOrderReturn from './SellerOrderReturn';
import SellerOrderWaitGet from './SellerOrderWaitGet';
import SellerOrderCancel from './SellerOrderCancel';
import SellerOrderReturning from './SellerOrderReturning';
import React from 'react'

const Tab = createMaterialTopTabNavigator();

export default function SellingHistory({}) {
  return (
    <Tab.Navigator
      initialRouteName="WaitVerify"
      screenOptions={{
        ...TopTapScrollStyle,
      }}
    >
      <Tab.Screen
        name="WaitVerify"
        component={SellerOrderWaitVerify}
        options={{
          tabBarLabel: "Chờ xác nhận",
          ...TopTabScreenStyle,
        }}
        
      />
      <Tab.Screen
        name="WaitGet"
        component={SellerOrderWaitGet}
        options={{
          tabBarLabel: "Chờ lấy hàng",
          ...TopTabScreenStyle,
        }}
        
      />
      <Tab.Screen
        name="Delivering"
        component={SellerOrderDelivering}
        options={{
          tabBarLabel: "Đang vận chuyển",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Done"
        component={SellerOrderDone}
        options={{
          tabBarLabel: "Hoàn thành",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Return"
        component={SellerOrderReturn}
        options={{
          tabBarLabel: "Trả hàng",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Returning"
        component={SellerOrderReturning}
        options={{
          tabBarLabel: "Đang trả hàng",
          ...TopTabScreenStyle,
        }}
      />
      <Tab.Screen
        name="Cancel"
        component={SellerOrderCancel}
        options={{
          tabBarLabel: "Đơn huỷ",
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