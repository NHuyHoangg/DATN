import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import { isValidEmail, isValidPhoneNumber } from '../../utils/inputValidation';
import { changeUser } from '../../utils/user';
import SellerInfoSection from './Component/SellerInfoSection';
import PickImageModal from './Component/PickImageModal';
import { userActions } from '../../redux/user/userSlice';

export default function DetailInfo({ route, navigation }) {
    const { data, setData } = route.params;
    const token = useSelector(state => state.auth.token);
    const isSeller = useSelector(state => state.user.isSeller);
    const dispatch = useDispatch();


    const [modalVisible, setModalVisible] = useState(false);
    const [editable, setEditabel] = useState(false);

    const [lastName, setLastName] = useState(data.lastName);
    const [name, setName] = useState(data.name);
    const [phone, setPhone] = useState(data.phone);
    const [email, setEmail] = useState(data.email);
    const [province, setProvince] = useState(data.province);
    const [district, setDistrict] = useState(data.district);
    const [ward, setWard] = useState(data.ward);
    const [address, setAddress] = useState(data.address);
    const [image, setImage] = useState(data.image);

    const location = {
        province,
        setProvince,
        district,
        setDistrict,
        ward,
        setWard,
        address,
        setAddress,
    }

    const onChangeLastName = (value) => {
        setLastName(value);
    }

    const onChangeName = (value) => {
        setName(value)
    }

    const onChangePhone = (value) => {
        setPhone(value)
    }

    const onChangeEmail = (value) => {
        setEmail(value)
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={onChangeInfo}>
                    <Text style={styles.text}>{!editable ? 'Thay đổi' : 'Xác nhận'}</Text>
                </Pressable>
            ),
        });
    }, [navigation, editable, lastName, name, phone, email, province, district, ward, address, image]);

    const onChangeInfo = () => {

        if (editable) {
            if (!name || !lastName || !phone || !email) {
                Alert.alert("Xảy ra lỗi!!!", "Vui lòng điền đầy đủ hết các trường.");
                return;
            }

            if (!isValidEmail(email)) {
                Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập email hợp lệ.");
                return;
            }

            if (!isValidPhoneNumber(phone)) {
                Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập SĐT hợp lệ.");
                return;
            }

            if (isSeller) {
                if (ward == 0 || address == '') {
                    Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập địa chỉ hợp lệ.");
                    return;
                }
            }
            else {
                if ((ward == 0 && address != '') || (ward != 0 && address == 0)) {
                    Alert.alert("Xảy ra lỗi!!!", "Vui lòng nhập địa chỉ hợp lệ.");
                    return;
                }
            }

            Alert.alert(
                'Xác nhận',
                'Bạn có muốn lưu những thay đổi vừa nãy?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    { text: 'Xác nhận', onPress: () => sendInfo() },
                ]
            );
        }
        else {
            setEditabel(!editable);
        }
    }


    // Gửi request tới server
    const sendInfo = async () => {

        const info = {}

        if (image != data.image) info.image = image;
        if (lastName != data.lastName) info.lastName = lastName;
        if (name != data.name) info.name = name;
        if (phone != data.phone) info.phone = phone;
        if (email != data.email) info.email = email;
        if (province != data.province) info.province = province;
        if (district != data.district) info.district = district;
        if (ward != data.ward) info.ward = ward;
        if (address != data.address) info.address = address;

        if (Object.keys(info).length === 0) {
            setEditabel(!editable);
            return;
        }

        const res = await changeUser(token, info);

        if (res != 200) {
            Alert.alert("Xảy ra lỗi!!!", "Gửi yêu cầu không thành công.");
            return;
        }

        if (info.ward && info.address) {
            dispatch(userActions.validateSeller());
        }

        const newData = { ...data, ...info }
        setEditabel(!editable);
        setData(newData);
        navigation.navigate('Account');
    }


    return (
        <ScrollView style={styles.mainContainer} contentContainerStyle={{ paddingBottom: 15, }}>

            <PickImageModal modalVisible={modalVisible} setModalVisible={setModalVisible}
                setImage={setImage} />

            {/********Ảnh đại diện ******/}
            <View style={styles.infoViewStyle}>
                <Image
                    source={{ uri: image }}
                    style={styles.imageStyle}
                />
                <Pressable
                    pointerEvents={editable ? 'auto' : 'none'}
                    android_ripple={{ color: "#ccc" }}
                    style={({ pressed }) => [
                        styles.changeAvatarButton,
                        pressed ? styles.pressed : null,
                    ]}
                    onPress={() => setModalVisible(true)}
                >
                    <Entypo name="camera" size={22} color="white" />
                    <Text style={styles.buttonText}>Thay đổi ảnh đại diện</Text>
                </Pressable>
                <Pressable
                    pointerEvents={editable ? 'auto' : 'none'}
                    android_ripple={{ color: "#ccc" }}
                    style={({ pressed }) => [
                        styles.changeAvatarButton,
                        pressed ? styles.pressed : null,
                    ]}
                    onPress={() => navigation.navigate("ChangePassword")}
                >
                    <Entypo name="key" size={22} color="white" />
                    <Text style={styles.buttonText}>Thay đổi mật khẩu </Text>
                </Pressable>

            </View>


            {/*** Thông tin cá nhân ***/}
            <View style={styles.divider}></View>
            <Text style={styles.h1}>Thông tin cá nhân</Text>

            <Text style={styles.text}>Họ</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={onChangeLastName}
                editable={editable}
            />

            <Text style={styles.text}>Tên</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={onChangeName}
                editable={editable}
            />

            <Text style={styles.text}>Số điện thoại</Text>
            <TextInput
                value={phone}
                style={styles.input}
                editable={editable}
                keyboardType='numeric'
                onChangeText={onChangePhone}
            />

            <Text style={styles.text}>Email</Text>
            <TextInput
                value={email}
                style={styles.input}
                editable={editable}
                onChangeText={onChangeEmail}
            />

            {/*** Thông tin người bán */}
            <SellerInfoSection styles={styles} editable={editable} location={location} data={data} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        //flex: 1,
        backgroundColor: 'white',
    },
    infoViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
    },
    imageStyle: {
        width: 130,
        height: 130,
        borderRadius: 65,
    },
    name: {
        paddingVertical: '5%',
        fontFamily: "montserrat-semi-bold",
        fontSize: 20,
    },
    changeAvatarButton: {
        backgroundColor: '#697184',
        height: 35,
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },
    pressed: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 12,
        fontFamily: 'montserrat-semi-bold',
        color: 'white',
    },
    divider: {
        borderColor: '#E1E1E1',
        borderWidth: 1,
    },
    h1: {
        fontFamily: 'montserrat-semi-bold',
        fontSize: 18,
        paddingHorizontal: '4%',
        paddingTop: '3%',
    },
    text: {
        fontFamily: 'montserrat-medium',
        fontSize: 15,
        paddingLeft: '4%',
        paddingVertical: '3%',
    },
    input: {
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#E1E1E1',
        height: 37,
        paddingHorizontal: '4%',
        marginHorizontal: 10,
        fontFamily: 'montserrat-light',
        fontSize: 16,
    },
    addVerticalSpace: {
        height: 20,
    },
    passwordInput: {
        flex: 1,
        fontFamily: 'montserrat-light',
        fontSize: 14,
    },
    passwordInputHint: {
        fontFamily: 'montserrat-light',
        fontSize: 14,
    },
    passwordContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
})