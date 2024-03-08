import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Button from "../../Components/ui/Button";
import color from "../../constants/color";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const ErrorOverlay = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Entypo name="emoji-sad" size={100} color="black" />
      </View>

      <Text style={[styles.text, styles.title]}>Lỗi kết nối</Text>
      <Text style={styles.text}>{props.message}</Text>
      <Button
        onPress={() => {
          props.reload((state) => !state);
        }}
      >
        Tải lại
      </Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  image: {
    width: 0.5 * width,
    height: 0.55 * width,
    backgroundColor: "blue",
  },
  imageContainer: {
    justifyContent: "center",
  },
});
