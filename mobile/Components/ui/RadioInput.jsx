import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
const RadioInput = (props) => {
  let defaultOption = props.options.findIndex((item) => item === props.value);
  
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const selectedIcon = (
    <Ionicons name="radio-button-on-outline" size={13} color="black" />
  );
  const unselectedIcon = (
    <Ionicons name="radio-button-off-sharp" size={13} color="black" />
  );
  
  return (
    <View style={styles.root}>
      <View style={[styles.container, props.style]}>
        <View style={styles.icon}>{props.icon}</View>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styles.radiosContainer}>
          {props.options.map((option, index) => (
            <TouchableWithoutFeedback key={index} onPress={() => {
              setSelectedOption(index);
              props.onChangeText(option);
            }}>
              <View style={[styles.radioContainer, styles.pressRegion]}>
                <View style={styles.radio}>
                  {/* <Ionicons
                  name="radio-button-on-outline"
                  size={13}
                  color="black"
                /> */}
                  {selectedOption == index ? selectedIcon : unselectedIcon}
                </View>

                <Text style={styles.radioText}>{option}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}

        </View>
      </View>
    </View>
  );
};

export default RadioInput;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    borderBottomColor: color.background_white,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: "row",
    // backgroundColor: "gray",
    marginHorizontal: "5%",
    alignItems: "center",
  },
  icon: {
    width: 24,
    // flex: 0.3,
    // backgroundColor: 'gray',
    alignItems: "center",

    // alignSelf: 'center'
  },
  label: {
    flex: 1.25,
    fontSize: 13,
    marginLeft: "3%",
    marginRight: "3%",
    fontFamily: "montserrat-medium",
  },
  input: {
    fontSize: 13,
    flex: 2.5,
    fontFamily: "montserrat-regular",
    // backgroundColor: "red",
  },
  radio: {
    marginRight: "5%",
  },
  radioText: {
    fontSize: 13,
    fontFamily: "montserrat-light",
  },
  radioContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "green",
  },
  radiosContainer: {
    flex: 2.5,
    flexDirection: "row",
    // backgroundColor: "red",
    justifyContent: "space-evenly",
  },
  pressRegion: {
    // backgroundColor: "yellow",
    padding: "1%",
  },
});
