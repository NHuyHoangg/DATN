import { View, Text, TextInput, StyleSheet } from "react-native";
import color from "../../constants/color";
import { Fragment, useState } from "react";
import { Feather } from "@expo/vector-icons";
const Input = (props) => {
  const readOnly = !!props.readOnly;
  const invalid = props.invalid;
  // console.log("invalid = ", invalid);
  return (
    <View style={styles.root}>
      <View style={[styles.container, props.style]}>
        <View style={styles.icon}>{props.icon}</View>
        <Text style={[styles.label, invalid && styles.errorLabel]}>{props.label}</Text>
        {readOnly ? (
          <Fragment>
            <Text style={styles.input}>
              <Text style={{ textAlignVertical: "center" }}>{props.value}</Text>
            </Text>
          </Fragment>
        ) : (
          <TextInput
            style={[styles.input]}
            value={props.value}
            {...props.inputConfig}
          />
        )}
      </View>
    </View>
  );
};

export default Input;

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
    alignSelf: "center",
    // backgroundColor: "red",
    justifyContent: "center",
  },
  phoneContainer: {
    flex: 1,
  },
  errorLabel: {
    color: color.red,
  },
  errorInput: {
    backgroundColor: color.error50,
  },
});
