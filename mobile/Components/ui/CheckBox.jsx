import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function CheckBox({ isCheck, size, color,style,onPress }) {
    return (
        <View style={style}>
        <Ionicons
            name={isCheck? "checkbox" : "square-outline"}
            size={size ? size : 20}
            color={color?color:'black'}
            onPress={onPress}
        />
        </View>
    )

}

const styles = StyleSheet.create({})