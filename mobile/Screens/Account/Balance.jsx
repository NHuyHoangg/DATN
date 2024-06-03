import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";

import LoadingOverlay from "../Overlay/LoadingOverlay";
import EmptyTrans from "../Overlay/EmptyTrans";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import color from "../../constants/color";

const dataBalance = [
  {
    des: "Nạp tiền từ ví VNpay",
    balance: "+50.000đ",
    time: "9:53 12-11-2023",
    isDone: 1,
  },
  {
    des: "Thanh toán gói đẩy tin 1",
    balance: "-50.000đ",
    time: "9:53 12-11-2023",
    isDone: 1,
  },
  {
    des: "Thanh toán gói đẩy tin 1",
    balance: "-50.000đ",
    time: "9:53 12-11-2023",
    isDone: 0,
  },
  {
    des: "Nạp tiền từ ví VNpay",
    balance: "+50.000đ",
    time: "9:53 12-11-2023",
    isDone: 1,
  },
  {
    des: "Thanh toán gói đẩy tin 1",
    balance: "-50.000đ",
    time: "9:53 12-11-2023",
    isDone: 0,
  },
  {
    des: "Nạp tiền từ ví VNpay",
    balance: "+50.000đ",
    time: "9:53 12-11-2023",
    isDone: 1,
  },
];

export default function Balance({ route, navigation }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.balance}>230.000 đ</Text>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              styles.submit,
              pressed ? styles.pressed : null,
            ]}
            onPress={() =>
              navigation.navigate("Charge")
            }
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Ionicons
                name="wallet-outline"
                size={20}
                color={color.background_white}
              />
              <Text style={[styles.buttonText, { marginLeft: 10 }]}>
                Nạp tiền
              </Text>
            </View>
          </Pressable>
        </View>
        <Text style={[styles.name, { marginLeft: "4%", marginVertical: 10 }]}>
          Biến động số dư
        </Text>
        {dataBalance.length > 0 ? (
          dataBalance.map((data, index) => (
            <View style={styles.input}>
              <View style={styles.nameContainer}>
                <Text style={[styles.name, { width: "70%" }]}>{data.des}</Text>
                {data.balance[0] == "+" ? (
                  <Text style={[styles.name, { color: color.baemin2 }]}>
                    {data.balance}
                  </Text>
                ) : (
                  <Text style={[styles.name, { color: color.red }]}>
                    {data.balance}
                  </Text>
                )}
              </View>

              {/* <Text style={styles.text}>{data.time}</Text> */}

              {data.isDone == "1" ? (
                <View style={styles.nameContainer}>
                  <Text style={styles.text}>{data.time}</Text>
                  <View style={styles.default}>
                    <Text style={styles.defaultText}>Thành công</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.nameContainer}>
                  <Text style={styles.text}>{data.time}</Text>
                  <View style={[styles.default, { borderColor: color.red }]}>
                    <Text style={[styles.defaultText, { color: color.red }]}>
                      Thất bại
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))
        ) : (
          <EmptyTrans />
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    backgroundColor: "white",
  },
  submit: {
    backgroundColor: color.baemin2,
    height: 40,
    width: "50%",
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
    fontSize: 16,
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
    fontFamily: "montserrat-regular",
    fontSize: 12,
    paddingVertical: "0.5%",
  },
  textMargin: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    paddingVertical: "0.5%",
    marginBottom: "3%",
  },
  input: {
    borderWidth: 1,
    // borderRadius: 6,
    borderColor: "#E1E1E1",
    paddingHorizontal: "4%",
    // marginBottom: 10,
    // marginHorizontal: 10,
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
});
