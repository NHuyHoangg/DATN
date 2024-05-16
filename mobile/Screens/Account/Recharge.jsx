import { Component } from 'react';
import { StyleSheet, Text, View, Modal, Image } from 'react-native';
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import LoadingOverlay from '../Overlay/LoadingOverlay';
import ErrorOverlay from '../Overlay/ErrorOverlay';
import { createPayment } from '../../utils/recharge';
import { WebView } from 'react-native-webview';


export default function Recharge(props, navigation) {
  const token = useSelector((state) => state.auth.token);
  const charge = props.route.params.charge;
  // const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [change, setChange] = useState(true);
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState();

  useEffect(() => {
    async function fetchLink() {
      setIsLoading(true);
      try {
        const res = await createPayment(token, charge);
        console.log(res)
        setUrl(res);
        setError(null);
        setTimeLeft(10);
      } catch(err) {
        setError("Không thể tải thông tin");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLink();
  }, [change])

  useEffect(() => {
    if (timeLeft == 0) {
      () => navigation.navigate("Balance");
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // console.log(url)
  // console.log(token)
  // console.log(charge)

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isLoading) return <LoadingOverlay />;

  return (
    <View style={{ flex: 1 }}>
      {success && (
          <Modal animationType="slide" transparent={true} visible={success}>
            <SafeAreaView style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.modalImage}
                  source={require("../../assets/images/Green-Check.png")}
                />
                <Text style={styles.title}>THÀNH CÔNG</Text>
                <Text style={[styles.content]}>
                  Bạn đã thanh toán thành công!
                </Text>
                <Text style={[styles.content]}>
                  {" "}
                  Tự động chuyển đến quản lý số dư trong {timeLeft} giây!
                </Text>
              </View>
            </SafeAreaView>
          </Modal>
        )}

      <WebView source={{ uri: url }} />
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