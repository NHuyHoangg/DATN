import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  ScrollView,
} from "react-native";
import { useCallback, memo } from "react";
import WatchItem1 from "./WatchItem1";
import { useSelector } from "react-redux";
import EmptyItem from "../../Screens/Overlay/EmptyItem";
import { dataGen } from "../../constants/data";
import Empty from "../ui/Empty";
import color from "../../constants/color";

const WatchList1 = memo((props) => {
  const screenType = props.screenType;
  const refreshing = props.refreshing;
  const onRefreshing = props.onRefreshing;

  let dataList = [];
  if (screenType === "home") {
    dataList = useSelector((state) => state.watch.items);
  // } else if (screenType === "selling") {
  //   dataList = useSelector((state) => state.trading.sellingItems);
  // } else if (screenType === "sold") {
  //   dataList = useSelector((state) => state.trading.soldItems);
  } else if (screenType === "favoritePosts") {
    dataList = useSelector((state) => state.favoritePost.items);
  } else {
    const numOfData = 4;
    for (let i = 0; i < numOfData; i++) {
      dataList.push(dataGen());
    }	
  }
  // const numOfData = 10;
  // for (let i = 0; i < numOfData; i++) {
  //   dataList.push(dataGen());
  // }	

  const renderWatchItem = useCallback((itemData) => {
    return (
      <WatchItem1
        screenType={screenType}
        onRefreshing={props.onRefreshing}
        data={itemData.item}
      />
    );
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        windowSize={5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        data={dataList}
        ListEmptyComponent={<EmptyItem onPress={onRefreshing} />}
        renderItem={renderWatchItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        progressViewOffset={2}
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{ color: "#ccc" }}
        refreshControl={
          <RefreshControl
            colors={[color.baemin1]}
            refreshing={refreshing}
            onRefresh={onRefreshing}
          />
        }
      />
    </View>
  );
});

export default WatchList1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,

    // backgroundColor: "white",
  },
});
