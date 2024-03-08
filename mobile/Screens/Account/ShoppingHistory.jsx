import { StyleSheet, View, Text  } from 'react-native'
import React from 'react'

export default function ShoppingHistory({}) {


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>Tính năng này hiện đang trong giai đoạn phát triển</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text : {
    width: '70%',
    fontFamily: 'montserrat-light',
    fontSize: 15,
    textAlign: 'center',
  }
})