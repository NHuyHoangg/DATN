import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import { useState, memo } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Icons from "@expo/vector-icons";
import { Feather, AntDesign } from "@expo/vector-icons";
import Card1 from "../../Components/ui/Card1";
import ImageList from "../../Components/ui/ImageList";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
  MediaTypeOptions,
} from "expo-image-picker";

// import { Feather } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
import color from "../../constants/color";
// import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const avatarSize = screenHeight / 18;

const dataTime = [
  { title: "Event 1", description: "Event 1 Description" },
  { title: "Event 2", description: "Event 2 Description" },
  { title: "Event 3", description: "Event 3 Description" },
  { title: "Event 4", description: "Event 4 Description" },
  { title: "Event 5", description: "Event 5 Description" },
];

const RefundDetail = (props) => {
  //   const data = useSelector(state => state.details.item);
  // console.log(props.route.params.props.data)
  const navigation = useNavigation();
  const imagesLen = 0;
  const isSeller = props.route.params.isSeller;

  const openGallery = async () => {
    // console.log("open gallery");
    if (imagesLen >= 6) {
      Alert.alert("Thông báo", "Bạn chỉ có thể chọn tối đa 6 hình ảnh.", [
        { text: "Đồng ý" },
      ]);
    } else {
      try {
        let result = await launchImageLibraryAsync({
          allowsEditing: false,
          allowsMultipleSelection: true,
          quality: 1,
          mediaTypes: MediaTypeOptions.Images,
          orderedSelection: true,
          selectionLimit: 6,
          base64: true,
        });
        if (!result.canceled) {
          // console.log("result = ", result);
          dispatch(
            watchDetailsActions.addImages(
              result.assets.map((asset) => asset.uri)
            )
          );
          // dispatch(watchDetailsActions.addImages(result.assets));
        } else {
          // throw new Error("Errors occured!");
        }
      } catch (err) {
        console.error("Error while picking an image:", err);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView>
        <Card1>
          <View style={styles.rootContainer}>
            <View style={{ flexDirection: "row" }}>
              <ImageBackground
                style={styles.image}
                source={{ uri: props.route.params.props.data.image }}
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
                <Text
                  style={[
                    styles.text,
                    styles.name,
                    { color: "black", textAlign: "center" },
                  ]}
                >
                  {/* {nameLen < 15 ? name : name.slice(0, 15) + "..."} */}
                  {props.route.params.props.data.name}
                </Text>
                <Text
                  style={[
                    styles.text,
                    styles.price,
                    { color: "black", textAlign: "center" },
                  ]}
                >
                  {props.route.params.props.data.price} đ
                </Text>
              </View>
            </View>
          </View>
        </Card1>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: "5%",
          }}
        >
          <Ionicons name="location-outline" size={20} color={color.baemin1} />
          <Text style={styles.text}>Thông tin người bán</Text>
        </View>
        <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
          <Text
            style={[styles.message, { fontFamily: "montserrat-semi-bold" }]}
          >
            Nguyen Huy Hoang
          </Text>
          <Text style={styles.message}>0123456789</Text>
          <Text style={styles.message}>
            Số 1 Võ Văn Ngân, Tp. Thủ Đức, Tp. Hồ Chí Minh
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: "5%",
          }}
        >
          <Ionicons name="location-outline" size={20} color={color.baemin1} />
          <Text style={styles.text}>Thông tin nhận hàng</Text>
        </View>
        <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
          <Text
            style={[styles.message, { fontFamily: "montserrat-semi-bold" }]}
          >
            Nguyen Huy Hoang
          </Text>
          <Text style={styles.message}>0123456789</Text>
          <Text style={styles.message}>
            Số 1 Võ Văn Ngân, Tp. Thủ Đức, Tp. Hồ Chí Minh
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: "5%",
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={20} color={color.baemin1} />
          <Text style={styles.text}>Đã hoàn lại số tiền {props.route.params.props.data.price}đ vào tài khoản!</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: "5%",
          }}
        >
          <Ionicons name="close-circle-outline" size={20} color={color.red} />
          <Text style={[styles.text, {color: color.red}]}>Đã huỷ trả hàng!</Text>
        </View>

        {/* {(isAdding && imagesLen > 0) || (!isAdding && imagesLen > 0) ? ( */}
        {imagesLen > 0 ? (
          <ImageList
            onOpenGallery={openGallery}
            // onCloseImage={closeImage}
            // images={imageList}
          />
        ) : (
          <Pressable style={styles.image} onPress={openGallery}>
            <View style={styles.hint}>
              <AntDesign name="questioncircleo" size={16} color="black" />
            </View>
            <View style={styles.camera}>
              <Icons.FontAwesome name="camera" size={24} color="black" />
              <Text style={styles.text}>Đăng từ 1 đến 6 hình</Text>
            </View>
          </Pressable>
        )}

        <TextInput
          placeholder={"Nhập lý do bạn muốn trả hàng!"}
          style={styles.input}
          multiline
          numberOfLines={3}
          // onChangeText={onChangePhone}
        />

        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.submit,
            {backgroundColor: color.red},
            pressed ? styles.pressed : null,
          ]}
          onPress={() => navigation.navigate("Return")}
        >
          <Text style={styles.buttonText}>Huỷ trả hàng</Text>
        </Pressable>

        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.submit,
            pressed ? styles.pressed : null,
          ]}
          onPress={() => navigation.navigate("Return")}
        >
          <Text style={styles.buttonText}>Chỉnh sửa</Text>
        </Pressable>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default RefundDetail;

const styles = StyleSheet.create({
  root: {
    paddingVertical: "2.5%",
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
  },
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
    justifyContent: "space-around",
    paddingVertical: "4%",
    width: "100%",
    // backgroundColor: "green",
  },
  text: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 16,
    marginHorizontal: "3%",
    color: color.baemin1,
  },
  myStarStyle: {
    color: color.yellow,
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  chatContainer: {
    backgroundColor: "white",
    elevation: 2,
    overflow: "hidden",
    paddingHorizontal: "5%",
    marginVertical: "1%",
  },
  avatarImg: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
  },
  message: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  date: {
    fontSize: 12,
    fontFamily: "montserrat-light",
  },
  name: {
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
  },
  input: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E1E1E1",
    padding: "4%",
    marginHorizontal: 10,
    fontFamily: "montserrat-light",
    fontSize: 14,
    backgroundColor: "#F1F3F0",
    textAlignVertical: "top",
    marginVertical: "5%",
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
  },
  pressed: {
    opacity: 0.2,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "montserrat-semi-bold",
    color: "white",
  },
  hint: {
    // backgroundColor: "green",
    alignItems: "flex-end",
    marginTop: "2.5%",
    marginRight: "2.5%",
  },
  camera: {
    flex: 1,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
});
