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
import { AntDesign } from "@expo/vector-icons";
import {
  SimpleLineIcons,
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Card from "../ui/Card";
import color from "../../constants/color";
import { favoritePostActions } from "../../redux/favorite/favoritePostSlice";
import { useSelector, useDispatch } from "react-redux";
import { deletePostFromFavorite, addPostToFavorite } from "../../utils/watch";
import AdSvg from "../../assets/images/svg/Ad";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const WatchItem = memo((props) => {
  // console.log("WatchItem.jsx");
  const screenType = props.screenType;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const name = props.data.name;
  const nameLen = name.length;
  const token = useSelector((state) => state.auth.token);
  const id = props.data.id;
  const watch_id = props.data.watch_id;
  const [isFavorite, setIsFavourite] = useState(props.data.isFavorite);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log(props);

  const synchFetching = () => {};
  let headerName = "";
  if (
    [
      "favoriteProducts",
      "home",
      "auctionInProgress",
      "auctionDone",
      "auctionJoin",
    ].includes(screenType)
  )
    headerName = "Chi tiết sản phẩm";
  else if (screenType === "selling") headerName = "Sản phẩm đang bán";
  else if (screenType === "sold") headerName = "Sản phẩm đã bán";
  else if (screenType === "favoritePosts") headerName = "Bảng tin yêu thích";
  else headerName = "Thông tin sản phẩm";
  const viewWatchPostHandler = () => {
    if (id >= 0) {
      navigation.navigate("WatchDetails", {
        screenType: screenType,
        id: id,
        watch_id: watch_id,
        isFavorite: isFavorite,
        data: props.data,
        title: headerName,
        addFavoritePost: addFavoritePost,
        deleteFavoritePost: deleteFavoritePost,
      });
    } else {
      Alert.alert(
        "Thông báo",
        "Bạn vui lòng nhấn tải lại để cập nhật dữ liệu",
        [{ text: "Tải lại", onPress: props.onRefreshing }]
      );
    }
  };

  const addFavoritePost = async (token, id) => {
    try {
      setIsFavourite(true);
      const data = await addPostToFavorite(token, id);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFavoritePost = async (token, id) => {
    try {
      setIsFavourite(false);
      const data = await deletePostFromFavorite(token, id);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(props.data);

  return (
    <Card>
      <Pressable
        style={({ pressed }) => [
          styles.rootContainer,
          pressed ? styles.pressed : null,
        ]}
        onPress={viewWatchPostHandler}
      >
        <View>
          <ImageBackground
            style={styles.image}
            source={{ uri: props.data.image }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {props.data.is_verified && props.data.is_verified !== 0 ? (
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
              ) : null}

              {props.data.is_ads && props.data.is_ads !== '0' ? (
                <AdSvg height={30} width={30} />
              ) : null}
            </View>
          </ImageBackground>
        </View>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            <Text style={[styles.text, styles.name]}>
              {nameLen < 15 ? name : name.slice(0, 15) + "..."}
            </Text>
          </View>
          <View style={styles.innerContainer}>
            <Text style={[styles.text, styles.price]}>
              {props.data.formatted_price || <Text>{props.data.price} đ</Text>}
            </Text>
          </View>
          <View style={styles.innerContainer}>
            <View style={[styles.detailsContainer, styles.price]}>
              <View style={styles.detailContainer}>
                <Ionicons
                  name="time-outline"
                  size={10}
                  color={color.gray}
                  style={styles.icon}
                />
                <Text style={styles.detailText}>
                  {props.data.date || props.data.end}
                </Text>
              </View>
              <View style={styles.detailContainer}>
                <SimpleLineIcons
                  name="location-pin"
                  size={10}
                  color={color.gray}
                  style={styles.icon}
                />
                <Text style={styles.detailText}>
                  {props.data.location || "Chưa có"}
                </Text>
              </View>
            </View>

            {["auctionDone", "auctionInProgress"].includes(screenType) && (
              <View style={[styles.detailsContainer, styles.price]}>
                <View style={styles.detailContainer}>
                  <MaterialIcons
                    name="attach-money"
                    size={10}
                    color={color.gray}
                    style={styles.icon}
                  />
                  <Text style={styles.detailText}>1.000.000 đ</Text>
                </View>
                <View style={styles.detailContainer}>
                  <MaterialCommunityIcons
                    name="cash-plus"
                    size={10}
                    color={color.gray}
                    style={styles.icon}
                  />
                  <Text style={styles.detailText}>200.000 đ</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </Card>
  );
});

export default WatchItem;

const styles = StyleSheet.create({
  rootContainer: {
    overflow: "hidden",
    alignItems: "center",
    // flexDirection: "row",
    // backgroundColor: "gray",
    borderRadius: 8,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "cover",
  },
  pressed: {
    opacity: 0.5,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingVertical: "4%",
    width: "100%",
    // backgroundColor: 'green'
  },
  innerContainer: {
    // marginLeft: "5%",
    // backgroundColor: "red",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-semi-bold",
    padding: 2,
    marginHorizontal: "5%",
    // backgroundColor: "green",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: "5%",
    marginVertical: "1.5%",
  },
  detailContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "0%",
  },
  detailText: {
    fontFamily: "montserrat-regular",
    fontSize: 10,
    color: color.gray,
    paddingHorizontal: 0,
  },
  icon: {
    marginRight: "2.5%",
  },
  price: {
    textAlign: "center",
  },
  name: {
    marginTop: "-5%",
  },
  heartIcon: {
    position: "absolute",
    right: "2.5%",
    top: "5%",
  },
});
