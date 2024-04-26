import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import ForgotPasswordSvg from "../../assets/images/svg/ForgotPasswordSvg";
import AuthInput from "../../Components/auth/AuthInput";
import Button from "../../Components/ui/Button";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { changePassword} from "../../utils/user";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/auth/authSlice";
import color from "../../constants/color";

export default function ChangePassword({ route, navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCurrentPassword, setInvalidCurrentPassword] = useState(false);
  const [invalidNewPassword, setInvalidNewPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [timeLeft, setTimeLeft] = useState();
  const disPatch = useDispatch();
  useEffect(() => {
    if (timeLeft == 0) {
      goToSignIn();
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function clearErrorMessage() {
    setInvalidNewPassword(null);
    setInvalidCurrentPassword(null);
    setInvalidConfirmPassword(null);
  }
  function updateCurrentPassword(text) {
    setCurrentPassword(text);
  }
  function updateNewPassword(text) {
    setNewPassword(text);
  }
  function updateConfirmPassword(text) {
    setConfirmPassword(text);
  }

  async function changePasswordHandler() {
    clearErrorMessage();
    if (InputChecking()) {
      return;
    }
    setIsLoading(true);
    try {
      const { message } = await changePassword(
        currentPassword,
        newPassword,
        confirmPassword,
        token
      );
      setSuccess(true);
      setTimeLeft(3);
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        Alert.alert("Thông báo", errorData.message);
        return;
      }
      Alert.alert("Thông báo", error.message);
    } finally {
      setIsLoading(false);
    }
  }
  function goToSignIn() {
    disPatch(authActions.logout());
    navigation.replace("Authenticate", {
      screen: "Login",
    });
  }

  function InputChecking() {
    let error = false;
    if (currentPassword.length < 6) {
      setInvalidCurrentPassword("Mật khẩu phải chứa ít nhất 6 ký tự");
      error = true;
    }
    if (newPassword.length < 6) {
      setInvalidNewPassword("Mật khẩu phải chứa ít nhất 6 ký tự");
      error = true;
    }
    if (newPassword != confirmPassword) {
      setInvalidConfirmPassword("Mật khẩu không trùng khớp");
      error = true;
    }

    return error;
  }
  if (isLoading) return <LoadingOverlay message="Đang reset mật khẩu" />;
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {success && (
          <Modal animationType="slide" transparent={true} visible={success}>
            <SafeAreaView style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={styles.modalImage}
                  source={require("../../assets/images/Green-Check.png")}
                />
                <Text style={styles.title}>THÀNH CÔNG</Text>
                <Text style={[styles.content]}>
                  Thay đổi mật khẩu thành công
                </Text>
                <Text style={[styles.content]}>
                  {" "}
                  Chuyển đến trang đăng nhập trong {timeLeft} giây
                </Text>
              </View>
            </SafeAreaView>
          </Modal>
        )}
        <View style={styles.img}>
          <ForgotPasswordSvg />
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            icon1="key-outline"
            placeholder="Mật khẩu hiện tại"
            keyboardType="default"
            icon2={true}
            secure={true}
            value={currentPassword}
            onUpdateValue={updateCurrentPassword}
            onFocus={() => setInvalidCurrentPassword(null)}
          />
          {invalidCurrentPassword && (
            <Text style={styles.invalidInput}>{invalidCurrentPassword}</Text>
          )}
          <AuthInput
            icon1="key"
            placeholder="Mật khẩu mới"
            keyboardType="default"
            icon2={true}
            secure={true}
            value={newPassword}
            onUpdateValue={updateNewPassword}
            onFocus={() => setInvalidNewPassword(null)}
          />
          {invalidNewPassword && (
            <Text style={styles.invalidInput}>{invalidNewPassword} *</Text>
          )}
          <AuthInput
            icon1="key"
            placeholder="Xác nhận mật khẩu"
            keyboardType="default"
            icon2={true}
            secure={true}
            value={confirmPassword}
            onUpdateValue={updateConfirmPassword}
            onFocus={() => setInvalidConfirmPassword(null)}
          />
          {invalidConfirmPassword && (
            <Text style={styles.invalidInput}>{invalidConfirmPassword} *</Text>
          )}
        </View>
        <Button
          rippleColor="#afafaf"
          marX="15%"
          marY="3%"
          color={color.baemin2}
          textVP="1%"
          borR={8}
          onPress={changePasswordHandler}
        >
          Xác nhận
        </Button>
      </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "20%",
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    marginVertical: "1%",
  },
  content: {
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    marginVertical: "1%",
  },

  modalImage: {
    width: 50,
    height: 50,
  },
  modalContainer: {
    backgroundColor: "white",
    alignItems: "center",
  },
});
