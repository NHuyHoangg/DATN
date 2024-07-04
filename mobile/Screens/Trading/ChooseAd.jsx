import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import LoadingOverlay from "../Overlay/LoadingOverlay";
import EmptyAddress from "../Overlay/EmptyAddress";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import RadioGroup from "react-native-radio-buttons-group";
import color from "../../constants/color";
import { getAds, useAds } from "../../utils/ads";

// const dataAd = [
//   { id: "1", name: "Gói đẩy tin 3 ngày", price: "10.000đ", num: "10000", description: "Tin đăng của bạn sẽ được đầy 3 lần trong 3 ngày sau khi thanh toán thành công." },
//   { id: "2", name: "Gói đẩy tin 5 ngày", price: "25.000đ", num: "25000", description: "Tin đăng của bạn sẽ được đầy 5 lần trong 5 ngày sau khi thanh toán thành công." },
//   { id: "3", name: "Gói đẩy tin 7 ngày", price: "50.000đ", num: "50000", description: "Tin đăng của bạn sẽ được đầy 7 lần trong 7 ngày sau khi thanh toán thành công." },
// ]

export default function ChooseAd({ route, navigation }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

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

  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);
  const [isPayment, setIsPayment] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(0);
  const [charge, setCharge] = useState(10000);
  const [exp, setExp] = useState(1);
  const [dataAd, setDataAd] = useState([]);

  const selectedIcon = (
    <Ionicons name="radio-button-on-outline" size={25} color={color.baemin1} />
  );
  const unselectedIcon = (
    <Ionicons name="radio-button-off-sharp" size={25} color={color.baemin1} />
  );

  const isEqual = (obj1, obj2) => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) return false;
    }
    return true;
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await getAds();
        console.log(res)
        if (res) {
          setDataAd(res);
          // setCharge(dataAd[0].price);
          setError(null);
        }
      } catch (error) {
        setError("Không thể tải thông tin");
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) fetchData();
  }, [change]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isLoading) return <LoadingOverlay />;

  console.log(charge)
  console.log(exp)
  console.log(route.params.props.id)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        {dataAd.length > 0 ? (dataAd.map((ad, index) => (
          
          <Pressable
            key={index}
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              styles.input,
              pressed ? styles.pressed : null,
            ]}
						onPress={() => {
              setSelectedOption(index);
              setCharge(dataAd[index].price);
              setExp(dataAd[index].expiration_day)
            }}
          >
            {selectedOption == index ? selectedIcon : unselectedIcon}
            
            <View style={{flex: 1, paddingHorizontal: 10}}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{ad.name}</Text>
              </View>

              <Text style={[styles.text, {fontFamily: "montserrat-semi-bold"}]}>{new Intl.NumberFormat(["ban", "id"]).format(ad.price)}đ</Text>
              <Text style={styles.textMargin}>
                {ad.description}
              </Text>
            </View>
          </Pressable>
        ))): (<EmptyAddress />)}

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
            <Text style={{fontFamily: "montserrat-semi-bold", fontSize: 16, marginHorizontal: "3%", color: color.baemin1,}}>
              Phương thức thanh toán
            </Text>
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
          onPress={async () => {
              try {
                await useAds(token, route.params.props.id, exp);
                console.log(route.params.props.id, exp)
                navigation.navigate("Recharge", { charge, isAd: true });
              } catch (err) {
                setError("Có lỗi xảy ra trong quá trình thanh toán");
              }
            }
          }
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
    color: color.baemin1,
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
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E1E1E1",
    paddingHorizontal: "4%",
    marginBottom: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  defaultContainer: {
    alignItems: "flex-end",
  },
  default: {
    borderWidth: 1,
    borderColor: color.baemin2,
    padding: "1%",
    marginVertical: "3%",
    width: "20%",
  },
  defaultText: {
    color: color.baemin2,
    fontFamily: "montserrat-medium",
    fontSize: 10,
    textAlign: "center",
  },
});
