import { View, FlatList, Text, Pressable, StyleSheet } from "react-native";
import { useState, useRef, useEffect, memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageItem from "./ImageItem";
import { useDispatch, useSelector } from "react-redux";
import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
const ImageList = (props) => {
  const images = useSelector((state) => state.details.item.updatedImages);
  const [index, setIndex] = useState(0);
  // const [option, setOption] = useState(props.images[0]);
  const ref = useRef(null);

  console.log("ImageList.jsx");
  const renderImageItem = (itemData) => {
    return (
      <ImageItem
        onPress={() => {
          // console.log("return ImageItem, index = ", itemData.index);
          setIndex(itemData.index);
          // setOption(props.images[itemData.index]);
        }}
        image={itemData.item}
        // onCloseImage={props.onCloseImage.bind(this, itemData.index)}
        index={itemData.index}
      />
    );
  };
  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      duration: 10000,
      viewPosition: 0.5,
      viewOffset: 20,
    });
  }, [index]);
  const ReOpenGallery = () => {
    return (
      <View style={styles.root}>
        <Pressable
          style={styles.reOpenGalleryContainer}
          onPress={props.onOpenGallery}
        >
          <MaterialCommunityIcons name="camera-plus" size={36} color="black" />
          <Text style={styles.text}>Thêm hình</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        style={{ flexGrow: 0, marginVertical: "0%" }}
        contentContainerStyle={{ paddingLeft: "5%" }}
        horizontal
        keyExtractor={(_, index) => index}
        initialScrollIndex={index}
        showsHorizontalScrollIndicator={false}
        ref={ref}
        data={images}
        renderItem={renderImageItem}
        ListHeaderComponent={ReOpenGallery}
        // snapToAlignment="center"
      />
    </View>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  root: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  reOpenGalleryContainer: {
    width: 100,
    height: 100,
    backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7.5,
    backgroundColor: "#F2F1EF",
    borderWidth: 1,
  },
  text: {
    fontFamily: "montserrat-bold",
  },
});
