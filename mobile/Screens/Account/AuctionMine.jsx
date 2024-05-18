import { Text, View, StyleSheet, Alert } from "react-native";
import WatchList1 from "../../Components/watch/WatchList1";
import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSoldPost } from "../../utils/watch";
import { getAddress } from "../../utils/location";
import { tradingActions } from "../../redux/trading/tradingSlice";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";

export default function AuctionMine (props) {
  const token = useSelector((state) => state.auth.token);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [change, setChange] = useState(false);
  const [address, setAddress] = useState();
  const [dataAddress, setDataAddress] = useState([]);
  const dispatch = useDispatch();

  const onRefreshing = () => {
    setRefreshing(true);
    setChange(!change);
  };
  useEffect(() => {
    const fetchData = async (token) => {
      setIsFetching(true);
      try {
        const res = await getAddress(token);
        if (res) {
          setDataAddress(res);
          setAddress(res.filter((item) => item.is_default === 1)[0]);
          setError(null);
        }
        // const postsData = await fetchSoldPost(token);
        // dispatch(tradingActions.setSoldItems(postsData));
        // setError(null);
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
      <WatchList1
        screenType="auctionMine"
        refreshing={refreshing}
        onRefreshing={onRefreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
