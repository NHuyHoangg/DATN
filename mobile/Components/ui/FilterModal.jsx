import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, ScrollView, GestureHandlerRootView } from "react-native-gesture-handler";
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
import EmptyItem from "../../Screens/Overlay/EmptyItem";
import color from "../../constants/color";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const maxDropDownHeight = screenHeight / 5.5;

export default function FilterModal({
  onPress,
  modalVisible,
  filterProps,
  setFilterProps,
  filterOnPress,
}) {
  const filterType = ["Mới nhất", "Cũ nhất", "Giá tăng dần", "Giá giảm dần"];
  const [index, setIndex] = useState(0);
  const [option, setOption] = useState("Mới nhất");
  const [newIsCheck, setNewIsCheck] = useState(false);
  const [usedIsCheck, setUsedIsCheck] = useState(false);
  const [brand, setBrand] = useState(filterProps.brand);
  const [size, setSize] = useState(filterProps.size);
  const [price, setPrice] = useState(filterProps.price);
  const ref = useRef(null);
  const data = brandList;
  const data2 = engineList;
  const data3 = priceList;
  const data4 = sizeList;
  function filterButtonOnPress() {
    let newFiltersProps = filterProps;
    newFiltersProps.brand = brand;
    switch (option) {
      case "Mới nhất":
        newFiltersProps.sortOrder = "newest";
        break;
      case "Cũ nhất":
        newFiltersProps.sortOrder = "oldest";
        break;
      case "Giá tăng dần":
        newFiltersProps.sortOrder = "price_asc";
        break;
      case "Giá giảm dần":
        newFiltersProps.sortOrder = "price_desc";
        break;
    }

    if (!newIsCheck && !usedIsCheck) {
      newFiltersProps.condition = "";
    } else if (usedIsCheck) {
      newFiltersProps.condition = "Cũ";
    } else newFiltersProps.condition = "Mới";

    if (size) {
      if (size === "> 42 mm") newFiltersProps.size = "42-100";
      else newFiltersProps.size = size.slice(0, size.length - 3);
    }
    switch (price) {
      case "<1 triệu":
        newFiltersProps.price = "0-1000000";
        break;

      case "1-2 triệu":
        newFiltersProps.price = "1000000-2000000";
        break;
      case "2-3 triệu":
        newFiltersProps.price = "2000000-3000000";
        break;

      case "3-5 triệu":
        newFiltersProps.price = "3000000-5000000";
        break;
      case "5-10 triệu":
        newFiltersProps.price = "5000000-10000000";
        break;
      case ">10 triệu":
        newFiltersProps.price = "10000000-10000000000";
        break;
    }
    setFilterProps(newFiltersProps);
    filterOnPress();
  }
  function checkBoxHandler(value) {
    if (value === "new") {
      setNewIsCheck(!newIsCheck);
    } else if (value === "used") {
      setUsedIsCheck(!usedIsCheck);
    }
  }
  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      duration: 1000,
      viewPosition: 0.5,
      viewOffset: 15,
    });
  }, [index]);

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
            alignItems: "flex-start",
            marginTop: "5%",
            overflow: "hidden",
          }}
        >
          <Pressable onPress={onPress} android_ripple={{ color: color.baemin1 }}>
            <Ionicons style={{}} name="close-sharp" size={screenWidth / 14} />
          </Pressable>
        </View>
        <GestureHandlerRootView>
        <ScrollView>
          <Text style={styles.title}>Sắp xếp</Text>
          <FlatList
            style={{ flexGrow: 0, marginVertical: "3%" }}
            ref={ref}
            data={filterType}
            initialScrollIndex={index}
            keyExtractor={(item) => item}
            horizontal
            contentContainerStyle={{ paddingLeft: "5%" }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index: curIndex }) => {
              return (
                <Pressable
                  onPress={() => {
                    setIndex(curIndex);
                    setOption(filterType[curIndex]);
                  }}
                >
                  <View
                    style={{
                      marginRight: 10,
                      paddingVertical: 8,
                      paddingHorizontal: 15,
                      borderRadius: 24,
                      borderColor: "#697184",
                      backgroundColor: index === curIndex ? color.baemin1 : "white",
                      borderWidth: 1,
                      elevation: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "montserrat-semi-bold",
                        color: index === curIndex ? "white" : "#333332",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
          <Text style={styles.title}>Tình trạng</Text>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkBoxText}>Mới</Text>
            <CheckBox
              size={screenWidth / 15}
              style={{ marginLeft: "auto", marginRight: 0 }}
              isCheck={newIsCheck}
              onPress={() => checkBoxHandler("new")}
              color={color.baemin1}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkBoxText}>Đã qua sử dụng</Text>
            <CheckBox
              size={screenWidth / 15}
              style={{ marginLeft: "auto", marginRight: 0 }}
              isCheck={usedIsCheck}
              onPress={() => checkBoxHandler("used")}
              color={color.baemin1}
            />
          </View>

          <Text style={styles.title}>Thương Hiệu</Text>
          <View style={styles.dropdownContainer}>
            <MultipleSelectList
              setSelected={setBrand}
              data={data}
              save="value"
              disabledCheckBoxStyles={<EmptyItem />}
              maxHeight={screenHeight / 4}
              dropdownTextStyles={{
                borderBottomWidth: 0.5,
                borderColor: "#ccc6c6",
              }}
              fontFamily="montserrat-semi-bold"
              boxStyles={styles.boxStyle}
              placeholder="Chọn thương hiệu"
              searchPlaceholder="Tìm kiếm"
              dropdownStyles={styles.dropdownStyle}
              notFoundText="Không tìm thấy dữ liệu"
              badgeStyles={{ backgroundColor: color.baemin1 }}
            />
          </View>
          {/* <Text style={styles.title}>Dòng máy</Text>
          <View style={styles.dropdownContainer}>
            <SelectList
              setSelected={setEngine}
              data={data2}
              save="value"
              label="Categories"
              maxHeight={maxDropDownHeight}
              dropdownTextStyles={{
                borderBottomWidth: 0.5,
                borderColor: "#ccc6c6",
              }}
              fontFamily="montserrat-semi-bold"
              boxStyles={styles.boxStyle}
              placeholder="Chọn dòng máy"
              searchPlaceholder="Tìm kiếm"
              dropdownStyles={styles.dropdownStyle}
              notFoundText="Không tìm thấy dữ liệu"
              badgeStyles={{ backgroundColor: "#697184" }}
            />
          </View> */}
          {/* <DropList /> */}
          <Text style={styles.title}>Size mặt</Text>
          <View style={styles.dropdownContainer}>
            <SelectList
              setSelected={setSize}
              data={data4}
              save="value"
              maxHeight={maxDropDownHeight}
              dropdownTextStyles={{
                borderBottomWidth: 0.5,
                borderColor: "#ccc6c6",
              }}
              fontFamily="montserrat-semi-bold"
              boxStyles={styles.boxStyle}
              placeholder="Chọn size mặt"
              searchPlaceholder="Tìm kiếm"
              dropdownStyles={styles.dropdownStyle}
              notFoundText="Không tìm thấy dữ liệu"
              badgeStyles={{ backgroundColor: "#697184" }}
            />
          </View>
          <Text style={styles.title}>Khoảng giá</Text>
          <View style={styles.dropdownContainer}>
            <SelectList
              setSelected={setPrice}
              data={data3}
              save="value"
              maxHeight={maxDropDownHeight}
              dropdownTextStyles={{
                borderBottomWidth: 0.5,
                borderColor: "#ccc6c6",
              }}
              fontFamily="montserrat-semi-bold"
              boxStyles={styles.boxStyle}
              placeholder="Chọn khoảng giá"
              searchPlaceholder="Tìm kiếm"
              dropdownStyles={styles.dropdownStyle}
              notFoundText="Không tìm thấy dữ liệu"
              badgeStyles={{ backgroundColor: "#697184" }}
            />
          </View>
          <View
            style={{ width: "40%", alignSelf: "center", paddingVertical: "5%" }}
          >
            <Button
              color={color.baemin1}
              rippleColor={color.baemin1}
              borR={0}
              onPress={filterButtonOnPress}
            >
              Tìm kiếm
            </Button>
          </View>
        </ScrollView>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
}
function emptyView() {
  return <View></View>;
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
    height: "94%",
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
});
