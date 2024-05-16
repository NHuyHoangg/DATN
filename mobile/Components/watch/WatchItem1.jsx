import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  LogBox,
  ImageBackground,
} from "react-native";
import { useState, memo } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { SimpleLineIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Card1 from "../ui/Card1";
import IconButton from "../ui/IconButton";
import color from "../../constants/color";
import { favoritePostActions } from "../../redux/favorite/favoritePostSlice";
import { useSelector, useDispatch } from "react-redux";
import { deletePostFromFavorite, addPostToFavorite } from "../../utils/watch";
import AdSvg from "../../assets/images/svg/Ad";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const WatchItem1 = memo((props) => {
  const screenType = props.screenType;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const name = props.data.name;
  const nameLen = name.length;
  const token = useSelector((state) => state.auth.token);
  const id = props.data.id;
  const watch_id = props.data.watch_id;
  const [isFavorite, setIsFavourite] = useState(props.data.isFavorite);
  const originalData = props.data;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const synchFetching = () => {};
  let headerName = "";
  if (["favoriteProducts", "home"].includes(screenType))
    headerName = "Chi tiết sản phẩm";
  else if (screenType === "selling") headerName = "Sản phẩm đang bán";
  else if (screenType === "sold") headerName = "Sản phẩm đã bán";
  else if (screenType === "favoritePosts") headerName = "Bảng tin yêu thích";
  else headerName = "Sản phẩm yêu thích";
  const viewWatchPostHandler = () => {
    if (id >= 0) {
      navigation.navigate("WatchDetails", {
        screenType: screenType,
        id: id,
        watch_id: watch_id,
        isFavorite: isFavorite,
        data: props.data,
        title: headerName,
        addFavoritePost: addPostToFavorite,
        deleteFavoritePost: deletePostFromFavorite,
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Bạn vui lòng nhấn tải lại để cập nhật dữ liệu",
        [{ text: "Tải lại", onPress: props.onRefreshing }]
      );
    }
  };

  // const handleVerify = () => {
  //   Alert.alert(
  //     "Thông báo",
  //     "Bạn có muốn gửi yêu cầu kiểm duyệt bài đăng?",
  //     [
  //       {
  //         text: "Hủy",
  //         style: "cancel",
  //       },
  //       { text: "Xác nhận", style: "cancel" },
  //     ]
  //   );
  // };

  const cancelOrder = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn huỷ đơn hàng này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      { text: "Xác nhận", style: "cancel" },
    ]);
  };

  const confirmDoneOrder = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn đã nhận được hàng? Nếu xác nhận, mọi vấn đề về trả hàng sẽ không được chấp nhận!",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        { text: "Xác nhận", style: "cancel" },
      ]
    );
  };

  const changeFavoritesHandler = () => {
    if (isFavorite) {
      Alert.alert("Thông báo", "Bạn có muốn xóa sản phẩm này khỏi danh sách yêu thích không?",
        [
          { text: "Huỷ", style: "cancel" },
          { text: "Xác nhận", onPress: async() => {
            try {
              await deletePostFromFavorite(token, id);
              setIsFavourite(false);
              dispatch(favoritePostActions.remove(id));
            } catch(err) {
              Alert.alert("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại", { text: "Xác nhận" })
            }
          }}
        ]
      )
    } else {
      Alert.alert("Thông báo", "Bạn có muốn thêm sản phẩm này vào danh sách yêu thích không?",
        [
          { text: "Huỷ", style: "cancel" },
          { text: "Xác nhận", onPress: async() => {
            try {
              setIsFavourite(true);
              addPostToFavorite(token, id);
              dispatch(favoritePostActions.add({ ...originalData, isFavorite: true }));
            } catch(err) {
              Alert.alert("Thông báo", "Đã xảy ra lỗi! Vui lòng thử lại", { text: "Xác nhận" })
            }
          }}
        ]
      )
    }
  };

  return (
    <Card1>
      <Pressable 
        style={({ pressed }) => [
          styles.rootContainer,
          pressed ? styles.pressed : null,
        ]}
        onPress={viewWatchPostHandler}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            style={styles.image}
            source={{ uri: props.data.image }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <View
                style={{
                  backgroundColor: color.verify,
                  flexDirection: "row",
                  padding: 3,
                  borderRadius: 5,
                }}
              >
                <Ionicons name="checkmark-circle" size={15} color="white" />
                <Text
                  style={{
                    color: color.white,
                    fontSize: 10,
                    marginLeft: 3,
                    fontFamily: "montserrat-regular",
                  }}
                >
                  Đã kiểm định
                </Text>
              </View>

              {/* <AdSvg /> */}
            </View>
          </ImageBackground>

          <View style={styles.outerContainer}>
            <Text style={[styles.text, styles.name]}>
              {/* {nameLen < 15 ? name : name.slice(0, 15) + "..."} */}
              {name}
            </Text>
            <Text style={[styles.text, styles.price]}>
              {props.data.formatted_price || (<Text>{props.data.price} đ</Text>)}
            </Text>

            {screenType == "favoritePosts" && (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <IconButton
                  icon={isFavorite ? "heart" : "hearto"}
                  color={isFavorite ? color.red : color.baemin1}
                  onPress={changeFavoritesHandler}
                  size={28}
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    styles.buttonGreen,
                    pressed ? styles.pressed : null,
                    {marginLeft: "7%"}
                  ]}
                  onPress={() => navigation.navigate("Payment", { props: props.data })}
                >
                  <Text style={[styles.buttonText]}>Mua</Text>
                </Pressable>
              </View>
            )}

            {screenType == "selling" && (
                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
                  {/* <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.buttonRed,
                      {backgroundColor: color.verify},
                      pressed ? styles.pressed : null,
                    ]}
                    onPress={handleVerify}
                  >
                    <Text style={[styles.buttonText]}>Kiểm định</Text>
                  </Pressable> */}

                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.buttonRed,
                      pressed ? styles.pressed : null,
                    ]}
                    onPress={() => navigation.navigate("ChooseAd", { props })}
                  >
                    <Text style={[styles.buttonText]}>Đẩy tin</Text>
                  </Pressable>
                </View>
              )}

            {[
              "delivering",
              "done",
              "return",
              "sellerDelivering",
              "sellerDone",
              "sellerReturn",
            ].includes(screenType) && (
              <Pressable
                style={({ pressed }) => [
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingTop: 8,
                  },
                  pressed ? styles.pressed : null,
                ]}
                onPress={() => navigation.navigate("OrderInfo", { props })}
              >
                <Feather name="truck" size={15} color={color.baemin1} />
                <Text style={styles.detailText}>Xem trạng thái đơn hàng</Text>
              </Pressable>
            )}

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              {screenType == "waitGet" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    styles.buttonGreen,
                    pressed ? styles.pressed : null,
                  ]}
                  // onPress={}
                >
                  <Text style={[styles.buttonText]}>Thanh toán</Text>
                </Pressable>
              )}

              {screenType == "waitVerify" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    styles.buttonRed,
                    pressed ? styles.pressed : null,
                  ]}
                  onPress={cancelOrder}
                >
                  <Text style={[styles.buttonText]}>Huỷ</Text>
                </Pressable>
              )}

              {screenType == "sellerWaitVerify" && (
                <>
                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.buttonRed,
                      pressed ? styles.pressed : null,
                    ]}
                    onPress={cancelOrder}
                  >
                    <Text style={[styles.buttonText]}>Huỷ</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.buttonGreen,
                      pressed ? styles.pressed : null,
                    ]}
                    // onPress={}
                  >
                    <Text style={[styles.buttonText]}>Xác nhận</Text>
                  </Pressable>
                </>
              )}

              {screenType == "delivering" && (
                <>
                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.buttonRed,
                      pressed ? styles.pressed : null,
                    ]}
                    onPress={() => navigation.navigate("Refund", { props })}
                  >
                    <Text style={[styles.buttonText]}>Trả hàng</Text>
                  </Pressable>

                  <Pressable
                    style={({ pressed }) => [
                      styles.button,
                      styles.buttonGreen,
                      pressed ? styles.pressed : null,
                    ]}
                    onPress={confirmDoneOrder}
                  >
                    <Text style={[styles.buttonText]}>Đã nhận</Text>
                  </Pressable>
                </>
              )}

              {screenType == "return" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    styles.buttonGreen,
                    pressed ? styles.pressed : null,
                  ]}
                  onPress={() => navigation.navigate("RefundDetail", { props })}
                >
                  <Text style={[styles.buttonText]}>Xem chi tiết</Text>
                </Pressable>
              )}

              {screenType == "sellerReturn" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    styles.buttonGreen,
                    pressed ? styles.pressed : null,
                  ]}
                  onPress={() =>
                    navigation.navigate("RefundDetail", {
                      props,
                      isSeller: true,
                    })
                  }
                >
                  <Text style={[styles.buttonText]}>Xem chi tiết</Text>
                </Pressable>
              )}

              {screenType == "done" && (
                <Pressable
                  style={({ pressed }) => [
                    styles.button,
                    styles.buttonGreen,
                    pressed ? styles.pressed : null,
                  ]}
                  onPress={() => navigation.navigate("Rating", { props })}
                >
                  <Text style={[styles.buttonText]}>Đánh giá</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Card1>
  );
});

export default WatchItem1;

const styles = StyleSheet.create({
  rootContainer: {
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: 130,
    height: 130,
    resizeMode: "cover",
  },
  pressed: {
    opacity: 0.5,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    // paddingVertical: "4%",
    width: "100%",
    // backgroundColor: "green",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
    padding: 0,
    marginHorizontal: "5%",
  },
  detailContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: "0%",
  },
  detailText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: color.baemin1,
    paddingHorizontal: 0,
    paddingLeft: 5,
  },
  icon: {
    marginRight: "2.5%",
  },
  price: {
    textAlign: "center",
  },
  name: {
    // marginTop: "-5%",
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "montserrat-semi-bold",
    color: "white",
    textAlign: "center",
  },
  button: {
    height: 30,
    width: "40%",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
  },
  buttonGreen: {
    backgroundColor: color.baemin2,
  },
  buttonRed: {
    backgroundColor: color.red,
  },
  buttonGray: {
    backgroundColor: color.gray,
  },
});
