import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
} from "react-native";
import { dataGen } from "../../constants/data";
import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import EmptyItem from "../../Screens/Overlay/EmptyItem";
const ProductList = (props) => {
    const refreshing = props.refreshing;
    const onRefreshing = props.onRefreshing;
    const dataList = useSelector(state => state.favoriteProduct.items);
    const renderWatchItem = (itemData) => {
        return <ProductItem {...itemData.item} />;
    };
    return (
      <View style={styles.container}>
        <FlatList
          windowSize={5}
          removeClippedSubviews={true}
          maxToRenderPerBatch={4}
          initialNumToRender={4}
          ListEmptyComponent={<EmptyItem onPress={onRefreshing} />}
          data={dataList}
          renderItem={renderWatchItem}
          keyExtractor={(item) => item.watch_id}
          refreshing={refreshing}
          progressViewOffset={2}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{ color: "#ccc" }}
          refreshControl={
            <RefreshControl
              colors={["black"]}
              refreshing={refreshing}
              onRefresh={onRefreshing}
            />
          }
        />
      </View>
    );
};

export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,

    },
});
