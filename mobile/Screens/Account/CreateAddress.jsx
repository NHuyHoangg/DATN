import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import {
  ScrollView,
  TextInput,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import RadioGroup from "react-native-radio-buttons-group";
import { useSelector, useDispatch } from "react-redux";

import { isValidPhoneNumber } from "../../utils/inputValidation";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import color from "../../constants/color";
import {
  createAddress,
  getDropDistrict,
  getDropProvince,
  getDropWard,
} from "../../utils/location";

export default function CreateAddress({ route, navigation }) {
  const { address, setAddress } = route.params;
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [last_name, setLastName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [street, setStreet] = useState("");
  const [isDefault, setIsDefault] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAddressData = async () => {
      const provinceData = await getDropProvince();
      setProvinceData(provinceData);
      if (province) {
        const districtData = await getDropDistrict(province);
        setDistrictData(districtData);
        if (district) {
          const wardData = await getDropWard(province, district);
          setWardData(wardData);
        }
      }
    };
    fetchAddressData();
  }, [province, district, ward]);

  const onChangeLastName = (value) => {
    setLastName(value);
  };

  const onChangeFirstName = (value) => {
    setFirstName(value);
  };

  const onChangePhone = (value) => {
    setPhone(value);
  };

  const selectProvince = (val) => {
    setProvince(val);
  };

  const selectDistrict = (val) => {
    setDistrict(val);
  };

  const selectWard = (val) => {
    setWard(val);
  };

  const onChangeStreet = (value) => {
    setStreet(value);
  };

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Có",
        value: 1,
        color: color.baemin2,
        labelStyle: {fontFamily: "montserrat-light", fontSize: 13},
      },
      {
        id: "0",
        label: "Không",
        value: 0,
        color: color.baemin2,
        labelStyle: {fontFamily: "montserrat-light", fontSize: 13},
      },
    ],
    []
  );

  const onChangeInfo = () => {
    if (!first_name || !last_name || !phone) {
      Alert.alert("Xảy ra lỗi!!!", "Vui lòng điền đầy đủ hết các trường.");
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập SĐT hợp lệ.");
      return;
    }

    if (!ward || !street) {
      Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập địa chỉ hợp lệ.");
      return;
    }

    Alert.alert("Xác nhận", "Bạn có muốn lưu những thay đổi vừa nãy?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      { text: "Xác nhận", onPress: () => sendInfo() },
    ]);
  };

  // Gửi request tới server
  const sendInfo = async () => {
    setIsLoading(true);
    const info = {};
    if (last_name) info.last_name = last_name;
    if (first_name) info.first_name = first_name;
    if (phone) info.phone_number = phone;
    if (province) info.province_id = province;
    if (district) info.district_id = district;
    if (ward) info.ward_id = ward;
    if (street) info.street = street;
    if (isDefault) info.is_default = isDefault;
    if (Object.keys(info).length === 0) {
      return;
    }
    console.log(info)

    const res = await createAddress(info, token);
    if (res != 200) {
      Alert.alert("Xảy ra lỗi!!!", "Gửi yêu cầu không thành công.");
      setIsLoading(false);
      return;
    }
    setAddress(info)
    navigation.navigate("MyAddress");
  };

  if (isLoading) return <LoadingOverlay />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        <Text style={styles.text}>Họ</Text>
        <TextInput
          style={styles.input}
          value={last_name}
          onChangeText={onChangeLastName}
        />

        <Text style={styles.text}>Tên</Text>
        <TextInput
          style={styles.input}
          value={first_name}
          onChangeText={onChangeFirstName}
        />

        <Text style={styles.text}>Số điện thoại</Text>
        <TextInput
          value={phone}
          style={styles.input}
          keyboardType="numeric"
          onChangeText={onChangePhone}
        />

        <Text style={styles.text}>Tỉnh / Thành phố</Text>
        <View>
          <SelectList
            setSelected={(val) => selectProvince(val)}
            data={provinceData.map((province) => ({
              key: province.id,
              value: province.name,
            }))}
            save="id"
            defaultOption={provinceData.find(
              (province) => province.id === province
            )}
            searchPlaceholder={"Tìm kiếm"}
            placeholder={"Tìm tỉnh / thành phố"}
            boxStyles={styles.boxInput}
            dropdownStyles={[styles.boxInput, { height: 150 }]}
            inputStyles={[styles.textInput, { color: "rgba(0, 0, 0, 0.35)" }]}
            dropdownTextStyles={[
              styles.textInput,
              { color: "rgba(0, 0, 0, 0.35)" },
            ]}
          />
        </View>

        <Text style={styles.text}>Quận / Huyện / Thị xã</Text>
        <View pointerEvents={province ? "auto" : "none"}>
          <SelectList
            setSelected={(val) => selectDistrict(val)}
            data={districtData.map((district) => ({
              key: district.id,
              value: district.name,
            }))}
            save="id"
            defaultOption={districtData.find(
              (district) => district.id === district
            )}
            searchPlaceholder={"Tìm kiếm"}
            placeholder={"Tìm quận / huyện / thị xã"}
            boxStyles={styles.boxInput}
            dropdownStyles={[styles.boxInput, { height: 150 }]}
            inputStyles={[styles.textInput, { color: "rgba(0, 0, 0, 0.35)" }]}
            dropdownTextStyles={[
              styles.textInput,
              { color: "rgba(0, 0, 0, 0.35)" },
            ]}
          />
        </View>

        <Text style={styles.text}>Phường / Xã / Thị trấn</Text>
        <View pointerEvents={district ? "auto" : "none"}>
          <SelectList
            setSelected={(val) => selectWard(val)}
            data={wardData.map((ward) => ({ key: ward.id, value: ward.name }))}
            save="id"
            defaultOption={wardData.find((ward) => ward.id === ward)}
            searchPlaceholder={"Tìm kiếm"}
            placeholder={"Tìm phường / xã / thị trấn"}
            boxStyles={styles.boxInput}
            dropdownStyles={[styles.boxInput, { height: 150 }]}
            inputStyles={[styles.textInput, { color: "rgba(0, 0, 0, 0.35)" }]}
            dropdownTextStyles={[
              styles.textInput,
              { color: "rgba(0, 0, 0, 0.35)" },
            ]}
          />
        </View>

        <Text style={styles.text}>Địa chỉ cụ thể</Text>
        <TextInput
          value={street}
          style={styles.input}
          onChangeText={onChangeStreet}
        />

        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <Text style={styles.text}>Đặt làm mặc định</Text>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setIsDefault}
            selectedId={isDefault}
            layout="row"
          />
        </View>

        <Pressable
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [
            styles.submit,
            pressed ? styles.pressed : null,
          ]}
          onPress={onChangeInfo}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </Pressable>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    backgroundColor: "white",
  },
  infoViewStyle: {
    alignItems: "center",
    // justifyContent: "center",
    paddingVertical: "4%",
    flexDirection: "row",
  },
  imageStyle: {
    width: 150,
    height: 150,
    borderRadius: 90,
    marginHorizontal: "4%",
  },
  name: {
    paddingVertical: "5%",
    fontFamily: "montserrat-semi-bold",
    fontSize: 20,
  },
  changeAvatarButton: {
    backgroundColor: color.baemin2,
    height: 35,
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  submit: {
    backgroundColor: color.baemin2,
    height: 40,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    marginVertical: 20,
  },
  pressed: {
    opacity: 0.2,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: "montserrat-semi-bold",
    color: "white",
  },
  divider: {
    borderColor: "#E1E1E1",
    borderWidth: 1,
  },
  h1: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 18,
    paddingHorizontal: "4%",
    paddingTop: "3%",
  },
  text: {
    fontFamily: "montserrat-medium",
    fontSize: 15,
    paddingLeft: "4%",
    paddingVertical: "3%",
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
  addVerticalSpace: {
    height: 20,
  },
  passwordInput: {
    flex: 1,
    fontFamily: "montserrat-light",
    fontSize: 14,
  },
  passwordInputHint: {
    fontFamily: "montserrat-light",
    fontSize: 14,
  },
  passwordContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  boxInput: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E1E1E1",
    height: 48,
    paddingHorizontal: "4%",
    marginHorizontal: 10,
  },
  textInput: {
    fontFamily: "montserrat-semi-bold",
    fontSize: 14,
  },
});
