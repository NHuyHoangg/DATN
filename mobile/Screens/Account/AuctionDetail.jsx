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
import Timeline from "react-native-timeline-flatlist";
import AuctionSvg from "../../assets/images/svg/Auction";
import { reviewList } from "../../constants/data";
import ImageList from "../../Components/ui/ImageList";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

// import { Feather } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
import color from "../../constants/color";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAddress } from "../../utils/location";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const avatarSize = screenHeight / 18;

const charge = 100000;

const rList = reviewList;

const dataTime = [
  {
    time: "19:34 03/11/2023",
    title: "5.100.000đ",
    description: "Nguyễn Văn An",
  },
  {
    time: "19:34 03/11/2023",
    title: "5.000.000đ",
    description: "Nguyễn Văn Bình",
  },
  {
    time: "19:34 03/11/2023",
    title: "4.500.000đ",
    description: "Nguyễn Văn An",
  },
  {
    time: "19:34 03/11/2023",
    title: "4.000.000đ",
    description: "Nguyễn Văn Bình",
  },
  { time: "19:34 03/11/2023", title: "2.500.000đ", description: "Khởi điểm" },
];

const AuctionDetail = (route) => {
  // const data = useSelector(state => state.details.item);
  // console.log(props.route.params.props.data)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);
	const [cmt, setCmt] = useState("");

	const onChangeCmt = (val) => {
		setCmt(val);
	};

	const uploadCmt = () => {
		setChange(!change);
	}

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await getAddress(token);
        // console.log(res);
        if (res) {
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

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isLoading) return <LoadingOverlay />;

  console.log("AuctionDetail", route.route.params);

  function Box({ id, avatar, name, message, date, watch }) {
    return (
      <View style={styles.chatContainer}>
        <View style={{ flexDirection: "row", paddingVertical: "3%" }}>
          <View style={{ width: avatarSize, height: avatarSize }}>
            <Image
              style={styles.avatarImg}
              source={{
                uri: avatar,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: "3%",
              justifyContent: "space-around",
              width: "85%",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.name}>{name}</Text>
            </View>
            <Text style={styles.date}>
              {date} - {watch}
            </Text>

            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
    );
  }

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
                  {route.route.params.props.name}
                </Text>
                <Text
                  style={[
                    styles.text,
                    styles.price,
                    { color: "black", textAlign: "center" },
                  ]}
                >
                  {route.route.params.props.formatted_price ||
                    route.route.params.props.price}
                </Text>
              </View>
            </View>
          </View>
        </Card1>

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
            <AuctionSvg height={20} width={20} fill={color.baemin1} />
            <Text style={styles.text}>Lịch sử phiên đấu giá</Text>
          </View>
          <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
            <Timeline
              data={dataTime}
              circleSize={15}
              circleColor={color.baemin1}
              lineColor={color.baemin1}
              eventDetailStyle={{ paddingTop: 0 }}
              detailContainerStyle={{ paddingBottom: 10 }}
              titleStyle={{ fontFamily: "montserrat-semi-bold", fontSize: 14 }}
              descriptionStyle={{
                fontFamily: "montserrat-regular",
                fontSize: 12,
              }}
              timeStyle={{ fontFamily: "montserrat-regular", fontSize: 14 }}
              options={{
                style: {
                  paddingRight: 10,
                },
              }}
            />
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
            <Ionicons name="receipt-outline" size={20} color={color.baemin1} />
            <Text style={styles.text}>Bình luận</Text>
          </View>
          <View style={{ paddingHorizontal: 10, marginLeft: "3%" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Nhập bình luận"
                value={cmt}
                onChangeText={onChangeCmt}
              />

              <Pressable
								onPress={() => uploadCmt()}>
                <Ionicons name="send" size={24} color={color.baemin1} />
              </Pressable>
            </View>
          </View>

          {rList.length > 0 ? (
            rList.map((item, key) => (
              <Box
                key={key}
                id={item.id}
                avatar={item.avatar}
                name={item.name}
                message={item.message}
                date={item.date}
                watch={item.watch}
              />
            ))
          ) : (
            <Text style={[styles.text, { color: "black", fontSize: 15 }]}>
              Người bán chưa có nhận xét nào!
            </Text>
          )}
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default AuctionDetail;

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
    marginVertical: "2%",
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
  input: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E1E1E1",
    height: 37,
    paddingHorizontal: "4%",
    marginHorizontal: 10,
    fontFamily: "montserrat-light",
    fontSize: 12,
    width: "85%",
  },
});
