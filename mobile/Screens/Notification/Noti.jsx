import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { getFavoritePosts } from "../../utils/favourite";
import { favoritePostActions } from "../../redux/favorite/favoritePostSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import color from "../../constants/color";

const dataNoti = [
  {
    uri: "https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
    title: "Đơn hàng đã được giao thành công!",
    description:
      "Đơn hàng với mã vận đơn HFJSKNV đã được giao thành công. Hãy đánh giá đơn hàng ngay nhé!",
    date: "12:59 27/02/2024",
  },
  {
    uri: "https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
    title: "Đơn hàng đã được giao thành công!",
    description:
      "Đơn hàng với mã vận đơn HFJSKNV đã được giao thành công. Hãy đánh giá đơn hàng ngay nhé!",
    date: "12:59 27/02/2024",
  },
  {
    uri: "https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
    title: "Đơn hàng đã được giao thành công!",
    description:
      "Đơn hàng với mã vận đơn HFJSKNV đã được giao thành công. Hãy đánh giá đơn hàng ngay nhé!",
    date: "12:59 27/02/2024",
  },
  {
    uri: "https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
    title: "Đơn hàng đã được giao thành công!",
    description:
      "Đơn hàng với mã vận đơn HFJSKNV đã được giao thành công. Hãy đánh giá đơn hàng ngay nhé!",
    date: "12:59 27/02/2024",
  },
  {
    uri: "https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
    title: "Đơn hàng đã được giao thành công!",
    description:
      "Đơn hàng với mã vận đơn HFJSKNV đã được giao thành công. Hãy đánh giá đơn hàng ngay nhé!",
    date: "12:59 27/02/2024",
  },
  {
    uri: "https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
    title: "Đơn hàng đã được giao thành công!",
    description:
      "Đơn hàng với mã vận đơn HFJSKNV đã được giao thành công. Hãy đánh giá đơn hàng ngay nhé!",
    date: "12:59 27/02/2024",
  },
  {
    uri: "https://media.shopdongho.com/2023/04/dong-ho-Casio-MTP-VT01L-1BUDF-1.jpg",
    title: "Đơn hàng đã được giao thành công!",
    description:
      "Đơn hàng với mã vận đơn HFJSKNV đã được giao thành công. Hãy đánh giá đơn hàng ngay nhé!",
    date: "12:59 27/02/2024",
  },
];

export default function Noti({ route, navigation }) {
  const found = useSelector((state) => state.favoritePost.found);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [change, setChange] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const onRefreshing = () => {
    setRefreshing(true);
    setChange(!change);
  };

  const handleRead = () => {
    Alert.alert("Xác nhận", "Bạn có muốn đánh dấu đã đọc hết thông báo?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xác nhận",
        onPress: () => {
          setChange(!change);
        },
      },
    ]);
  };

  useEffect(() => {
    async function getData() {
      setIsFetching(true);
      try {
        const favouritePost = await getFavoritePosts(token);
        dispatch(favoritePostActions.set(favouritePost));
        setError(null);
      } catch (error) {
        setError("Không thể tải thông tin");
      } finally {
        setRefreshing(false);
        setIsFetching(false);
      }
    }

    getData();
  }, [change]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        <Pressable onPress={handleRead} style={styles.readContainer}>
          <Ionicons
            name="checkmark-done-sharp"
            size={20}
            color={color.baemin1}
          />
          <Text style={styles.read}>Đánh dấu đã đọc tất cả</Text>
        </Pressable>

        {dataNoti.length > 0 ? (
          dataNoti.map((noti, index) => (
            <Pressable
              key={index}
              android_ripple={{ color: "#ccc" }}
              style={({ pressed }) => [
                styles.input,
                pressed ? styles.pressed : null,
              ]}
              // onPress={() => navigation.navigate("ChangeAddress", { address, setAddress })}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ImageBackground
                  style={styles.image}
                  source={{ uri: noti.uri }}
                />

                <View style={styles.outerContainer}>
                  <Text style={[styles.text, styles.name]}>{noti.title}</Text>
                  <Text style={[styles.text, styles.price]}>
                    {noti.description}
                  </Text>
                  <Text style={[styles.text, styles.price, { fontSize: 10 }]}>
                    {noti.date}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))
        ) : (
          <ErrorOverlay />
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "white",
  },
  pressed: {
    opacity: 0.2,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 16,
  },
  text: {
    textAlign: "left",
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    marginHorizontal: "5%",
  },
  price: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    paddingTop: 10,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  read: {
    textAlign: "right",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    marginHorizontal: "5%",
    color: color.baemin1,
  },
  readContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  input: {
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
    padding: 10,
    // marginBottom: 5,
    backgroundColor: color.border_gray,
  },
});
