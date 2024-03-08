import { Text, View, Pressable, StyleSheet, Platform } from "react-native";
import color from "../../constants/color";

const Button = (props) => {
  /*
  Cung cấp cho button các thuộc tính như sau:
  + width: thay đổi chiều rộng của button (Đơn vị %)
  + height: thay đổi chiều cao của button (Đơn vị %)
  + color: thay đôi màu của button
  + textColor: Thay đổi màu text của button 
  + textSize: Thay đổi kích thước text
  */

  const widthConfig = props.width ? { width: props.width } : null;
  const heightConfig = props.height ? { height: props.height } : null;
  const buttonColorConfig = props.color
    ? { backgroundColor: props.color }
    : null;
  const textColorConfig = props.textColor ? { color: props.textColor } : null;
  const textSizeConfig = props.textSize ? { fontSize: props.textSize } : null;
  const paddingHorizontalConfig = props.padX
    ? { paddingHorizontal: props.padX }
    : null;
  const paddingVerticalConfig = props.padY
    ? { paddingVertical: props.padY }
    : null;
  const marginHorizontalConfig = props.marX
    ? { marginHorizontal: props.marX }
    : null;
  const marginVerticalConfig = props.marY
    ? { marginVertical: props.marY }
    : null;
  const marginBottomConfig = props.marB ? { marginBottom: props.marB } : null;
  const borderRadiusConfig = props.borR ? { borderRadius: props.borR } : null;
  const textVerticalPadingConfig = props.textVP
    ? { paddingVertical: props.textVP }
    : null;
  const textHorizontalPadingConfig = props.textHP
    ? { paddingHorizontal: props.textHP }
    : null;
  return (
    <View
      style={[
        styles.outerContainer,
        widthConfig,
        heightConfig,
        marginHorizontalConfig,
        marginVerticalConfig,
        marginBottomConfig,
        paddingHorizontalConfig,
        paddingVerticalConfig,
        borderRadiusConfig,
      ]}
    >
      <Pressable
        onPress={props.onPress}
        style={({ pressed }) =>
          pressed
            ? [
                styles.innerContainer,
                buttonColorConfig,
                borderRadiusConfig,
                Platform.OS == "ios" ? styles.pressed : null,
              ]
            : [styles.innerContainer, borderRadiusConfig, buttonColorConfig]
        }
        android_ripple={
          props.rippleColor
            ? { color: props.rippleColor }
            : { color: color.button_background }
        }
      >
        <Text
          style={[
            styles.text,
            textColorConfig,
            textSizeConfig,
            textVerticalPadingConfig,
            textHorizontalPadingConfig,
          ]}
        >
          {props.children}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 8,
    margin: 4,
    overflow: "hidden",
    // width: '45%'
  },
  innerContainer: {
    backgroundColor: color.button_brown,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
    backgroundColor: "red",
  },
  text: {
    color: color.white,
    textAlign: "center",
    fontFamily: "montserrat-semi-bold",
    // alignSelf: 'center',
    // alignItems: 'center'
  },
  pressed: {
    opacity: 0.75,
  },
});

// import { View, Text, Pressable, StyleSheet } from "react-native";
// import Colors from "../../constants/colors";
// const PrimaryButton = (props) => {
//   const pressHandler = (props) => {
//     console.log("pressed!");
//   };
//   return (
//     <View style={styles.buttonOuterContainer}>
//       <Pressable
//         onPress={props.onPress}
//         style={({ pressed }) =>
//           pressed
//             ? [styles.buttonInnerContainer, styles.pressed]
//             : styles.buttonInnerContainer
//         }
//         android_ripple={{ color: Colors.primary600 }}
//       >
//         <Text style={styles.buttonText}>{props.children}</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default PrimaryButton;

// const styles = StyleSheet.create({
//   buttonOuterContainer: {
//     borderRadius: 28,
//     margin: 4,
//     overflow: "hidden",
//   },
//   buttonInnerContainer: {
//     backgroundColor: Colors.primary500,

//     paddingVertical: 8,
//     paddingHorizontal: 16,

//     elevation: 2,
//   },
//   buttonText: {
//     color: "white",
//     textAlign: "center",
//   },
//   pressed: {
//     opacity: 0.75,
//   },
// });
