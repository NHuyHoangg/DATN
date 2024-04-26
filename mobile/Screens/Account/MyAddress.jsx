import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import LoadingOverlay from "../Overlay/LoadingOverlay";
import color from "../../constants/color";
import { getAddress } from "../../utils/location";

export default function MyAddress({ route, navigation }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [dataAddress, setDataAddress] = useState([]);
	const [address, setAddress] = useState({})
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await getAddress(token);
        setDataAddress(res);
        setError(null);
      } catch (error) {
        setError("Không thể tải thông tin");
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) fetchData();
  }, [change, address]);

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
        {dataAddress.map((address, index) => (
          <Pressable
            key={index}
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
              styles.input,
              pressed ? styles.pressed : null,
            ]}
						onPress={() => navigation.navigate("ChangeAddress", { address, setAddress })}
          >
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{address.name}</Text>
              <Text style={styles.name}>{address.phone_number}</Text>
            </View>

            <Text style={styles.text}>{address.street}</Text>
            <Text style={[address.is_default == "1" ? styles.text : styles.textMargin]}>
              {address.ward_name}, {address.district_name}, {address.province_name}
            </Text>

            {address.is_default == "1" && (
              <View style={styles.defaultContainer}>
                <View style={styles.default}>
                  <Text style={styles.defaultText}>Mặc định</Text>
                </View>
              </View>
            )}
          </Pressable>
        ))}

        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.submit,
            pressed ? styles.pressed : null,
          ]}
          onPress={() => navigation.navigate("CreateAddress", { address, setAddress })}
        >
          <Text style={styles.buttonText}>Thêm địa chỉ mới</Text>
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
