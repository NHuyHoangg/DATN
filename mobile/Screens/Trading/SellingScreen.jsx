import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../Components/ui/Button";
import color from "../../constants/color";
import { Platform } from "react-native";
import WatchList from "../../Components/watch/WatchList";
import { useSelector, useDispatch } from "react-redux";
import { tradingActions } from "../../redux/trading/tradingSlice";
import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
import { fetchSellingPost } from "../../utils/watch";
// import { getUser } from "../../utils/user";
import { useState, useEffect, Fragment } from "react";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import SellerModal from "../../Components/ui/SellerModal";
const SellingScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
  // console.log("token in SellingScreen = ", token);
  const validSeller = useSelector((state) => state.user.isSeller);
  // console.log("defaultValue = ", defaultValue);
  const [sellerIsValid, setSellerIsValid] = useState(false);
  // console.log("user = ", user);
  // const defaultValue = !!user.province && !!user.ward && user.district;
  // console.log("defaultValue = ", defaultValue);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const onRefreshing = () => {
    setRefreshing(true);
    setChange(!change);
  };
  useEffect(() => {
    const fetchData = async (token) => {
      setIsFetching(true);
      try {
        // const userData = await getUser(token);
        // const isValidSeller = !(
        //   userData.province &&
        //   userData.district &&
        //   userData.ward &&
        //   userData.address
        // );
        // console.log(isValidSeller ? "Seller is invalid" : "Seller is valid");
        // setAuthorizedSeller(isValidSeller);
        const postsData = await fetchSellingPost(token);
        dispatch(tradingActions.setSellingItems(postsData));
        setError(null);
      } catch (err) {
        setError("Không thể tải thông tin");
      }
      setRefreshing(false);
      setIsFetching(false);
    };
    fetchData(token);
  }, [change, fetchSellingPost]);
  const navigation = useNavigation();
  const addWatchHandler = () => {
    if (!validSeller) {
      setSellerIsValid(true);
    } else {
      dispatch(watchDetailsActions.clearUpdatedImages());
      navigation.navigate("ManageWatch", { isAdding: true });
    }
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setRefreshing} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <Fragment>
      <SellerModal
        modalVisible={sellerIsValid}
        token={token}
        setModalVisible={setSellerIsValid}
      />
      <KeyboardAvoidingView
        style={styles.rootContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* <Text>Selling Screen !</Text> */}
        <View style={styles.buttonContainer}>
          <Button
            width="50%"
            color={color.button_brown}
            onPress={addWatchHandler}
          >
            Đăng sản phẩm
          </Button>
        </View>
        <WatchList
          screenType="selling"
          refreshing={refreshing}
          onRefreshing={onRefreshing}
        />
      </KeyboardAvoidingView>
    </Fragment>
  );
};

export default SellingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
    // borderColor: "red",
    // backgroundColor: color.border_gray,
    // borderWidth: 1,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: "4%",
    marginBottom: "1.5%",
    // backgroundColor: 'black'
  },
});
