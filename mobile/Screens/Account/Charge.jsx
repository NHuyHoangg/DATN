import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";

import LoadingOverlay from "../Overlay/LoadingOverlay";
import EmptyTrans from "../Overlay/EmptyTrans";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import RadioGroup from "react-native-radio-buttons-group";
import CurrencyInput from "react-native-currency-input";
import color from "../../constants/color";

export default function Charge({ route, navigation }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);
  const [charge, setCharge] = useState();
  const [isPayment, setIsPayment] = useState("1");

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Thanh toán qua VNPay",
        value: 0,
        color: color.baemin2,
        labelStyle: { fontFamily: "montserrat-light", fontSize: 12 },
        size: 20,
      },
    ],
    []
  );
  const onChangeCharge = (value) => {
    setCharge(value);
  };

  const onChangeInfo = () => {
    if (!charge) {
      Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập số tiền cần nạp.");
      return;
    }

    if (charge < 50000) {
      Alert.alert(
        "Xảy ra lỗi!!!",
        "Vui lòng nhập số tiền lớn hơn mức tối thiểu."
      );
      return;
    }

    Alert.alert("Xác nhận", "Xác nhận thanh toán?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      { text: "Xác nhận", onPress: () => sendCharge() },
    ]);
  };

  const sendCharge = async () => {
    navigation.navigate("Recharge", { charge, isCharge: true });
  };

  const [isLoading, setIsLoading] = useState();
  // useEffect(() => {
  //   async function fetchData() {
  //     setIsLoading(true);
  //     try {
  //       const res = await getAddress(token);
  //       setDataAddress(res);
  //       setError(null);
  //     } catch (error) {
  //       setError("Không thể tải thông tin");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   if (isAuthenticated) fetchData();
  // }, [change]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isLoading) return <LoadingOverlay />;

  console.log(charge);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>Nhập số tiền cần nạp</Text>
          {/* <TextInput
            style={styles.input}
            placeholder="50.000 đ"
						value={charge}
            inputMode="numeric"
            onChangeText={onChangeCharge}
          /> */}
          <CurrencyInput
            value={charge}
            placeholder="00.000đ"
            onChangeValue={setCharge}
						style={styles.input}
            minValue={0}
						precision={0}
          />
          <Text style={styles.min}>Tối thiểu 50.000 đ</Text>
        </View>

        <View style={styles.divider}></View>

        <View
          style={{
            paddingBottom: "5%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: "5%",
            }}
          >
            <Ionicons name="cash-outline" size={20} color={color.baemin1} />
            <Text style={styles.textPay}>Phương thức thanh toán</Text>
          </View>
          <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setIsPayment}
              selectedId={isPayment}
              containerStyle={{ alignItems: "flex-start" }}
            />
          </View>
        </View>

        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.submit,
            pressed ? styles.pressed : null,
          ]}
          onPress={onChangeInfo}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </Pressable>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
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
  name: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 16,
  },
  nameContainer: {
    paddingVertical: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 14,
    paddingVertical: "4%",
  },
  textMargin: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    paddingVertical: "0.5%",
    marginBottom: "3%",
  },
  input: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E1E1E1",
    paddingHorizontal: "4%",
    width: "95%",
    marginBottom: 10,
    marginHorizontal: 10,
    // color: "#E1E1E1",
    color: color.baemin2,
    textAlign: "center",
    fontSize: 64,
    fontFamily: "montserrat-bold",
  },
  defaultContainer: {
    alignItems: "flex-end",
  },
  default: {
    borderWidth: 1,
    borderColor: color.baemin2,
    padding: "1%",
    width: "20%",
  },
  defaultText: {
    color: color.baemin2,
    fontFamily: "montserrat-medium",
    fontSize: 10,
    textAlign: "center",
  },
  balance: {
    color: color.baemin2,
    fontFamily: "montserrat-bold",
    fontSize: 64,
    textAlign: "center",
  },
  divider: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
    margin: 10,
  },
  min: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    paddingVertical: "1%",
    // color: "#E1E1E1",
  },
  textPay: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 16,
    marginHorizontal: "3%",
    color: color.baemin1,
  },
});
