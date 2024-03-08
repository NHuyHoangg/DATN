import { View, Text, StyleSheet, Image } from "react-native";
const Empty = (props) => {
  return (
    <View style={styles.container}>
      {props.children}
      <Image
        style={styles.image}
        source={require("../../assets/images/empty.png")}
      />
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 250,
    width: 250,
  },
});
