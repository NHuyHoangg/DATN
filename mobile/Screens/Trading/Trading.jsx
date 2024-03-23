import { StyleSheet, Text, View, Pressable } from "react-native";
import Button from "../../Components/ui/Button";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../redux/ui/uiSlice";
import color from "../../constants/color";
export default function Trading({ route, navigation }) {
 

  const [isSelling, setIsSelling] = useState(true);
  const changeSellingTypeHandler = () => {
    setIsSelling(true);
  };
  const changeSoldTypeHandler = () => {
    setIsSelling(false);
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.type}>
        <View
          style={[
            styles.textContainer,
            isSelling ? styles.textBorderContainer : null,
          ]}
        >
          <Pressable onPress={changeSellingTypeHandler}>
            <Text style={styles.text}>Đang bán</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.textContainer,
            !isSelling ? styles.textBorderContainer : null,
          ]}
        >
          <Pressable onPress={changeSoldTypeHandler}>
            <Text style={styles.text}>Đã bán</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: color.white,
  },
  type: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    paddingVertical: 15,
  },
  textBorderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: color.baemin1,
  },
  text: {
    textAlign: "center",
    fontFamily: "montserrat-medium",
    fontSize: 15,
  },
});
