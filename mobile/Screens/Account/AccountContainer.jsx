import React from "react";
import Account from "./Account";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../Home/Chat";
import { HeaderStyle } from "../../constants/globalStyles";
import DetailInfo from "./DetailInfo";
import SupportPage from "./SupportPage";
import ShoppingHistory from "./ShoppingHistory";
import SellingHistory from "./SellingHistory";
import ChangePassword from "./ChangePassword";
import CreateAddress from "./CreateAddress";
import MyAddress from "./MyAddress";
import ChangeAddress from "./ChangeAdress";
import Review from "./Review";
import Rating from "./Rating"
import OrderInfo from "./OrderInfo";
import Refund from "./Refund";
import RefundDetail from "./RefundDetail";
import Balance from "./Balance";
import Charge from "./Charge";
import Recharge from "./Recharge";
import Auction from "./Auction";
import AuctionJoin from "./AuctionJoin";
import AuctionMine from "./AuctionMine";
import AuctionDetail from "./AuctionDetail";
import WatchDetails from "../../Components/watch/WatchDetails";
import ManageWatch from "./ManageWatch";
import Payment from "../Home/Payment";

const Stack = createNativeStackNavigator();

export default function AccountScreen() {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          ...HeaderStyle,
          title: "Tài khoản",
        }}
      />
      <Stack.Screen
        name="Info"
        component={DetailInfo}
        options={{
          ...HeaderStyle,
          title: "Chi tiết",
        }}
      />
      <Stack.Screen
        name="ShoppingHistory"
        component={ShoppingHistory}
        options={{
          ...HeaderStyle,
          title: "Đơn mua",
        }}
      />
      <Stack.Screen
        name="SellingHistory"
        component={SellingHistory}
        options={{
          ...HeaderStyle,
          title: "Đơn bán",
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportPage}
        options={{
          ...HeaderStyle,
          title: "Hỗ trợ khách hàng",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          ...HeaderStyle,
          title: "Đổi mật khẩu",
        }}
      />
      <Stack.Screen
        name="MyAddress"
        component={MyAddress}
        options={{
          ...HeaderStyle,
          title: "Địa chỉ của tôi",
        }}
      />
      <Stack.Screen
        name="CreateAddress"
        component={CreateAddress}
        options={{
          ...HeaderStyle,
          title: "Tạo địa chỉ",
        }}
      />
      <Stack.Screen
        name="ChangeAddress"
        component={ChangeAddress}
        options={{
          ...HeaderStyle,
          title: "Sửa địa chỉ",
        }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{
          ...HeaderStyle,
          title: "Nhận xét",
        }}
      />
      <Stack.Screen
        name="Rating"
        component={Rating}
        options={{
          ...HeaderStyle,
          title: "Đánh giá",
        }}
      />
      <Stack.Screen
        name="OrderInfo"
        component={OrderInfo}
        options={{
          ...HeaderStyle,
          title: "Thông tin vận chuyển",
        }}
      />
      <Stack.Screen
        name="Refund"
        component={Refund}
        options={{
          ...HeaderStyle,
          title: "Trả hàng",
        }}
      />
      <Stack.Screen
        name="RefundDetail"
        component={RefundDetail}
        options={{
          ...HeaderStyle,
          title: "Chi tiết đơn trả hàng",
        }}
      />
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={{
          ...HeaderStyle,
          title: "Quản lý số dư",
        }}
      />
      <Stack.Screen
        name="Charge"
        component={Charge}
        options={{
          ...HeaderStyle,
          title: "Nạp tiền",
        }}
      />
      <Stack.Screen
        name="Recharge"
        component={Recharge}
        options={{
          ...HeaderStyle,
          title: "Thanh toán",
        }}
      />
      <Stack.Screen
        name="Auction"
        component={Auction}
        options={{
          ...HeaderStyle,
          title: "Đấu giá của tôi",
        }}
      />
      <Stack.Screen
        name="AuctionJoin"
        component={AuctionJoin}
        options={{
          ...HeaderStyle,
          title: "Lịch sử tham gia",
        }}
      />
      <Stack.Screen
        name="AuctionMine"
        component={AuctionMine}
        options={{
          ...HeaderStyle,
          title: "Đấu giá của tôi",
        }}
      />
      <Stack.Screen
        name="AuctionDetail"
        component={AuctionDetail}
        options={{
          ...HeaderStyle,
          title: "Thông tin sản phẩm",
        }}
      />
      <Stack.Screen
        name="WatchDetails"
        component={WatchDetails}
        options={{
          ...HeaderStyle,
          title: "Thông tin sản phẩm",
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
        name="Payment"
        component={Payment}
        options={{
          ...HeaderStyle,
          title: "Xác nhận thanh toán",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
