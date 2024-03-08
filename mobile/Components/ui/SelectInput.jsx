import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useState } from "react";
import color from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";
const SelectInput = (props) => {
  const isAdding = props.isAdding;
  let defaultOption = "";
  const optionsLen = props.options.length;
  const idx = props.options.findIndex((item) => item === props.value);
  if (idx === -1) {
    defaultOption = optionsLen;
  } else {
    defaultOption = idx;
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [typeOfWatchChain, setTypeOfWatchChain] = useState(defaultOption);
  const selectedIcon = (
    <Ionicons name="radio-button-on-outline" size={13} color="black" />
  );
  const unselectedIcon = (
    <Ionicons name="radio-button-off-sharp" size={13} color="black" />
  );
  const close = () => {
    console.log("clicked");
    setModalVisible(false);
  };
  return (
    <View style={styles.root}>
      <Pressable style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable style={styles.centeredView} onPress={close}>
            <Pressable style={styles.modalView}>
              <Text style={[styles.modalText]}>Lựa chọn loại dây</Text>
              <View style={styles.radiosContainer}>
                {props.options.map((item, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => setTypeOfWatchChain(index)}
                  >
                    <View style={[styles.radioContainer, styles.pressRegion]}>
                      <View style={styles.radio}>
                        {typeOfWatchChain == index
                          ? selectedIcon
                          : unselectedIcon}
                      </View>
                      <Text style={styles.radioText}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
                
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      </Pressable>
      <View style={[styles.container, props.style]}>
        <View style={styles.icon}>{props.icon}</View>
        <Text style={styles.label}>{props.label}</Text>
        <View style={styles.inputContainer}>
          <View style={styles.value}>
            <Text style={{ fontFamily: "montserrat-light" }}>
              {typeOfWatchChain}
            </Text>
          </View>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Chọn loại dây</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 5,
    borderBottomColor: color.background_white,
    borderBottomWidth: 1,
  },
  container: {
    flexDirection: "row",
    marginHorizontal: "5%",
    alignItems: "center",
  },
  icon: {
    width: 24,
    alignItems: "center",
  },
  label: {
    flex: 1.25,
    fontSize: 13,
    marginLeft: "3%",
    marginRight: "3%",
    fontFamily: "montserrat-medium",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    opacity: 0.9,
    // marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 7.5,
    //
    width: "60%",
    height: "35%",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 10,
  },
  button: {
    borderRadius: 5,
    padding: "1.25%",
    // elevation: 2,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
    flex: 1,
    alignSelf: "center",
    backgroundColor: color.button_indigo,
  },
  buttonClose: {
    backgroundColor: color.button_indigo,
    marginTop: 0,
  },
  textStyle: {
    fontSize: 13,
    color: "white",
    fontFamily: "montserrat-regular",
    textAlign: "center",
    padding: 1,
  },
  buttonText: {
    fontFamily: "montserrat-bold",
    color: "white",
    paddingVertical: "1%",
    paddingHorizontal: "2%",
    fontSize: 13,
  },
  modalText: {
    marginBottom: 0,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "montserrat-medium",
    // backgroundColor: 'white'
  },
  inputContainer: {
    flex: 2.5,
    flexDirection: "row",
    // backgroundColor: 'blue'
  },
  value: {
    flex: 1,
    // backgroundColor: 'blue',
    alignSelf: "center",
  },
  radioContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: "0.25%",
    // backgroundColor: "green",
  },
  pressRegion: {
    // backgroundColor: "yellow",
    padding: "1%",
  },
  radio: {
    marginRight: "5%",
  },
  radioText: {
    fontSize: 13,
    fontFamily: "montserrat-regular",
  },
  radiosContainer: {
    // flex: 2.5,
    flexDirection: "column",
    // backgroundColor: "red",
    // justifyContent: "space-evenly",
  },
  inputOption: {
    // backgroundColor: "#ccc"
  }
});
