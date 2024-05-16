import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,Alert
} from "react-native";
import React, { useState } from "react";
import ResetSuccessfully from "../../Components/ui/ResetSuccessfully";
import ForgotPasswordSvg from "../../assets/images/svg/ForgotPasswordSvg";
import AuthInput from "../../Components/auth/AuthInput";
import Button from "../../Components/ui/Button";
import { isValidEmail, isValidPhoneNumber } from "../../utils/inputValidation";
import { SafeAreaView } from "react-native-safe-area-context";
import { forgotPassword } from "../../utils/authenticate";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import color from "../../constants/color";
export default function ForgotPassword({ route, navigation }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [success,setSuccess] = useState(false);
  
  function clearErrorMessage() {
    setInvalidPhoneNumber(null);
    setInvalidEmail(null);
  }
  function updatePhone(text) {
    setPhone(text);
  }

  async function forgotPasswordHandler() {
    clearErrorMessage();
    if (!InputChecking()) {
      return;
    }
    setIsLoading(true);
    try {
      const {message,sentEmail} = await forgotPassword(phone,email);
      setSuccess(true);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        Alert.alert("Thông báo",errorData.message);
        return;
      }
      Alert.alert("Thông báo",error.message);
    }
    finally{
      setIsLoading(false);
    }
  }
  function goToSingIn(){
    navigation.replace("Authenticate", {
      screen: "Login",
    });
  }
  function updateEmail(text) {
    setEmail(text);
  }
  function InputChecking() {
    let error = true;

    const { isValid: isValidPhone, message: phoneMessage } =
      isValidPhoneNumber(phone);

    const { isValid: isValidMail, message: emailMessage } = isValidEmail(email);
    if (!isValidPhone) {
      setInvalidPhoneNumber(phoneMessage);
    }
    if (!isValidMail) {
      setInvalidEmail(emailMessage);
    }

    if (!isValidPhone || !isValidMail) error = false;

    return error;
  }
  if (isLoading) return <LoadingOverlay message="Đang reset mật khẩu"/>
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {!success?<View style={styles.container}>
        <View style={styles.img}>
          <ForgotPasswordSvg />
        </View>
        <View style={styles.content}>
          <Text style={styles.instruction}>
            Nhập số điện thoại và email đã đăng ký để lấy lại mật khẩu
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            icon1="call-outline"
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            value={phone}
            onUpdateValue={updatePhone}
            onFocus={() => setInvalidPhoneNumber(null)}
          />
          {invalidPhoneNumber && (
            <Text style={styles.invalidInput}>{invalidPhoneNumber} *</Text>
          )}
          <AuthInput
            icon1="mail-outline"
            placeholder="Nhập email"
            keyboardType="email-address"
            value={email}
            onUpdateValue={updateEmail}
            onFocus={() => setInvalidEmail(null)}
          />
          {invalidEmail && (
            <Text style={styles.invalidInput}>{invalidEmail} *</Text>
          )}
        </View>
        <Button
          rippleColor="#afafaf"
          marX="15%"
          marY="3%"
          color={color.baemin1}
          textVP="1%"
          borR={8}
          onPress={forgotPasswordHandler}
        >
          Xác nhận
        </Button>
      </View>:<ResetSuccessfully email={email} onPress={goToSingIn}/>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  img: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginTop:5,
    paddingHorizontal: "15%",
  },
  invalidInput: {
    fontFamily: "montserrat-italic",
    textAlign: "right",
    color: "red",
  },
  content: {
    marginVertical: "1%",
  },
  instruction: {
    marginHorizontal: "5%",
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: 16,
  },
});
