import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Card from "../ui/Card";
import color from "../../constants/color";
import LoadingOverlay from "../../Screens/Overlay/LoadingOverlay";
import ErrorOverlay from "../../Screens/Overlay/ErrorOverlay";
import { getFavoriteWatchPost, deleteFavoriteWatch } from "../../utils/watch";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { favoriteProductActions } from "../../redux/favorite/favoriteProductSlice";
const ProductItem = (props) => {
  // console.log("ProductItem.jsx");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [isFavourite, setIsFavourite] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const watch_id = props.watch_id;
  const name = props.name;
  const nameLen = name.length;

  const viewSavedWatchsHandler = () => {
    navigation.navigate("ViewSavedWatchs", {
      watch_id: watch_id,
    });
  };
  const deleteWatchProductHandler = () => {
    const deleteWatchProduct = async (token, watch_id) => {
      try {
        await deleteFavoriteWatch(token, watch_id);
      } catch (err) {
        console.log(err);
      }
    };
    Alert.alert(
      "Thông báo",
      "Bạn có muốn xóa sản phẩm này khỏi danh sách yêu thích không?",
      [{ text: "Hủy" }, { text: "Đồng ý", onPress: () => {
        deleteWatchProduct(token, watch_id);
        dispatch(favoriteProductActions.remove(watch_id));
      } }]
    );
  };
  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <Card>
      <Pressable
        style={({ pressed }) => [
          styles.rootContainer,
          pressed ? styles.pressed : null,
        ]}
        onPress={viewSavedWatchsHandler}
      >
        <View>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <Pressable
          style={styles.outerContainer}
          android_ripple={{ color: "#ccc" }}
          onPress={viewSavedWatchsHandler}
        >
          <Text style={[styles.text]}>
            {nameLen < 15 ? name : name.slice(0, 15) + "..."}
          </Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>{props.style}</Text>
            <Text style={styles.detailText}>{props.size}mm</Text>
          </View>
        </Pressable>
      </Pressable>
      <Pressable
        onPress={() => setIsFavourite(!isFavourite)}
        style={styles.heartIcon}
      >
        <AntDesign
          onPress={deleteWatchProductHandler}
          name="heart"
          size={24}
          color="#F4B7BA"
        />

        {/* <AntDesign name="hearto" size={24} color="black" /> */}
      </Pressable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  addSpace: {
    width: 40,
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
  },
  rootContainer: {
    overflow: "hidden",
    flexDirection: "row",
    borderRadius: 8,
  },
  image: {
    width: 130,
    height: 130,
  },
  pressed: {
    opacity: 0.5,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
  },
  text: {
    textAlign: "left",
    fontSize: 15,
    fontFamily: "montserrat-semi-bold",
  },
  detailsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  detailContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: "0%",
  },
  detailText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: color.gray,
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
    left: "90%",
    top: "10%",
  },
});
