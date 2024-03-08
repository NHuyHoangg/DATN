import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  Alert,
  Pressable,
  Dimensions,
  BackHandler,
} from "react-native";
import Input from "../../Components/ui/Input";
import Button from "../../Components/ui/Button";
import RadioInput from "../../Components/ui/RadioInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Icons from "@expo/vector-icons";
import color from "../../constants/color";
import { HeaderBackButton } from "@react-navigation/elements";
import SelectInput from "../../Components/ui/SelectInput";
import { useState, useLayoutEffect, useEffect } from "react";
import ImageList from "../../Components/ui/ImageList";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { watchDetailsActions } from "../../redux/watch/watchDetailsSlice";
import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  PermissionStatus,
  MediaTypeOptions,
} from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import { sendNewPost, editPost } from "../../utils/watch";
import { tradingActions } from "../../redux/trading/tradingSlice";
const ManageWatch = (props) => {
  const token = useSelector((state) => state.auth.token);
  // console.log("token = ", token);
  const navigation = useNavigation();
  const isAdding = props.route.params.isAdding;
  // console.log("isAdding = ", isAdding);
  const images = useSelector((state) => state.details.item.updatedImages);
  const imagesLen = images.length;
  const originalImages = useSelector((state) => state.details.item.images);
  let detailsInfor = useSelector((state) => state.details.item);
  let watch_id = detailsInfor.watch_id;
  watch_id = !!watch_id ? watch_id : "";
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    watch_id: {
      value: isAdding ? "" : watch_id,
      isValid: true,
    },
    name: {
      value: isAdding ? "" : detailsInfor.name,
      isValid: true,
    },
    price: {
      value: isAdding ? "" : detailsInfor.price.toString(),
      isValid: true,
    },
    brand: {
      value: isAdding ? "" : detailsInfor.brand,
      isValid: true,
    },
    size: {
      value: isAdding ? "" : detailsInfor.size.toString(),
      isValid: true,
    },
    description: {
      value: isAdding ? "" : detailsInfor.description,
      isValid: true,
    },
    strap_type: {
      value: isAdding ? "" : detailsInfor.strap_type,
      isValid: true,
    },
    status: isAdding ? "Mới" : detailsInfor.status,
    waterproof: isAdding ? "Có" : detailsInfor.waterproof,
    gender: isAdding ? "Nam" : detailsInfor.gender,
  });

  // Config Header
  useLayoutEffect(() => {
    const title = props.route.params.isAdding
      ? "Thêm đồng hồ"
      : "Sửa thông tin đồng hồ";
    props.navigation.setOptions({
      title: title,
      headerTitleAlign: "center",
      headerBackVisible: false,
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            Alert.alert("Thông báo", "Bạn có muốn tiếp tục chỉnh sửa không ?", [
              {
                text: "Tiếp tục",
              },
              {
                text: "Hủy bỏ",
                onPress: () => navigation.goBack(),
              },
            ]);
            // console.log("back pressed");
          }}
          canGoBack={true}
          pressColor="#ccc"
        />
      ),
    });
  }, []);

  // Hardware Back Button
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Thông báo", "Bạn có muốn tiếp tục chỉnh sửa không ?", [
        { text: "Tiếp tục" },
        {
          text: "Hủy bỏ",
          onPress: () => navigation.goBack(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    // console.log("enteredValue = ", enteredValue);
    if (["gender", "status", "waterproof"].includes(inputIdentifier)) {
      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: enteredValue,
        };
      });
    } else {
      if (["size", "price"].includes(inputIdentifier)) {
        const len = enteredValue.length;
        const lastElem = enteredValue.slice(-1);
        if (isNaN(lastElem)) {
          enteredValue = enteredValue.substring(0, len - 1);
        }
      }
      setInputs((curInputs) => {
        return {
          ...curInputs,
          [inputIdentifier]: { value: enteredValue, isValid: true },
        };
      });
    }
  };

  const submitHandler = async () => {
    const postData = {
      post_id: isAdding ? "" : detailsInfor.id, // T
      watch_id: inputs.watch_id.value,
      name: inputs.name.value,
      price: +inputs.price.value,
      brand: inputs.brand.value,
      status: inputs.status, // T
      case_size: +inputs.size.value,
      waterproof: inputs.waterproof, // T
      gender: inputs.gender, // T
      strap_material: inputs.strap_type.value,
      images: images,
      description: inputs.description.value, // T
    };
    // console.log("postData = ", postData);
    const nameIsValid = postData.name.trim().length > 0;
    const priceIsValid = !isNaN(postData.price) && postData.price >= 1;
    const brandIsValid = postData.brand.trim().length > 0;
    const sizeIsValid = !isNaN(postData.case_size) && postData.case_size >= 1;
    const strapTypeIsValid = postData.strap_material.trim().length > 0;
    const imagesIsValid = imagesLen > 0;
    if (!imagesIsValid) {
      Alert.alert("Thông báo", "Bạn vui lòng chọn ít nhất 1 hình ảnh", [
        { text: "Đồng ý" },
      ]);
    } else if (!nameIsValid) {
      Alert.alert("Thông báo", "Bạn vui lòng không để trống tên sản phẩm", [
        { text: "Đồng ý" },
      ]);
      setInputs((curInput) => {
        return {
          ...curInput,
          name: { value: inputs.name.value, isValid: nameIsValid },
        };
      });
    } else if (!priceIsValid) {
      Alert.alert("Thông báo", "Giá tiền phải là số nguyên", [
        { text: "Đồng ý" },
      ]);
      setInputs((curInput) => {
        return {
          ...curInput,
          price: { value: inputs.price.value, isValid: priceIsValid },
        };
      });
    } else if (!brandIsValid) {
      Alert.alert("Thông báo", "Bạn vui lòng không để trống thương hiệu", [
        { text: "Đồng ý" },
      ]);
      setInputs((curInput) => {
        return {
          ...curInput,
          brand: { value: inputs.brand.value, isValid: brandIsValid },
        };
      });
    } else if (!sizeIsValid) {
      Alert.alert(
        "Thông báo",
        "Bạn vui lòng không để trống kích thước mặt số",
        [{ text: "Đồng ý" }]
      );
      setInputs((curInput) => {
        return {
          ...curInput,
          size: { value: inputs.size.value, isValid: sizeIsValid },
        };
      });
    } else if (!strapTypeIsValid) {
      Alert.alert("Thông báo", "Bạn vui lòng không để trống loại dây", [
        { text: "Đồng ý" },
      ]);
      setInputs((curInput) => {
        return {
          ...curInput,
          strap_type: {
            value: inputs.strap_type.value,
            isValid: strapTypeIsValid,
          },
        };
      });
    } else {
      // console.log("submit! ", typeof postData);
      // console.log(postData);

      Alert.alert("Thông báo xác nhận", "Bạn có muốn gửi bài đăng không ?", [
        { text: "Hủy" },
        {
          text: "Xác nhận",
          onPress: async () => {
            try {
              const processedImages = await convertToBase64(images);
              postData.images = [...processedImages];
              // console.log("postData = ", postData);
              // if (isAdding) {
              //   sendNewPost(token, postData);
              // } else {
              //   editPost(token, postData);
              // }
              if (!isAdding) {
                dispatch(watchDetailsActions.updatePost(postData));
              }
              navigation.goBack();
              manageWatchPost(token, postData);
            } catch (err) {
              console.log(err);
            }
          },
        },
      ]);
    }
  };
  const manageWatchPost = (token, data) => {
    const managePost = async (token, data) => {
      if (isAdding) {
        const formattedData = {
          id: -1,
          watch_id: data.watch_id,
          name: data.name,
          status: data.status,
          size: data.case_size,
          price: data.price,
          image: data.images[0],
          date: "Đang tải",
          location: "Đang tải",
        };
        dispatch(tradingActions.addNewSellingItem(formattedData));
        await sendNewPost(token, data);
        
      } else {
        const formattedData = {
          id: data.post_id,
          watch_id: data.watch_id,
          name: data.name,
          status: data.status,
          size: data.case_size,
          price: data.price,
          image: data.images[0],
        };
        dispatch(tradingActions.updateSellingItem(formattedData));
        await editPost(token, data);
        
      }
    };
    managePost(token, data);
  };
  const openGallery = async () => {
    // console.log("open gallery");
    if (imagesLen >= 6) {
      Alert.alert("Thông báo", "Bạn chỉ có thể chọn tối đa 6 hình ảnh.", [
        { text: "Đồng ý" },
      ]);
    } else {
      try {
        let result = await launchImageLibraryAsync({
          allowsEditing: false,
          allowsMultipleSelection: true,
          quality: 1,
          mediaTypes: MediaTypeOptions.Images,
          orderedSelection: true,
          selectionLimit: 6,
          base64: true,
        });
        if (!result.canceled) {
          // console.log("result = ", result);
          dispatch(
            watchDetailsActions.addImages(
              result.assets.map((asset) => asset.uri)
            )
          );
          // dispatch(watchDetailsActions.addImages(result.assets));
        } else {
          // throw new Error("Errors occured!");
        }
      } catch (err) {
        console.error("Error while picking an image:", err);
      }
    }
  };
  const convertToBase64 = async (images) => {
    try {
      const base64Images = await Promise.all(
        images.map(async (image) => {
          if (!originalImages.includes(image)) {
            const res = await manipulateAsync(image, [], {
              compress: 0.3,
              base64: true,
            });
            return "data:image/png;base64," + res.base64;
          } else {
            return image;
          }
        })
      );
      return base64Images;
    } catch (error) {
      console.error("Error while converting images to base64:", error);
      // return [];
    }
  };
  return (
    <Pressable
      style={styles.root}
      onReq={() => {
        Alert.alert("Title", "Content", [{ text: "OK" }]);
      }}
    >
      {(isAdding && imagesLen > 0) || (!isAdding && imagesLen > 0) ? (
        <ImageList
          onOpenGallery={openGallery}
          // onCloseImage={closeImage}
          // images={imageList}
        />
      ) : (
        <Pressable style={styles.image} onPress={openGallery}>
          <View style={styles.hint}>
            <AntDesign name="questioncircleo" size={16} color="black" />
          </View>
          <View style={styles.camera}>
            <Icons.FontAwesome name="camera" size={24} color="black" />
            <Text style={styles.text}>Đăng từ 1 đến 6 hình</Text>
          </View>
        </Pressable>
      )}
      <ScrollView style={styles.form}>
        <Input
          icon={
            <MaterialCommunityIcons name="identifier" size={24} color="black" />
          }
          label="Mã sản phẩm"
          invalid={false}
          inputConfig={{
            placeholder: "Không bắt buộc",
            maxLength: 30,
            // autoFocus: true,
            inputMode: "text",
            onChangeText: inputChangeHandler.bind(this, "watch_id"),
            value: inputs.watch_id.value,
          }}
        />
        <Input
          icon={
            <MaterialCommunityIcons
              name="alphabet-latin"
              size={24}
              color={inputs.name.isValid ? "black" : color.red}
            />
          }
          label="Tên sản phẩm"
          invalid={!inputs.name.isValid}
          inputConfig={{
            placeholder: "Nhập tên đồng hồ",
            maxLength: 30,
            // autoFocus: true,
            inputMode: "text",
            onChangeText: inputChangeHandler.bind(this, "name"),
            value: inputs.name.value,
          }}
          // value={detailsInfor.name}
        />
        <Input
          icon={
            <MaterialIcons
              name="attach-money"
              size={20}
              color={inputs.price.isValid ? "black" : color.red}
            />
          }
          label="Giá tiền"
          invalid={!inputs.price.isValid}
          inputConfig={{
            placeholder: "Nhập giá tiền",
            inputMode: "numeric",
            maxLength: 30,
            onChangeText: inputChangeHandler.bind(this, "price"),
            value: inputs.price.value,
          }}
          // value={detailsInfor.price}
        />
        {/* <Input
          icon={<Feather name="globe" size={20} color="black" />}
          label="Nguồn gốc"
          inputConfig={{
            placeholder: "Nhập tên quốc gia",
            inputMode: "text",
            maxLength: 20,
            onChangeText: inputChangeHandler.bind(this, "nation"),
            value: inputs.nation.value,
          }}
          // value={detailsInfor.nation}
        /> */}
        <Input
          icon={
            <Feather
              name="watch"
              size={24}
              color={inputs.brand.isValid ? "black" : color.red}
            />
          }
          label="Thương hiệu"
          invalid={!inputs.brand.isValid}
          inputConfig={{
            placeholder: "Nhập tên thương hiệu",
            inputMode: "text",
            maxLength: 20,
            onChangeText: inputChangeHandler.bind(this, "brand"),
            value: inputs.brand.value,
          }}
          // value={detailsInfor.brand}
        />
        <RadioInput
          icon={
            <Ionicons name="checkmark-circle-outline" size={22} color="black" />
          }
          label="Tình trạng"
          options={["Mới", "Cũ"]}
          value={isAdding ? "Mới" : inputs.status}
          onChangeText={inputChangeHandler.bind(this, "status")}
        />
        <Input
          icon={
            <MaterialCommunityIcons
              name="clock-time-nine-outline"
              size={22}
              color={inputs.size.isValid ? "black" : color.red}
            />
          }
          label="Cỡ mặt số"
          invalid={!inputs.size.isValid}
          inputConfig={{
            placeholder: "Đường kính mặt số (mm)",
            inputMode: "numeric",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "size"),
            value: inputs.size.value,
          }}
          // value={detailsInfor.size}
        />

        <RadioInput
          icon={<FontAwesome5 name="user-circle" size={20} color="black" />}
          label="Kiểu dáng"
          options={["Nam", "Nữ", "Unisex"]}
          value={isAdding ? "Nam" : inputs.gender}
          onChangeText={inputChangeHandler.bind(this, "gender")}
        />

        {/* <Input
          icon={<Entypo name="ruler" size={24} color="black" />}
          label="Độ dày"
          inputConfig={{
            placeholder: "Nhập độ dày đồng hồ (mm)",
            inputMode: "text",
            maxLength: 20,
          }}
        /> */}

        <RadioInput
          icon={
            <MaterialCommunityIcons
              name="water-off-outline"
              size={24}
              color="black"
            />
          }
          options={["Có", "Không"]}
          label="Chống nước"
          value={isAdding ? "Có" : inputs.waterproof}
          onChangeText={inputChangeHandler.bind(this, "waterproof")}
        />

        {/* <RadioInput
          label="Loại dây"
          icon={
            <MaterialCommunityIcons name="sine-wave" size={24} color="black" />
          }
          options={["Kim loại", "Da", "Khác"]}
        /> */}
        <Input
          icon={
            <MaterialCommunityIcons
              name="sine-wave"
              size={24}
              color={inputs.strap_type.isValid ? "black" : color.red}
            />
          }
          label="Loại dây"
          invalid={!inputs.strap_type.isValid}
          inputConfig={{
            placeholder: "Kim loại, Nhựa, Da,...",
            inputMode: "text",
            onChangeText: inputChangeHandler.bind(this, "strap_type"),
            value: inputs.strap_type.value,
          }}
        />
        <Input
          icon={<Ionicons name="md-menu-outline" size={24} color="black" />}
          label="Mô tả"
          invalid={false}
          inputConfig={{
            placeholder: "Mô tả thêm về sản phẩm",
            multiline: true,
            inputMode: "text",
            onChangeText: inputChangeHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
          // value={detailsInfor.description}
        />
      </ScrollView>
      <Button
        onPress={submitHandler}
        color={color.button_indigo}
        marX="5%"
        marY="2.5%"
      >
        Xong
      </Button>
    </Pressable>
  );
};

export default ManageWatch;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    marginVertical: "5%",
    // justifyContent: "center",
  },
  root: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    // backgroundColor: 'blue'
  },
  image: {
    width: "90%",
    height: "20%",
    backgroundColor: "#F2F1EF",
    marginHorizontal: "5%",
    marginVertical: "0%",
    borderRadius: 8,
  },
  hint: {
    // backgroundColor: "green",
    alignItems: "flex-end",
    marginTop: "2.5%",
    marginRight: "2.5%",
  },
  camera: {
    flex: 1,
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },
  text: {
    fontFamily: "montserrat-bold",
  },
  form: {
    flex: 1,
    marginVertical: "2.5%",
  },
});
