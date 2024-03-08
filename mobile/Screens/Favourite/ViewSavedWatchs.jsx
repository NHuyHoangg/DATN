import { View, Text, StyleSheet } from "react-native";
import WatchList from "../../Components/watch/WatchList";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import { useState, useEffect, useLayoutEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteWatchPost } from "../../utils/watch";
import { favoriteProductActions } from "../../redux/favorite/favoriteProductSlice";

const ViewSavedWatchs = (props) => {
  const dispatch = useDispatch();
  const watch_id = props.route.params.watch_id;
  const [refreshing, setRefreshing] = useState(false);
  const [change, setChange] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  console.log("watch_id in ViewSavedWatchs = ", watch_id);

  const onRefreshing = () => {
    setRefreshing(true);
    setChange(!change);
  };
  useEffect(() => {
    const viewWatchItems = async () => {
      setIsFetching(true);
      try {
        console.log("call API");
        const watchData = await getFavoriteWatchPost(watch_id);
        dispatch(favoriteProductActions.setResultList(watchData));
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Không thể tải thông tin");
      }
      setIsFetching(false);
      setRefreshing(false);
      
    };
    viewWatchItems();
  }, [change]);
  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.root}>
      <WatchList
        screenType="favoriteProducts"
        onRefreshing={onRefreshing}
        refreshing={refreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ViewSavedWatchs;
