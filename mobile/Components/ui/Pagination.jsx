import { View, StyleSheet, Animated, Dimensions } from "react-native";
import color from "../../constants/color";
const { width } = Dimensions.get("screen");
const Pagination = (props) => {
  return (
    <View style={styles.root}>
      {props.data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = props.scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });
        const backgroundColor = props.scrollX.interpolate({
          inputRange,
          outputRange: [color.border_gray, color.text_msg, color.border_gray],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              { width: dotWidth, backgroundColor: backgroundColor },
              // idx === props.index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  root: {
    // position: "absolute",
    // bottom: 50,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: '3%'
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: color.button_indigo,
  },
  dotActive: {
    backgroundColor: "black",
  },

});
