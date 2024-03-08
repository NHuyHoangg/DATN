import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
export default function DropList({ onPress, style, data, placeholder }) {
    const [isShow, setIsShow] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.placeholder}>{placeholder ? placeholder : "Chọn item"}</Text>
                <Ionicons style={styles.icon} color='#6b7386' name="chevron-down-outline" size={20} />
            </View>
            {isShow&&<View></View>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '80%',
        flexDirection: 'row',
        height: '7%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    innerContainer:{
        borderColor:'#6b7386',
        height:'100%',
        borderWidth:1,
        width: '100%',
        flexDirection:'row',
        alignItems: 'center',
    },
    placeholder: {
        marginLeft:20,
        marginRight:'auto',
        fontFamily:'montserrat-semi-bold'
    },
    icon:{
        marginRight:20,
        marginLeft:'auto',
    }
})