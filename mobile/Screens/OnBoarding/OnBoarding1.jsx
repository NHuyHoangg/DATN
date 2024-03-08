import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoarding1SVG from "../../assets/images/svg/OnBoarding1SVG";
import OnBoarding2SVG from "../../assets/images/svg/OnBoarding2SVG";
import OnBoarding3SVG from "../../assets/images/svg/OnBoarding3SVG";
import { Dimensions } from "react-native";
import Button from "../../Components/ui/Button";
import { OnBoardingContent } from "../../constants/data";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
export default function OnBoarding1({ navigation, route }) {
  let pageName, nextPage, title, description, numOfLine, pageIndex, image;
  pageName = route.name;
  switch (pageName) {
    case "OnBoarding1":
      nextPage = "OnBoarding2";
      title = OnBoardingContent[0].title;
      description = OnBoardingContent[0].description;
      numOfLine = 2;
      pageIndex = 1;
      image = <OnBoarding1SVG />;
      break;
    case "OnBoarding2":
      nextPage = "OnBoarding3";
      title = OnBoardingContent[1].title;
      description = OnBoardingContent[1].description;
      numOfLine = 4;
      pageIndex = 2;
      image = <OnBoarding2SVG />;
      break;
    case "OnBoarding3":
      nextPage = "Authenticate";
      title = OnBoardingContent[2].title;
      description = OnBoardingContent[2].description;
      numOfLine = 3;
      pageIndex = 3;
      image = <OnBoarding3SVG />;
      break;
  }
  function continueButtonHandler() {
    navigation.navigate(nextPage);
  }
  function skipButtonHandler() {
    navigation.navigate("Authenticate");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image}
      </View>
      <View style={styles.dotContainer}>
        <View
          style={[styles.dot, pageIndex == 1 && { backgroundColor: "#697184" }]}
        ></View>
        <View
          style={[styles.dot, pageIndex == 2 && { backgroundColor: "#697184" }]}
        ></View>
        <View
          style={[styles.dot, pageIndex == 3 && { backgroundColor: "#697184" }]}
        ></View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text numberOfLines={numOfLine} style={styles.description}>
          {description}
        </Text>
      </View>
      {pageIndex!=3?<View style={styles.buttonContainer}>
        <Button
          textHP="1%"
          marX="10%"
          borR={24}
          color="#E2E8F5"
          textColor="black"
          onPress={skipButtonHandler}
        >
          Bỏ qua
        </Button>
        <Button
          textHP="0%"
          marX="10%"
          borR={24}
          rippleColor="#afafaf"
          color="#697184"
          textColor="white"
          onPress={continueButtonHandler}
        >
          Tiếp tục
        </Button>
      </View>:<View style={styles.buttonContainer}>
        <Button
          textHP="10%"
          marX="10%"
          borR={20}
          rippleColor="#afafaf"
          color="#697184"
          textColor="white"
          onPress={skipButtonHandler}
        >
          Bắt đầu
        </Button>
      </View>}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    width: "100%",
    height: screenHeight / 80,
    alignSelf: "center",
    justifyContent: "center",
    marginVertical: "3%",
  },

  dot: {
    marginHorizontal: "0.5%",
    width: screenHeight / 80,
    height: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 120,
    borderWidth: 1.5,
    borderColor: "#697184",
  },
  title: {
    fontSize: 25,
    fontFamily: "montserrat-semi-bold",
    textAlign: "center",
  },
  titleContainer: {
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    alignItems: "center",
  },
  description: {
    fontSize: 18,
    fontFamily: "montserrat-regular",
    fontWeight: 600,
    textAlign: "center",
    lineHeight: screenHeight / 30,
  },
  descriptionContainer: {
    paddingVertical: "3%",
    alignItems: "center",
    paddingHorizontal: "12%",
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "15%",
    marginTop: "auto",
  },
});
