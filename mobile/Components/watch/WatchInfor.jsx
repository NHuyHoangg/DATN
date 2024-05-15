import { View, Text, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Input from "../ui/Input";
const WatchInfor = (props) => {
  const detailsInfor = useSelector(state => state.details.item);
  // console.log("details infor in WatchInfor.jsx = ", detailsInfor);
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Thông tin chi tiết</Text>
      {/* <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Feather name="globe" size={20} color="black" />
          </View>
        </View>
        <Text style={styles.label}>{props.label}</Text>
      </View> */}
      {/* <Input
        icon={<Feather name="globe" size={20} color="black" />}
        label="Nguồn gốc"
        readOnly={true}
        value={detailsInfor.nation}
      /> */}
      <Input
        icon={<Feather name="watch" size={24} color="black" />}
        label="Thương hiệu"
        readOnly={true}
        value={detailsInfor.brand || "Không có"}
      />
      <Input
        icon={
          <Ionicons name="checkmark-circle-outline" size={22} color="black" />
        }
        label="Tình trạng"
        readOnly={true}
        value={detailsInfor.status || "Không có"}
      />
      <Input
        icon={
          <MaterialCommunityIcons
            name="clock-time-nine-outline"
            size={22}
            color="black"
          />
        }
        label="Kích thước mặt số"
        readOnly={true}
        value={(detailsInfor.case_size + " mm") || "Không có"}
      />
      <Input
        icon={
          <MaterialCommunityIcons
            name="clock-time-nine-outline"
            size={22}
            color="black"
          />
        }
        label="Màu mặt số"
        readOnly={true}
        value={detailsInfor.color || "Không có"}
      />
      <Input
        icon={<FontAwesome5 name="user-circle" size={20} color="black" />}
        label="Kiểu dáng"
        readOnly={true}
        value={detailsInfor.gender || "Không có"}
      />
      <Input
        icon={
          <MaterialCommunityIcons
            name="water-off-outline"
            size={24}
            color="black"
          />
        }
        label="Chống nước"
        readOnly={true}
        value={detailsInfor.waterproof || "Không có"}
      />
      <Input
        icon={
          <MaterialCommunityIcons name="sine-wave" size={24} color="black" />
        }
        label="Loại dây"
        readOnly={true}
        value={detailsInfor.strap_material || "Không có"}
      />
      <Input
        icon={
          <MaterialCommunityIcons name="sine-wave" size={24} color="black" />
        }
        label="Màu dây"
        readOnly={true}
        value={detailsInfor.strap_color || "Không có"}
      />
      <Input
        icon={
          <MaterialCommunityIcons name="battery-60" size={24} color="black" />
        }
        label="Thời lượng pin"
        readOnly={true}
        value={detailsInfor.battery_life || "Không có"}
      />
    </View>
  );
};

export default WatchInfor;

const styles = StyleSheet.create({
  root:{
    marginVertical: '2.5%',
  },
  text: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
    marginHorizontal: '5%',
    color: color.baemin1,
  }
});
