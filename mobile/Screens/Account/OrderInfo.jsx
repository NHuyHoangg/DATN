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
import { Feather } from "@expo/vector-icons";
import Card1 from "../../Components/ui/Card1";
import Timeline from "react-native-timeline-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

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

const OrderInfo = (props) => {
  //   const data = useSelector(state => state.details.item);
  // console.log(props.route.params.props.data)
  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={styles.root}>
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
        <Text style={styles.text}>Thông tin nhận hàng</Text>
      </View>
      <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
        <Text style={[styles.message, { fontFamily: "montserrat-semi-bold" }]}>
          Nguyen Huy Hoang
        </Text>
        <Text style={styles.message}>0123456789</Text>
        <Text style={styles.message}>
          Số 1 Võ Văn Ngân, Tp. Thủ Đức, Tp. Hồ Chí Minh
        </Text>
      </View>

      <Text style={[styles.text, { paddingVertical: "5%" }]}>
        Mã vận đơn: 71648149
      </Text>

      <Timeline
        data={dataTime}
				showTime={false}
				// separator={true}
				circleSize={15}
        circleColor={color.baemin1}
        lineColor={color.baemin1}
				eventDetailStyle={{paddingTop: 0}}
				detailContainerStyle={{paddingBottom: 10}}
				titleStyle={{fontFamily: "montserrat-semi-bold", fontSize: 14}}
				descriptionStyle={{fontFamily: "montserrat-regular", fontSize: 12}}
        options={{
          style: {
            paddingRight: 10,
          },
        }}
      />

      {/* <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.submit,
            pressed ? styles.pressed : null,
          ]}
          onPress={() => navigation.navigate("ShoppingHistory")}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </Pressable> */}
    </GestureHandlerRootView>
  );
};

export default OrderInfo;

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
});
