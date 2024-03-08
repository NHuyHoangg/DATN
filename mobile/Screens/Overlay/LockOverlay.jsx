import { useNavigation } from "@react-navigation/core";
import { StyleSheet, View, Image, Text } from "react-native";

export default function LockOverlay() {
    const navigation = useNavigation()
    const returnAuthPage = () => {
        navigation.navigate('Authenticate')
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.h1Text}>Bạn cần phải
                <Text
                    style={styles.linkText}
                    onPress={returnAuthPage}
                > đăng nhập </Text>
                để sử dụng chức năng này.
            </Text>
            <Image
                source={require('../../assets/images/lock.png')}
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
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderTopColor: '#E1E1E1',
    },
    imageStyle: {
        height: 150,
        width: 150,
        marginTop: '3%',
    },
    h1Text: {
        fontFamily: "montserrat-medium",
        fontSize: 18,
        paddingBottom: 15,
        textAlign: 'center',
        width: '80%',
    },
    linkText: {
        color: 'blue',
    }
});