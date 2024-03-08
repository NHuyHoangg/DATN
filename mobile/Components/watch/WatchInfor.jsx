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
        label="Hãng"
        readOnly={true}
        value={detailsInfor.brand}
      />
      <Input
        icon={
          <Ionicons name="checkmark-circle-outline" size={22} color="black" />
        }
        label="Tình trạng"
        readOnly={true}
        value={detailsInfor.status}
      />
      <Input
        icon={
          <MaterialCommunityIcons
            name="clock-time-nine-outline"
            size={22}
            color="black"
          />
        }
        label="Size mặt số"
        readOnly={true}
        value={detailsInfor.size + " mm"}
      />
      <Input
        icon={<FontAwesome5 name="user-circle" size={20} color="black" />}
        label="Kiểu dáng"
        readOnly={true}
        value={detailsInfor.gender}
      />
      {/* <Input
        icon={<Entypo name="ruler" size={24} color="black" />}
        label="Độ dày"
        readOnly={true}
        value="13mm"
      /> */}
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
        value={detailsInfor.waterproof}
      />
      <Input
        icon={
          <MaterialCommunityIcons name="sine-wave" size={24} color="black" />
        }
        label="Loại dây"
        readOnly={true}
        value={detailsInfor.strap_type}
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
    marginHorizontal: '5%'
  }
});
