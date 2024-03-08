import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState } from 'react'
import SellerModal from '../../Components/ui/SellerModal';

function SlModal() {
  return <>
    <SellerModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    <Button title="Press me" onPress={() => {
      setModalVisible(true);
    }} />
  </>
}

export default function SupportPage({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.h1Text}>Email liên lạc</Text>
      <Text style={styles.text}>shopdongho@gmail.com</Text>

      <Text style={styles.h1Text}>Tổng đài hỗ trợ</Text>
      <Text style={styles.text}>0902.678.910</Text>

      <Text style={styles.h1Text}>Giới thiệu về chúng tôi</Text>
      <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquet lectus lectus, eget aliquet dolor egestas nec. Nulla facilisi. Nulla imperdiet molestie dignissim. Quisque consequat malesuada libero et varius. Aenean eu pharetra risus. Aliquam vitae volutpat tellus. Nunc eu egestas velit. Ut eleifend dui purus, id pharetra lacus auctor iaculis.</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderTopColor: '#E1E1E1',
    borderTopWidth: 1,
  },
  h1Text: {
    fontFamily: 'montserrat-bold',
    fontSize: 20,
    marginBottom: '3%',
  },
  text: {
    fontFamily: 'montserrat-light',
    fontSize: 17,
    marginBottom: '3%',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    opacity: 0.9,
  },
})