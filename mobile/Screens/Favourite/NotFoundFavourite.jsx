import { View, StyleSheet, Text, Image } from "react-native";

export default function NotFoundFavourite({ type }) {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.h1Text}>Bạn chưa có {type == "product" ? "sản phẩm" : "bảng tin"} yêu thích nào cả</Text>
            <Text style={styles.lightText}>Hãy nhấn trái tim để lưu {type == "product" ? "đồng hồ" : "bảng tin"} vào danh sách yêu thích</Text>
            <Image
                source={require('../../assets/images/empty.png')}
                style={styles.imageStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    h1Text: {
        fontFamily: "montserrat-bold",
        fontSize: 18,
        paddingBottom: 15,
        textAlign: 'center',
        width: '80%',
    },
    lightText: {
        fontFamily: "montserrat-light",
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 10,
        width: '80%',
    },
    imageStyle: {

    }
})