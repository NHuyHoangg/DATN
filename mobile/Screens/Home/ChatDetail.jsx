import { StyleSheet, Text,Image, View, Pressable,Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const avatarSize=screenHeight/15
export default function ChatDetail({ navigation,route }) {
  const {avatar,isOnline,name,message }= route.params
  function backButtonHandler() {
    navigation.goBack()
  }
 
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={{ flexDirection: 'row', paddingHorizontal: '5%',paddingVertical:'2%' ,borderBottomWidth:1,borderColor:'#d1d1d1'}}>
        <View style={styles.backIcon}>
          <Pressable onPress={backButtonHandler} android_ripple={{ color: '#d1d1d1' }} >
            <Ionicons name='arrow-back-outline' size={26} />
          </Pressable>
        </View>
        <View style={{ width: avatarSize, height: avatarSize,marginHorizontal:10}}>
          <Image
            style={styles.avatarImg}
            source={{
              uri: avatar,
            }}
          />
          <View style={[styles.onlineDot, isOnline && { backgroundColor: 'grey' }]}>
          </View>
        </View>
        <View style={{marginLeft:'0%',paddingVertical:'2%',justifyContent:'space-around'}}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text style={styles.message}>
          {message[0]}
        </Text>
      </View>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fefdfd',
  },
  avatarImg:{
    width:avatarSize,
    height:avatarSize,
    borderRadius:100
  },
  backIcon: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'

  },
  onlineDot:{
    height:avatarSize/7,
    position:'absolute',
    width:avatarSize/7,
    backgroundColor:'green',
     borderRadius:300,marginLeft:avatarSize*0.75,
     marginTop:avatarSize*0.80

  },
  
  name: {
    fontSize: 16,
    fontFamily: 'montserrat-bold',
    
  },
  message:{
    fontSize: 12,
    fontFamily: 'montserrat-italic'
  },
})