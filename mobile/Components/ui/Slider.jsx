import { View, FlatList, Text, Animated } from "react-native";
import { image } from "../../constants/data";
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
const Slider = (props) => {
  console.log("Slider.jsx in WatchDetails.jsx");
  const images = useSelector(state => state.details.item.images);
  // const renderedId = props.renderedId;
  // const renderedIdx = useSelector(state => state.watch.items.findIndex(item => item.id === renderedId));
  // console.log("renderedIdx = ", renderedIdx);
  // console.log(renderedIdx);
  // const imageList = useSelector(state => state.watch.items[renderedIdx].image_list);
  // console.log("imageList = ", imageList);
  // let renderedImages = [];
  // for (let i = 0; i < imageList.length; i++) {
  //   renderedImages.push(imageList[i].content);
  // }
  const [index, setIndex] = useState(0);
  const renderImageItem = (itemData) => {
    // console.log(itemData.item);
    return <SlideItem item={itemData.item} />;
  };
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log("viewableItems", viewableItems);
    setIndex(viewableItems[0].index);
  }).current;
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {images.length > 1 && (
        <Pagination data={images} scrollX={scrollX} index={index} />
      )}
    </View>
  );
};

export default Slider;
