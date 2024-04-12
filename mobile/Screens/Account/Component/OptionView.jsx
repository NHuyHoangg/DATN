import { StyleSheet, Text, View, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { authActions } from '../../../redux/auth/authSlice';
import AuctionSvg from '../../../assets/images/svg/Auction';
import Ionicons from "@expo/vector-icons/Ionicons";


export default function OptionView({ type, isize, color, data, setData }) {
    const navigation = useNavigation();
    const disPatch = useDispatch();
    let icon, text, dest;
    function logout(){
        disPatch(authActions.logout());
        navigation.replace(dest)
    }
    switch (type) {
        case "logout":
            text = "Đăng xuất";
            dest = "Authenticate";
            icon = <MaterialIcons name="logout" size={isize} color={color} style={{ marginRight: '5%' }} />;
            break;
        case "buy-history":
            text = "Đơn mua";
            dest = "ShoppingHistory";
            icon = <MaterialCommunityIcons name="purse-outline" size={isize} color={color} style={{ marginRight: '5%' }} />;
            break;
        case "sell-history":
            text = "Đơn bán";
            dest = "ShoppingHistory";
            icon = <MaterialCommunityIcons name="archive-outline" size={isize} color={color} style={{ marginRight: '5%' }} />;
            break;
        case "info":
            text = "Thông tin tài khoản";
            dest = "Info";
            icon = <AntDesign name="idcard" size={isize} color={color} style={{ marginRight: '5%' }} />
            break;
        case "auction":
            text = "Đấu giá của tôi";
            dest = "ShoppingHistory";
            icon = <AuctionSvg height={isize} width={isize} fill={color} style={{ marginRight: '5%' }}/>
            break;
        case "balance":
            text = "Quản lý số dư";
            dest = "ShoppingHistory";
            icon = <Ionicons name="wallet-outline" size={isize} color={color} style={{ marginRight: '5%' }} />;
            break;
        case "review":
            text = "Nhận xét từ người mua";
            dest = "ShoppingHistory";
            icon = <Ionicons name="reader-outline" size={isize} color={color} style={{ marginRight: '5%' }} />;
            break;
        case "language":
            text = "Ngôn ngữ";
            dest = "ShoppingHistory";
            icon = <Ionicons name="globe-outline" size={isize} color={color} style={{ marginRight: '5%' }} />;
            break;
        default:
            text = "Hỗ trợ khách hàng";
            dest = "Support";
            icon = <AntDesign name="infocirlceo" size={isize} color={color} style={{ marginRight: '5%' }} />
    }

    return (
        <Pressable
            android_ripple={{ color: "#ccc" }}
            style={({ pressed }) => [
                styles.optionViewStyle,
                pressed ? styles.pressed : null,
            ]}
            onPress={dest=="Authenticate"?logout:() => navigation.navigate(dest, { data, setData })}
        >
            {icon}
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    optionViewStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: '8%',
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderBottomColor: '#E1E1E1',
        paddingHorizontal: '5%',
    },
    pressed: {
        opacity: 0.5,
    },
    text: {
        fontFamily: "montserrat-medium",
        fontSize: 14,
    },
})