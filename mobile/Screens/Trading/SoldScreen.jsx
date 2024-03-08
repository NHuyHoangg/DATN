import { Text, View, StyleSheet } from "react-native";
import WatchList from "../../Components/watch/WatchList";
import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSoldPost } from "../../utils/watch";
import { tradingActions } from "../../redux/trading/tradingSlice";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";
const SoldScreen = (props) => {
  const token = useSelector((state) => state.auth.token);
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
        const postsData = await fetchSoldPost(token);
        dispatch(tradingActions.setSoldItems(postsData));
        setError(null);
      } catch (err) {
        setError("Không thể tải thông tin");
      }
      setRefreshing(false);
      setIsFetching(false);
    };
    fetchData(token);
  }, [change, fetchSoldPost]);
  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setRefreshing} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.rootContainer}>
      <WatchList
        screenType="sold"
        refreshing={refreshing}
        onRefreshing={onRefreshing}
      />
    </View>
  );
};

export default SoldScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
