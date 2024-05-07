import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
  } from "react-native";
  import Button from "../../Components/ui/Button";
  import React from "react";
  import { Linking } from "react-native";
  import color from "../../constants/color";
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  import { CTIME_WEBSITE } from "@env";
  const url = CTIME_WEBSITE;
  
  export default function EmptyTrans() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bạn chưa có giao dịch nào</Text>
        <Image
          style={styles.image}
          source={require("../../assets/images/empty.png")}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: screenHeight / 7,
    },
    urlLink: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    title: {
      fontFamily: "montserrat-bold",
      fontSize: 18,
      paddingVertical: "0%",
    },
    suggest: {
      fontFamily: "montserrat-medium",
      fontSize: 14,
    },
    partUrl1: {
      fontFamily: "montserrat-regular",
      fontSize: 14,
      // fontWeight: 600,
      color: "#5d6483",
      borderBottomWidth: 1,
      borderBottomColor: "#5d6483",
    },
    partUrl2: {
      fontFamily: "montserrat-semi-bold",
      fontSize: 12,
      // fontWeight: 600,
      color: "#5d6483",
      borderBottomWidth: 1,
      borderBottomColor: "#5d6483",
    },
    imageContainer: {},
    image: {
      width: screenWidth * 0.8, // Set the width of the image
      height: screenHeight * 0.2, // Set the height of the image
      resizeMode: "contain", // Set how the image should be resized within its container
    },
  });
  