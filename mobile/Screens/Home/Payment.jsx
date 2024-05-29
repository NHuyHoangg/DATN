import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  Alert,
} from "react-native";
import { useState, useMemo, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import RadioGroup from "react-native-radio-buttons-group";

// import { Feather } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
import color from "../../constants/color";
// import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAddress } from "../../utils/location";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const avatarSize = screenHeight / 18;

const charge = 100000;

const Payment = (route) => {
  // const data = useSelector(state => state.details.item);
  // console.log(props.route.params.props.data)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Thanh toán khi nhận hàng (COD)",
        value: 1,
        color: color.baemin2,
        labelStyle: { fontFamily: "montserrat-light", fontSize: 12 },
        size: 20,
      },
      {
        id: "2",
        label: "Thanh toán bằng số dư",
        value: 0,
        color: color.baemin2,
        labelStyle: { fontFamily: "montserrat-light", fontSize: 12 },
        size: 20,
      },
      {
        id: "3",
        label: "Thanh toán qua VNPay",
        value: 0,
        color: color.baemin2,
        labelStyle: { fontFamily: "montserrat-light", fontSize: 12 },
        size: 20,
      },
    ],
    []
  );

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isPayment, setIsPayment] = useState("1");
  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);
  const [address, setAddress] = useState();

  const [dataAddress, setDataAddress] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await getAddress(token);
        // console.log(res);
        if (res) {
          setDataAddress(res);
          setAddress(res.filter(item => item.is_default === 1)[0])
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

  useEffect(() => {
    setIsLoading(true);
    if (route.route.params.address) {
      setAddress(route.route.params.address);
      setIsLoading(false);
    }
  }, [route.route.params.address]);

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isLoading) return <LoadingOverlay />;

  if (dataAddress.length <= 0) {
    navigation.goBack();
    Alert.alert(
      "Xảy ra lỗi!!!",
      "Bạn chưa có địa chỉ nhận hàng nào. Tạo địa chỉ mới?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Tạo địa chỉ",
          onPress: () => navigation.navigate("MyAddress"),
        },
      ]
    );
    return;
  }

  console.log("Payment", route.route.params)
  // console.log(address)

  return (
    <GestureHandlerRootView style={styles.root}>
      <ScrollView>
        <Card1>
          <View style={styles.rootContainer}>
            <View style={{ flexDirection: "row" }}>
              <ImageBackground
                style={styles.image}
                source={{ uri: route.route.params.props.image }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  {/* <View
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
                  </View> */}

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
                  {route.route.params.props.name}
                </Text>
                <Text
                  style={[
                    styles.text,
                    styles.price,
                    { color: "black", textAlign: "center" },
                  ]}
                >
                  {/* {props.price} đ */}
                  {route.route.params.props.formatted_price || route.route.params.props.price}
                </Text>
              </View>
            </View>
          </View>
        </Card1>

        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            // styles.submit,
            pressed ? styles.pressed : null,
            { paddingBottom: "5%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
          ]}
          onPress={() => navigation.navigate("ChooseAddress", { props: route.route.params.props, address })}
        >
          <View style={{width: "80%"}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: "5%",
              }}
            >
              <Ionicons
                name="location-outline"
                size={20}
                color={color.baemin1}
              />
              <Text style={styles.text}>Địa chỉ nhận hàng</Text>
            </View>
            <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
              <Text
                style={[styles.message, { fontFamily: "montserrat-semi-bold" }]}
              >
                {address.name}
              </Text>
              <Text style={styles.message}>{address.phone_number}</Text>
              <Text style={styles.message}>
                {address.street}, {address.ward_name}, {address.district_name},{" "}
                {address.province_name}
              </Text>
            </View>
          </View>
          <Ionicons
                name="chevron-forward-outline"
                size={40}
                color={color.baemin1}
              />
        </Pressable>

        <View style={styles.divider}></View>

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
            <Ionicons name="receipt-outline" size={20} color={color.baemin1} />
            <Text style={styles.text}>Chi tiết thanh toán</Text>
          </View>
          <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.message}>Tiền sản phẩm</Text>
              <Text style={styles.message}>
                {route.route.params.props.formatted_price || route.route.params.props.price}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.message}>Phí vận chuyển</Text>
              <Text style={styles.message}>70.000 đ</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.message}>Phí kiểm định</Text>
              <Text style={styles.message}>70.000 đ</Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontFamily: "montserrat-semi-bold", fontSize: 16 }}
              >
                Tổng thanh toán
              </Text>
              <Text
                style={{ fontFamily: "montserrat-semi-bold", fontSize: 16 }}
              >
                700.000 đ
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider}></View>

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
            <Text style={styles.text}>Phương thức thanh toán</Text>
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
          onPress={() => {
            if (isPayment === "1")
              navigation.navigate("WaitVerify")
            else
              navigation.navigate("Recharge", { charge })
            }}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </Pressable>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Payment;

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
  divider: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
  },
});
