import { View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart } from "react-native-chart-kit";
import { reviewList } from '../../constants/data'
import Ionicons from "@expo/vector-icons/Ionicons";

// import { Feather } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useSelector } from "react-redux";
import color from "../../constants/color";
// import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const avatarSize = screenHeight/18;
const rList = reviewList

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  backgroundColor: "white",
  color: (opacity = 1) => "black",
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Review = (props) => {
  //   const data = useSelector(state => state.details.item);
  const dataReview = {
    labels: ["(1)", "(2)", "(3)", "(4)", "(5)"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99],
      },
    ],
  };

  function Box({ id, avatar, name, message, date, watch }) {
    return (
      <View style={styles.chatContainer}>
        <View style={{ flexDirection: "row", paddingVertical: "3%" }}>
          <View style={{ width: avatarSize, height: avatarSize }}>
            <Image
              style={styles.avatarImg}
              source={{
                uri: avatar,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: "3%",
              justifyContent: "space-around",
            }}
          >
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{date} - {watch}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Nhận xét người bán</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "5%",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>3.5 / 5</Text>
          <Stars
            display={3.5}
            spacing={10}
            count={5}
            starSize={50}
            fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
            emptyStar={
              <Icon
                name={"star-outline"}
                style={[styles.myStarStyle, styles.myEmptyStarStyle]}
              />
            }
            halfStar={<Icon name={"star-half"} style={[styles.myStarStyle]} />}
          />
        </View>
        <BarChart
          // style={graphStyle}
          data={dataReview}
          width={screenWidth * 0.6}
          height={200}
          chartConfig={chartConfig}
        />
      </View>
      {rList.map((item, key) => <Box id={item.id} avatar ={item.avatar} name={item.name} message={item.message} date={item.date} watch={item.watch}/>)}
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  root: {
    marginVertical: "2.5%",
  },
  text: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    marginHorizontal: "5%",
    color: color.baemin1,
  },
  myStarStyle: {
    color: color.yellow,
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  chatContainer: {
    backgroundColor: "white",
    elevation: 2,
    overflow: "hidden",
    paddingHorizontal: "5%",
    marginVertical: "1%",
  },
  avatarImg: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 100,
  },
  message: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
  },
  date: {
    fontSize: 12,
    fontFamily: "montserrat-light",
  },
  name: {
    fontSize: 16,
    fontFamily: "montserrat-semi-bold",
  },
});
