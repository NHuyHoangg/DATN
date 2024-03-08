import { View, Image, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { memo } from "react";
import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
const ImageItem = memo((props) => {
  const dispatch = useDispatch();
  // console.log("image = ", props.image);
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <View style={styles.closeBtn}>
        <AntDesign
          name="closecircle"
          size={18}
          color="black"
          onPress={() => {
            dispatch(watchDetailsActions.removeImages(props.index));
          }}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: props.image }}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
});

export default ImageItem;

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderColor: "black",
    // marginRight: 10,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 7.5,
    borderColor: "black",
    borderWidth: 1,
    // resizeMode: "contain",
  },
  closeBtn: {
    backgroundColor: "white",
    position: "absolute",
    left: "82.5%",
    top: "2.5%",
    zIndex: 2,
    borderRadius: 50,
    padding: "0%",
    justifyContent: "center",
    alignItems: "center",
  },
});
