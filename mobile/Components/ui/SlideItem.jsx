import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Easing,
  Animated,
} from "react-native";
const { width, height } = Dimensions.get("window");
const SlideItem = (props) => {
  const translateYImage = new Animated.Value(0);
  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();
  return (
    <View style={styles.root}>
      <Animated.Image
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
        // resizeMethod="resize"
        source={{ uri: props.item }}
      />
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    // backgroundColor: "blue",
    alignItems: "center",
  },
  image: {
    width: width,
    height: width,
    resizeMode: "cover",
    // borderColor: 'black',
    // borderWidth: 1
  },
});
