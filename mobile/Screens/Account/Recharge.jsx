import { Component } from "react";
import { StyleSheet, Text, View, Modal, Image } from "react-native";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import { createPayment } from "../../utils/recharge";
import { WebView } from "react-native-webview";

export default function Recharge(props) {
  const token = useSelector((state) => state.auth.token);
  const charge = props.route.params.charge;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [change, setChange] = useState(true);
  const [url, setUrl] = useState("");

  const jsCode = `
    setInterval(() => {
      window.ReactNativeWebView.postMessage(JSON.stringify({type: "location", href: window.location.href}));
    }, 1000);
  `;

  const onMsg = (event) => {
    const res = JSON.parse(event.nativeEvent.data);
    if (res.type === "location" && res.href.includes("https://dho.hcmut.tech/")) {
      if (props.route.params.isCharge)
        navigation.navigate("Balance");
      else if (props.route.params.isAd)
        navigation.navigate("Trading");
      else
        navigation.navigate("ShoppingHistory");
    }
  };

  useEffect(() => {
    async function fetchLink() {
      setIsLoading(true);
      try {
        const res = await createPayment(token, charge);
        console.log(res);
        setUrl(res);
        setError(null);
      } catch (err) {
        setError("Không thể tải thông tin");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLink();
  }, [change]);

  // console.log(url)
  // console.log(token)
  // console.log(charge)
  // console.log(props.route.params.isCharge)
  // console.log(props.route.params.isAd)
  console.log(props.route.params)

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isLoading) return <LoadingOverlay />;

  return (
    <View style={{ flex: 1 }}>
      <WebView 
        source={{ uri: url }}
        androidHardwareAccelerationDisabled
        javaScriptEnabled
        injectedJavaScript={jsCode}
        javaScriptCanOpenWindowsAutomatically
        collapsable
        onMessage={onMsg}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "35%",
    resizeMode: "cover",
  },
  modalImage: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    backgroundColor: "white",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "20%",
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    marginVertical: "1%",
  },
  content: {
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    marginVertical: "1%",
  },
});
