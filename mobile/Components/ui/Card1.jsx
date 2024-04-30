import { View, StyleSheet, Platform } from "react-native";
import React from "react";

import color from "../../constants/color";
const Card1 = (props) => {
  return <View style={styles.card}>{props.children}</View>;
};
export default Card1;
const styles = StyleSheet.create({
  card: {
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    marginVertical: "2.5%",
    marginHorizontal: "2.5%",
    padding: 0,
    borderRadius: 8,

    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});
