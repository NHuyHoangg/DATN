import { Modal, StyleSheet, Pressable, Text, TextInput, View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { SelectList } from 'react-native-dropdown-select-list';

import Button from "./Button";
import LoadingOverlay from "../../Screens/Overlay/LoadingOverlay";
import { getLocation } from "../../utils/location";
import { changeUser } from "../../utils/user"
import ErrorOverlay from "../../Screens/Overlay/ErrorOverlay";
import { useSelector, useDispatch } from "react-redux";
import {userActions} from "../../redux/user/userSlice";
export default function SellerModal({ modalVisible, setModalVisible }) {

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [change, setChange] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const dataFetch = await getLocation();
                setData(dataFetch);
                setError(null);
            }
            catch (err) {
                setError("Không thể tải thông tin");
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [change])

    const [province, setProvince] = useState('0');
    const [district, setDistrict] = useState('0');
    const [ward, setWard] = useState('0');
    const [address, setAddress] = useState('');

    const selectProvince = (val) => {
        if (val === province) {
            return;
        }
        setProvince(val);
    }

    const selectDistrict = (val) => {
        if (val === district) {
            return;
        }
        setDistrict(val);
    }

    const selectWard = (val) => {
        if (val === ward) {
            return;
        }
        setWard(val);
    }

    const onChangeAddress = (val) => {
        setAddress(val);
    }

    const onSubmit = async () => {
        const sellerInfo = {
            province,
            district,
            ward,
            address
        }

        if (ward == 0 || address == '') {
            Alert.alert("Xảy ra lỗi!!!", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const res = await changeUser(token, sellerInfo);
        if (res != 200) {
            Alert.alert("Xảy ra lỗi!!!", "Gửi yêu cầu thất bại.");
            return;
        }
        else {
            Alert.alert("Thành công!!!", "Bạn đã trở thành người bán.");
            setModalVisible(false);
            dispatch(userActions.validateSeller());
            return;
        }
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >

            <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
                <Pressable style={styles.modalView}>
                    {error && !isLoading ? <ErrorOverlay message={error} reload={setChange} /> :
                        isLoading ? <LoadingOverlay /> :
                            <>
                                <Text style={styles.h1Text}>Thông tin người bán</Text>
                                <Text style={styles.lightText}>Để trở thành người bán bạn hãy nhập những thông tin sau</Text>

                                <View style={styles.selectListContainer}>
                                    <SelectList
                                        setSelected={(val) => selectProvince(val)}
                                        data={data.provinces}
                                        save="key"
                                        placeholder="Tỉnh/Thành phố"
                                        defaultOption={{ key: 0, value: "Tỉnh/Thành phố" }}
                                        boxStyles={styles.selectListInput}
                                        dropdownStyles={[styles.selectListInput, { height: 100 }]}
                                        inputStyles={styles.textInput}
                                        dropdownTextStyles={styles.textInput}
                                    />
                                </View>

                                <View style={styles.selectListContainer}
                                    pointerEvents={(province != '0') ? 'auto' : 'none'}>
                                    <SelectList
                                        setSelected={(val) => selectDistrict(val)}
                                        data={data.districts[province]}
                                        save="key"
                                        boxStyles={styles.selectListInput}
                                        defaultOption={province == 0 ? { key: 0, value: "Quận/Huyện/Thị xã" }
                                            : data.districts[province][0]}
                                        dropdownStyles={[styles.selectListInput, { height: 100 }]}
                                        inputStyles={styles.textInput}
                                        dropdownTextStyles={styles.textInput}
                                    />
                                </View>

                                <View style={styles.selectListContainer}
                                    pointerEvents={(district != '0') ? 'auto' : 'none'}>
                                    <SelectList
                                        setSelected={(val) => selectWard(val)}
                                        data={data.wards[district]}
                                        save="key"
                                        defaultOption={district == 0 ? { key: 0, value: "Phường/Xã/Thị trấn" }
                                            : data.wards[district][0]
                                        }
                                        boxStyles={styles.selectListInput}
                                        dropdownStyles={[styles.selectListInput, { height: 100 }]}
                                        inputStyles={styles.textInput}
                                        dropdownTextStyles={styles.textInput}
                                    />
                                </View>

                                <TextInput
                                    onChangeText={onChangeAddress}
                                    style={[styles.textInput, styles.boxTextInput]}
                                    placeholder="Địa chỉ cụ thể"
                                />

                                <Button color='#353AB5' onPress={onSubmit}>Hoàn thành</Button>

                            </>
                    }
                </Pressable>
            </Pressable>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        opacity: 0.9,
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: "white",
        minHeight: 400,
        maxHeight: '100%',
        width: '90%',
        borderRadius: 7.5,
        borderWidth: 1,
        paddingHorizontal: '2%',
        paddingVertical: 15,
    },
    h1Text: {
        fontFamily: "montserrat-bold",
        fontSize: 18,
        paddingBottom: 15,
        textAlign: 'center',
    },
    lightText: {
        fontFamily: "montserrat-semi-bold",
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 10,
    },
    textInput: {
        fontFamily: 'montserrat-regular',
        fontSize: 12,
    },
    selectListInput: {
        //alignItems: 'center',
        width: '100%',
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#E1E1E1',
        height: 43,
    },
    selectListContainer: {
        marginBottom: 15,
        maxHeight: 160,
        width: '100%',
    },
    boxTextInput: {
        width: '100%',
        height: 43,
        borderWidth: 2,
        borderRadius: 6,
        borderColor: '#E1E1E1',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
})