import color from "./color";

export const HeaderStyle = {
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#FFFFFF",
    elevation: 0, // Android
    shadowOpacity: 0, // iOS
  },
  headerShadowVisible: false,
  headerTitleStyle: {
    fontFamily: "montserrat-bold",
  },
};

export const TopTapStyle = {
  tabBarIndicatorStyle: {
    backgroundColor: color.soil_yellow,
  },
  tabBarAndroidRipple: {
    borderless: true,
  },
  tabBarPressColor: "#ccc",
  tabBarPressOpacity: 0.5,
  tabBarStyle: {
    backgroundColor: "#FFFFFF",
    elevation: 0, // Android
    shadowOpacity: 0, // iOS
  },
  // tabBarGap: 10,
};

export const TopTabScreenStyle = {
  tabBarLabelStyle: {
    textTransform: "none",
    fontFamily: "montserrat-medium",
  },
  tabBarInactiveTintColor: color.text_black,
  
};