import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import { isValidEmail, isValidPhoneNumber } from "../../utils/inputValidation";
import { changeUser } from "../../utils/user";
import SellerInfoSection from "./Component/SellerInfoSection";
import PickImageModal from "./Component/PickImageModal";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import { userActions } from "../../redux/user/userSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import color from "../../constants/color";

export default function DetailInfo({ route, navigation }) {
  const { data, setData } = route.params;
  const token = useSelector((state) => state.auth.token);
  const isSeller = useSelector((state) => state.user.isSeller);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const [last_name, setLastName] = useState(data.last_name);
  const [first_name, setFirstName] = useState(data.first_name);
  const [phone, setPhone] = useState(data.phone);
  const [email, setEmail] = useState(data.email);
  const [avatar, setImage] = useState(data.avatar);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeLastName = (value) => {
    setLastName(value);
  };

  const onChangeFirstName = (value) => {
    setFirstName(value);
  };

  const onChangePhone = (value) => {
    setPhone(value);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangeInfo = () => {
    if (!first_name || !last_name || !phone || !email) {
      Alert.alert("Xảy ra lỗi!!!", "Vui lòng điền đầy đủ hết các trường.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập email hợp lệ.");
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập SĐT hợp lệ.");
      return;
    }

    Alert.alert("Xác nhận", "Bạn có muốn lưu những thay đổi vừa nãy?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      { text: "Xác nhận", onPress: () => sendInfo() },
    ]);
  };

  // Gửi request tới server
  const sendInfo = async () => {
    setIsLoading(true)
    const info = {};

    if (avatar != data.avatar) info.avatar = avatar;
    if (last_name != data.last_name) info.last_name = last_name;
    if (first_name != data.first_name) info.first_name = first_name;
    if (phone != data.phone) info.phone = phone;
    if (email != data.email) info.email = email;
    // if (province != data.province) info.province = province;
    // if (district != data.district) info.district = district;
    // if (ward != data.ward) info.ward = ward;
    // if (address != data.address) info.address = address;

    // if (Object.keys(info).length === 0) {
    //   return;
    // }

    const res = await changeUser(token, info);

    if (res != 200) {
      Alert.alert("Xảy ra lỗi!!!", "Gửi yêu cầu không thành công.");
      return;
    }

    // if (info.ward && info.address) {
    //   dispatch(userActions.validateSeller());
    // }

    const newData = { ...data, ...info };
    setData(newData);
    navigation.navigate("Account");
  };

  if (isLoading) return <LoadingOverlay />

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        <PickImageModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setImage={setImage}
        />

        {/********Ảnh đại diện ******/}
        <View style={styles.infoViewStyle}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.imageStyle} />
          ) : (
            <Ionicons
              name="person-circle-outline"
              size={180}
              color={color.baemin2}
            />
          )}
          <View style={{ flexDirection: "column", width: "100%" }}>
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={({ pressed }) => [
                styles.changeAvatarButton,
                pressed ? styles.pressed : null,
              ]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Thay đổi ảnh đại diện</Text>
            </Pressable>
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={({ pressed }) => [
                styles.changeAvatarButton,
                pressed ? styles.pressed : null,
              ]}
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Text style={styles.buttonText}>Đổi mật khẩu </Text>
            </Pressable>
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={({ pressed }) => [
                styles.changeAvatarButton,
                pressed ? styles.pressed : null,
              ]}
              onPress={() => navigation.navigate("MyAddress")}
            >
              <Text style={styles.buttonText}>Địa chỉ của tôi </Text>
            </Pressable>
          </View>
        </View>

        {/*** Thông tin cá nhân ***/}
        <View style={styles.divider}></View>
        <Text style={styles.h1}>Thông tin cá nhân</Text>

        <Text style={styles.text}>Họ</Text>
        <TextInput
          style={styles.input}
          value={last_name}
          onChangeText={onChangeLastName}
        />

        <Text style={styles.text}>Tên</Text>
        <TextInput
          style={styles.input}
          value={first_name}
          onChangeText={onChangeFirstName}
        />

        <Text style={styles.text}>Số điện thoại</Text>
        <TextInput
          value={phone}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={onChangePhone}
        />

        <Text style={styles.text}>Email</Text>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={onChangeEmail}
        />

        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.submit,
            pressed ? styles.pressed : null,
          ]}
          onPress={onChangeInfo}
        >
          <Text style={styles.buttonText}>Xác nhận </Text>
        </Pressable>

        {/*** Thông tin người bán */}
        {/* <SellerInfoSection
        styles={styles}
        editable={editable}
        location={location}
        data={data}
      /> */}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    backgroundColor: "white",
  },
  infoViewStyle: {
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: "4%",
    flexDirection: "row",
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 90,
    marginHorizontal: "4%",
  },
  name: {
    paddingVertical: "5%",
    fontFamily: "montserrat-semi-bold",
    fontSize: 20,
  },
  changeAvatarButton: {
    backgroundColor: color.baemin2,
    height: 35,
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  submit: {
    backgroundColor: color.baemin2,
    height: 40,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    marginVertical: 20,
  },
  pressed: {
    opacity: 0.2,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "montserrat-semi-bold",
    color: "white",
  },
  divider: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
  },
  h1: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 18,
    paddingHorizontal: "4%",
    paddingTop: "3%",
  },
  text: {
    fontFamily: "montserrat-medium",
    fontSize: 15,
    paddingLeft: "4%",
    paddingVertical: "3%",
  },
  input: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E1E1E1",
    height: 37,
    paddingHorizontal: "4%",
    marginHorizontal: 10,
    fontFamily: "montserrat-light",
    fontSize: 16,
  },
  addVerticalSpace: {
    height: 20,
  },
  passwordInput: {
    flex: 1,
    fontFamily: "montserrat-light",
    fontSize: 14,
  },
  passwordInputHint: {
    fontFamily: "montserrat-light",
    fontSize: 14,
  },
  passwordContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
