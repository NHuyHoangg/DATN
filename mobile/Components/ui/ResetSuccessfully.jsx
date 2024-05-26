import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Button from "./Button";
import color from "../../constants/color";

export default function ResetSuccessfully({ email, onPress }) {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 100,
          height: 100,
          marginTop: "30%",
          alignSelf: "center",
        }}
        source={require("../../assets/images/splash.png")}
      ></Image>
      <Text style={styles.status}>Thành công!</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Mật khẩu mới của bạn đã được gửi tới địa chỉ:
        </Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.content}>Vui lòng đăng nhập để tiếp tục</Text>
        <Button
          rippleColor="#afafaf"
          marX="10%"
          marY="2%"
          color={color.baemin1}
          borR={1}
          onPress={onPress}
        >
          Đăng nhập
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  status: {
    fontSize: 24,
    fontFamily: "montserrat-bold",
    marginVertical: "2%",
    alignSelf: "center",
    color: color.baemin1,
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: "#cdcdcd",
    marginVertical: "2%",
    marginHorizontal: "10%",
    padding: "5%",
  },
  title: {
    fontSize: 20,
    fontFamily: "montserrat-medium",
    color: "grey",
    textAlign: "left",
    marginVertical: "1%",
  },
  email: {
    fontSize: 16,
    fontFamily: "montserrat-medium",
    color: "#000000",
    alignSelf: "center",
    marginVertical: "2%",
    textDecorationLine: "underline",
    color: color.baemin1,
  },
  content: {
    marginVertical: "2%",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    color: "grey",
    alignSelf: "center",
  },
});
