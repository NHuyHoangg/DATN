import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import {
  FlatList,
  ScrollView,
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import CheckBox from "./CheckBox";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import {
  brandList,
  engineList,
  priceList,
  sizeList,
} from "../../constants/data";
import Button from "./Button";
import Input from "./Input";
import EmptyItem from "../../Screens/Overlay/EmptyItem";
import color from "../../constants/color";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const maxDropDownHeight = screenHeight / 5.5;

export default function AuctionModal({
  onPress,
  modalVisible,
  begin,
  step,
  end,
  priceNow,
  auctionPrice,
  setAuctionPrice,
  changeAuctionPrice,
}) {
  const [now, setNow] = useState((priceNow + step).toString());

  const onChangePrice = (value) => {
    const numValue = parseInt(value.replace(/,/g, ''), 10);
    if (!isNaN(numValue)) {
      setNow(value);
      setAuctionPrice(numValue);
    } else {
      setNow(value);
    }
  };

  const increaseStep = () => {
    const newNow = parseInt(now.replace(/,/g, '')) + step;
    setNow(newNow.toString());
    setAuctionPrice(newNow);
  };

  const decreaseStep = () => {
    const currentNow = parseInt(now.replace(/,/g, ''));
    if (currentNow - step <= 0 || currentNow - step <= priceNow) return;
    const newNow = currentNow - step;
    setNow(newNow.toString());
    setAuctionPrice(newNow);
  };

  const submitAuction = () => {
    Alert.alert("Thông báo", "Bạn có muốn tham gia đấu giá?", [
      { text: "Huỷ", style: "cancel" },
      { text: "Xác nhận", onPress: () => changeAuctionPrice() },
    ]);
  };

  console.log("price", now);
  console.log(auctionPrice)
  console.log(typeof now);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onPress}
    >
      <View style={styles.outerModalContainer}>
        <Pressable onPress={onPress} style={{ flex: 1 }}></Pressable>
      </View>
      <View style={styles.modalContaier}>
        <View
          style={{
            marginHorizontal: "5%",
            justifyContent: "center",
            alignItems: "flex-end",
            marginTop: "5%",
            overflow: "hidden",
          }}
        >
          <Pressable
            onPress={onPress}
            android_ripple={{ color: color.baemin1 }}
          >
            <Ionicons style={{}} name="close-sharp" size={screenWidth / 14} />
          </Pressable>
        </View>

        <GestureHandlerRootView>
          <Text style={styles.title}>Tham gia đấu giá</Text>
          <Input
            icon={<MaterialIcons name="attach-money" size={24} color="black" />}
            label="Giá khởi điểm"
            readOnly={true}
            value={new Intl.NumberFormat(["ban", "id"]).format(begin)}
          />
          <Input
            icon={<MaterialIcons name="attach-money" size={24} color="black" />}
            label="Giá hiện tại"
            readOnly={true}
            value={new Intl.NumberFormat(["ban", "id"]).format(priceNow)}
          />
          <Input
            icon={
              <MaterialCommunityIcons
                name="cash-plus"
                size={24}
                color="black"
              />
            }
            label="Bội giá"
            readOnly={true}
            value={new Intl.NumberFormat(["ban", "id"]).format(step)}
          />
          <Input
            icon={<Ionicons name="time-outline" size={24} color="black" />}
            label="Ngày kết thúc"
            readOnly={true}
            value={end}
          />

          <Text style={styles.title}>Nhập số tiền</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "5%",
              marginVertical: "1%",
            }}
          >
            <Pressable onPress={decreaseStep}>
              <AntDesign name="minuscircleo" size={24} color={color.baemin1} />
            </Pressable>

            <TextInput
              value={now}
              keyboardType="numeric"
              style={styles.input}
              placeholder={now.toString()}
              width="45%"
              onChangeText={onChangePrice}
              readOnly={true}
            />

            <Pressable onPress={increaseStep}>
              <AntDesign name="pluscircleo" size={24} color={color.baemin1} />
            </Pressable>
          </View>

          <View
            style={{ width: "40%", alignSelf: "center", paddingVertical: "5%" }}
          >
            <Button
              color={color.baemin1}
              rippleColor={color.baemin1}
              borR={0}
              onPress={submitAuction}
            >
              Đấu giá
            </Button>
          </View>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  outerModalContainer: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.6,
  },
  modalContaier: {
    marginBottom: 0,
    marginTop: "auto",
    width: "100%",
    backgroundColor: "white",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#959090",
    opacity: 1,
    bottom: 0,
    position: "absolute",
  },
  boxStyle: {
    marginVertical: "1.5%",
    marginHorizontal: "5%",
    borderRadius: 5,
    width: "88%",
    borderWidth: 2,
    borderColor: "#9d9d9d",
  },
  title: {
    fontFamily: "montserrat-semi-bold",
    marginHorizontal: "5%",
    fontSize: 18,
    marginVertical: "1%",
    color: color.baemin1,
  },
  checkboxContainer: {
    paddingHorizontal: "10%",
    paddingVertical: "0.5%",
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 14,
  },
  dropdownContainer: {
    width: "100%",
  },
  dropdownStyle: {
    width: "88%",
    marginHorizontal: "5%",
    borderWidth: 2,
    borderColor: "#9d9d9d",
  },
  input: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E1E1E1",
    height: 37,
    paddingHorizontal: "4%",
    marginHorizontal: 10,
    fontFamily: "montserrat-light",
    fontSize: 16,
  },
});
