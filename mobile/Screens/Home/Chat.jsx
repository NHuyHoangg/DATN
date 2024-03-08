import { StyleSheet, FlatList,Image, Text,View, TextInput, Pressable, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import { cList } from '../../constants/data'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const avatarSize=screenHeight/10
export default function Chat({ navigation}) {
  const chatList = cList
  const [inputText, setInputText] = useState()
  function onTyping() {

  }
  function backButtonHandler(){
    navigation.goBack()
  }


  return (
    <>
      <SafeAreaView style={styles.rootContainer}>
        <View style={{ width: '100%', alignItems: 'center'}}>
          <View style={styles.innerTopContainer}>
            <View style={styles.backIcon}>
              <Pressable onPress={backButtonHandler} android_ripple={{ color: '#d1d1d1' }} >
                <Ionicons name='arrow-back-outline' size={26} />
              </Pressable>
            </View>
            <View style={styles.inputTextContainer}>
              <Ionicons name='search' size={26} color='#9D9D9D' />
              <TextInput
                style={styles.input}
                placeholder='Tìm liên hệ'
                onChangeText={onTyping}
                value={inputText}
                autoComplete={'off'}
                autoCorrect={false}
              />
            </View>
          </View>
        </View>
      
      <FlatList
        style={{backgroundColor:'#ffffff',padding:20}}
        data={chatList}
        renderItem={({item,key})=><Box id={item.id} avatar ={item.avatar} name={item.name} message={item.message} isOnline={item.isOnline} unReadMes={item.numOfUnRead}/>}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponentStyle={{ color: "#ccc" }}
      />
 
      </SafeAreaView>
    </>
  )
}
function Box({id,avatar, name,message,isOnline,unReadMes}){
  const navigation = useNavigation()
  function chatCardHandler(){
    navigation.navigate('ChatDetail',{avatar:avatar,isOnline:isOnline,name:name,message:message})
  }
  return(
    <View style={styles.chatContainer}>
    <Pressable onPress={chatCardHandler}  style={({pressed})=>[pressed&&{opacity:0.5}]}>
    <View  style={{backgroundColor:'#f9f6f6',flexDirection:'row'}}>
      <View style={{ width:avatarSize,height:avatarSize}}>
      <Image
        style={styles.avatarImg}
        source={{
          uri: avatar ,
        }}
      />
      <View style={[styles.onlineDot,isOnline&&{backgroundColor:'grey'}]}>
      </View>
      </View>
      <View style={{marginLeft:'3%',paddingVertical:'3%',justifyContent:'space-around'}}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text style={styles.message}>
          {message[0]}
        </Text>
      </View>
      {unReadMes>0&&<View style={{backgroundColor:'#ea3737', width:20,height:20,borderRadius:100,justifyContent:'center',alignItems:'center',alignSelf:'center',marginRight:10,marginLeft:'auto'}}>
        <Text style={[styles.name,{color:'white'}]}>{unReadMes}</Text>
      </View>}
    </View>
    </Pressable>
    </View>
  
  )
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatContainer:{
  
      backgroundColor: "white",
      elevation: 2,
      overflow: "hidden",
      padding: '1%',
      marginVertical:'1%',
      borderRadius: 8,
  },
  avatarImg:{
    width:avatarSize,
    height:avatarSize,
    borderRadius:100
  },
  message:{
    fontSize: 12,
    fontFamily: 'montserrat-italic'
  },

  innerTopContainer: {

    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,

  },
  input: {
    width: '90%',
    marginLeft: 5,
    fontFamily: 'montserrat-regular',
    color:'#9D9D9D'
  
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    flex: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },

  name: {
    fontSize: 16,
    fontFamily: 'montserrat-bold',
    
  },
  backIcon: {
    flex: 1,
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center'

  },
  onlineDot:{
    height:avatarSize/7,
    position:'absolute',
    width:avatarSize/7,
    backgroundColor:'green',
     borderRadius:300,marginLeft:avatarSize*0.75,
     marginTop:avatarSize*0.80

  }

})