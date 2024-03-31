import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import { useEffect, useCallback } from "react";
import { TextInput, GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import WatchList from "../../Components/watch/WatchList";
import FilterModal from "../../Components/ui/FilterModal";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { watchActions } from "../../redux/watch/watchSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HeaderStyle, TopTapStyle, TopTabScreenStyle } from "../../constants/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchPosts, searchWatch } from "../../utils/watch";
import { getSeller } from "../../utils/user";
import { userActions } from "../../redux/user/userSlice";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import { useState } from "react";
import color from "../../constants/color";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const indexRatio = 15;
export default function HomePage({ route, navigation }) {
  const [filter, setFilter] = useState({
    sortOrder: null,
    condition: null,
    brand: [],
    size: null,
    price: null,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [filterProps, setFilterProps] = useState({ ...filter });
  const [searchState, setSearchState] = useState(false);
  const [inputText, setInputText] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const token = useSelector((state) => state.auth.token);
  let data = [];
  let favourite = [];

  useEffect(() => {
    const getWatchPosts = async () => {
      setIsFetching(true);
      try {

        if (token) {
          const userData = await getSeller(token);
          dispatch(userActions.set(userData.isSeller));
        }
        if (!searchState) {
          data = await fetchWatchPosts(token, filterProps);
        } else data = await searchWatch(inputText);
        dispatch(watchActions.deleteAll());
        dispatch(watchActions.set(data));
      } catch (err) {
        setError("Không thể tải thông tin");
      } finally {
        setIsFetching(false);
        setRefreshing(false);
        setFilterProps({ ...filter });
        setSearchState(false);
        setError(null);
      }
    };
    getWatchPosts();
  }, [change]);

  useEffect(() => {
    if (route.params) {
      setInputText(route.params.searchString);
      setSearchState(true);
      setChange(!change);
    }
  }, [route.params]);

  function searchOnPress() {
    setSearchState(true);
    setChange(!change);
  }

  function onTyping(text) {
    setInputText(text);
  }
  const onRefreshing = () => {
    setRefreshing(true);
    setChange(!change);
  };

  function chatIconOnPress() {
    navigation.navigate("Chat");
  }
  function filterOnPress() {
    setModalVisible(!modalVisible);
    setChange(!change);
  }

  function filterIconOnPress() {
    setModalVisible(!modalVisible);
  }

  const Tab = createMaterialTopTabNavigator();
  const ListWatch = () => {
    return (
      isFetching ? (
        <LoadingOverlay />
      ) : (
        <WatchList
          screenType="home"
          refreshing={refreshing}
          onRefreshing={onRefreshing}
        />
      )
    );
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }
  // if (isFetching) {
  //   return <LoadingOverlay />;
  // }
  return (
    <>
      {modalVisible && <StatusBar backgroundColor="#666666" />}
      <SafeAreaView style={styles.rootContainer}>
        {modalVisible && (
          <FilterModal
            onPress={filterIconOnPress}
            modalVisible={modalVisible}
            filterProps={filterProps}
            setFilterProps={setFilterProps}
            filterOnPress={filterOnPress}
          />
        )}
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.innerTopContainer}>
            <View style={styles.inputTextContainer}>
              <Ionicons
                name="search"
                size={screenWidth / indexRatio}
                color="black"
                onPress={searchOnPress}
              />
              <GestureHandlerRootView>
                <TextInput
                  style={styles.input}
                  placeholder="Tìm đồng hồ"
                  onChangeText={onTyping}
                  value={inputText}
                  autoComplete={"off"}
                  autoCorrect={false}
                  onSubmitEditing={searchOnPress}
                />
              </GestureHandlerRootView>
            </View>
            <Pressable
              onPress={chatIconOnPress}
              style={({ pressed }) => [
                styles.iconBox,
                pressed && { opacity: 0.5 },
              ]}
            >
              <Ionicons
                style={styles.chatIcon}
                name="chatbubble-ellipses-outline"
                size={26}
                color={color.baemin1}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.suggestContainer}>
          <Text style={styles.suggestText}>Gợi ý hôm nay</Text>
          <View
            style={{
              overflow: "hidden",
              justifyContent: "center",
              marginLeft: screenWidth / 39,
            }}
          >
            <Pressable
              onPress={filterIconOnPress}
              android_ripple={{ color: "#d3d3d3" }}
            >
              <Ionicons
                style={styles.suggestIcon}
                name="options-outline"
                size={screenWidth / 16}
                color={color.baemin1}
              />
            </Pressable>
          </View>
        </View>
        {/* <TopTabsContainer /> */}
        <Tab.Navigator
          initialRouteName="Post"
          screenOptions={{
            ...TopTapStyle,
          }}
        >
          <Tab.Screen
            name="New"
            component={ListWatch}
            options={{
              tabBarLabel: "Hàng mới",
              ...TopTabScreenStyle,
            }}
          />
          
          <Tab.Screen
            name="Old"
            component={ListWatch}
            options={{
              tabBarLabel: "Đã qua sử dụng",
              ...TopTabScreenStyle,
            }}
          />
        </Tab.Navigator>
        {/* {isFetching ? (
          <LoadingOverlay />
        ) : (
          <WatchList
            screenType="home"
            refreshing={refreshing}
            onRefreshing={onRefreshing}
          />
        )} */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  innerTopContainer: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  iconBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    width: "98%",
    fontFamily: "montserrat-regular",
    marginLeft: "5%",
    color: "#9D9D9D",
  },
  inputTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "2%",
    flex: 9,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  suggestContainer: {
    paddingHorizontal: "5%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "2%",
  },
  suggestText: {
    fontSize: 16,
    fontFamily: "montserrat-medium",
    marginLeft: screenWidth / 35,
    color: color.baemin1,
    // fontWeight: 600,
  },
  chatIcon: {
    marginLeft: "2%",
  },
  suggestIcon: {},
  modalContaier: {
    marginBottom: 0,
    marginTop: "auto",
    backgroundColor: "#f1e8e8",
    height: "92%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
