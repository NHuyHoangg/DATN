import {
  Alert,
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import color from "../../constants/color";
import Button from "../../Components/ui/Button";
import AuthInput from "../../Components/auth/AuthInput";
import LoginSvg from "../../assets/images/svg/LoginSvg";
import { SafeAreaView } from "react-native-safe-area-context";
import { login } from "../../utils/authenticate";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  isValidPhoneNumber,
  isValidPassword,
} from "../../utils/inputValidation";
export default function Login({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const disPatch = useDispatch();
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(null);
  const [invalidPassword, setInvalidPassword] = useState(null);
  useEffect(() => {
    getToken();
  }, [navigation]);

  async function getToken() {
    const storedToken = await AsyncStorage.getItem("CtimeToken");
    const storedId = await AsyncStorage.getItem("CtimeId");
    if (storedToken) {
      disPatch(authActions.login({ token: storedToken, id: storedId }));
      goToHomePage();
    }
    setIsLoading(false);
  }
  async function loginHandler() {
    clearErrorMessage();
    if (logInforChecking()) return;
    setIsLoading(true);

    try {
      const { token: authToken, message, id } = await login(phone, password);
      disPatch(authActions.login({ token: authToken, id: id }));
      goToHomePage();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        const errorData = error.response.data;
        Alert.alert("Thông báo", errorData.message + ".");
        return;
      }
      Alert.alert("Thông báo",error.message);
    }
  }
  function clearErrorMessage() {
    setInvalidPassword(null);
    setInvalidPassword(null);
  }
  function goToResetPage() {
    navigation.navigate("ForgotPassword");
  }
  function logInforChecking() {
    const { isValid: isValidPass, message: passwordMessage } =
      isValidPassword(password);
    const { isValid: isValidPhone, message: phoneMessage } =
      isValidPhoneNumber(phone);
    if (!isValidPhone) {
      setInvalidPhoneNumber(phoneMessage);
    }
    if (!isValidPass) {
      setInvalidPassword(passwordMessage);
    }
    if (!isValidPhone || !isValidPass) return true;
  }
  function updatePhone(text) {
    setPhone(text);
  }
  function updatePassword(text) {
    setPassword(text);
  }
  function signUpButtonHandler() {
    navigation.navigate("Signup");
  }
  function goToHomePage() {
    navigation.replace("Main", {
      screen: "HomeTab",
      params: { screen: "HomePage" },
    });
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <LoginSvg />
        </View>
        <View style={{ paddingHorizontal: "13%", marginTop: "2%" }}>
          <AuthInput
            icon1="call-outline"
            placeholder="Nhập số điện thoại"
            value={phone}
            keyboardType={"phone-pad"}
            onUpdateValue={updatePhone}
            onFocus={() => setInvalidPhoneNumber(null)}
          />
          {invalidPhoneNumber && (
            <Text style={styles.invalidInput}>{invalidPhoneNumber} *</Text>
          )}
          <AuthInput
            icon1="key-outline"
            placeholder="Nhập mật khẩu"
            icon2={true}
            secure={true}
            value={password}
            onUpdateValue={updatePassword}
            onFocus={() => setInvalidPassword(null)}
          />
          {invalidPassword && (
            <Text style={styles.invalidInput}>{invalidPassword} *</Text>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text onPress={goToResetPage} style={[styles.text, {color: color.baemin1}]}>
            Quên mật khẩu
          </Text>
        </View>

        <View style={{ alignItems: "center", marginTop: "2%" }}>
          <Button
            textVP="1%"
            textHP="24%"
            onPress={loginHandler}
            rippleColor="#afafaf"
            color={color.baemin1}
          >
            ĐĂNG NHẬP
          </Button>
          <Text
            style={[styles.text, { color: "black", paddingVertical: "1.5%" }]}
          >
            Hoặc
          </Text>
          <Button
            textSize={13}
            onPress={goToHomePage}
            rippleColor="#afafaf"
            color="#acacac"
          >
            KHÁM PHÁ NGAY
          </Button>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: "2%",
            marginBottom: 0,
            marginTop: "2%",
          }}
        >
          <Text style={[styles.text, { color: "black" }]}>
            Bạn chưa có tài khoản?
          </Text>
          <Text onPress={signUpButtonHandler} style={[styles.text, {color: color.baemin1}]}>
            Đăng ký tại đây
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50%",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "30%",
    resizeMode: "cover",
  },
  text: {
    fontFamily: "montserrat-medium",
    color: color.text_blue,
    padding: "1%",
    fontSize: 14,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: "14%",
    paddingVertical: "1.5%",
  },
  invalidInput: {
    fontFamily: "montserrat-italic",
    textAlign: "right",
    color: "red",
  },
});
