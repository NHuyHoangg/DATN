import { View, Text, StyleSheet, Pressable } from "react-native";
import Input from "../ui/Input";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../../constants/color";
const BuyerInfor = (props) => {
  console.log("BuyerInfor.jsx rendered");
  const toggleView = () => {
    console.log("BuyerInfor.jsx, toggleView");
    if (icon === eyeIcon) {
      setIcon(hiddenEyeIcon);
    } else {
      setIcon(eyeIcon);
    }
  };
  console.log(props.screenType)
  return (
    <View style={styles.root}>
      <Text style={styles.header}>{props.screenType == "auctionDone" ? "Thông tin người thắng đấu giá" : "Thông tin người mua"}</Text>
      <Input
        icon={<Feather name="user" size={24} color="black" />}
        label="Họ và tên"
        readOnly={true}
        value="Bé Lê Văn Đạt"
      />
      <Input
        icon={
          <MaterialCommunityIcons name="home-outline" size={25} color="black" />
        }
        label="Địa chỉ"
        readOnly={true}
        value="268 Lý Thường Kiệt"
      />
      <Input
        icon={<SimpleLineIcons name="location-pin" size={20} color="black" />}
        label="Khu vực"
        readOnly={true}
        value="Q.10, TP.HCM"
      />
      <Input
        icon={
          <MaterialCommunityIcons name="cellphone" size={24} color="black" />
        }
        label="Số điện thoại"
        readOnly={true}
        // value="0999 123 321"
        isPhone={true}
        value="0999 123 321"
      />
    </View>
  );
};

export default BuyerInfor;

const styles = StyleSheet.create({
  root: {
    marginVertical: "2.5%",
  },
  header: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    marginHorizontal: "5%",
    color: color.baemin1,
  },
  phone: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "montserrat-regular",
    fontSize: 13,
  },
});
