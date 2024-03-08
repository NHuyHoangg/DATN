import { Modal, StyleSheet, Pressable, Text } from "react-native";
import {
    launchCameraAsync,
    launchImageLibraryAsync,
    useCameraPermissions,
    PermissionStatus,
    MediaTypeOptions,
} from 'expo-image-picker';

import Button from "../../../Components/ui/Button";

export default function PickImageModal({ modalVisible, setModalVisible, setImage }) {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const verifyPermissions = async () => {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Yêu cầu quyền truy cập!',
                'Bạn cần cấp quyền sử dụng camera cho ứng dụng hoạt động.'
            );
            return false;
        }

        return true;
    }

    const openGallery = async () => {

        let result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            base64: true,
        });
        
        const base64image = 'data:image/png;base64,' + result.assets[0].base64;

        setImage(base64image);
        setModalVisible(false);
    }

    const openCamera = async () => {

        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        let result = await launchCameraAsync({
            base64: true,
        });

        const base64image = 'data:image/jpeg;base64,' + result.assets[0].base64;

        setImage(base64image);
        setModalVisible(false);
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
                    <Text style={styles.h1Text}>Lựa chọn thao tác chọn ảnh</Text>

                    <Button color={'#353AB5'} onPress={openGallery} width="80%">Chọn ảnh có sẵn</Button>
                    <Button color={'#353AB5'} onPress={openCamera} width="80%">Chụp ảnh mới</Button>
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
        backgroundColor: "gray",
        opacity: 0.9,
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: "white",
        height: '23%',
        width: '60%',
        borderRadius: 7.5,
        paddingHorizontal: '2%',
        paddingVertical: 15,
    },
    h1Text: {
        fontFamily: "montserrat-medium",
        fontSize: 15,
        paddingBottom: 15,
        textAlign: 'center',
    },

    textInput: {
        fontFamily: 'montserrat-light',
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