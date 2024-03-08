import { View, Text, StyleSheet } from "react-native";
import Input from "../ui/Input";

import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
// import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
const SellerInfor = (props) => {
  const data = useSelector(state => state.details.item);
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Thông tin người bán</Text>
      <Input
        icon={<Feather name="user" size={24} color="black" />}
        label="Họ và tên"
        readOnly={true}
        value={!!data.user_name ? data.user_name : "Ẩn danh"}
      />
      <Input
        icon={
          <MaterialCommunityIcons name="home-outline" size={25} color="black" />
        }
        label="Địa chỉ"
        readOnly={true}
        value={!!data.street ?  data.street + ", " + data.ward : "Đã ẩn"}
      />
      <Input
        icon={<SimpleLineIcons name="location-pin" size={20} color="black" />}
        label="Khu vực"
        readOnly={true}
        value={!!data.district ?  data.district + ", " + data.province : "Đã ẩn"}
      />
      <Input
        icon={
          <MaterialCommunityIcons name="cellphone" size={24} color="black" />
        }
        label="Số điện thoại"
        readOnly={true}
        value={data.phone}
      />
    </View>
  );
};

export default SellerInfor;

const styles = StyleSheet.create({
  root: {
    marginVertical: "2.5%",
  },
  text: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    marginHorizontal: "5%",
  },
});
