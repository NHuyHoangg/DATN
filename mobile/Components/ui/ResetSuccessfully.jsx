import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import Button from './Button'

export default function ResetSuccessfully({email,onPress}) {
  return (
    <View style={styles.container}>
      <Image style={{width:50,height:55, marginTop:'30%',alignSelf:'center'}} source={require("../../assets/images/ctime.png")} >
      </Image>
      <Text style={styles.status}>Thành công!</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Mật khẩu mới của bạn đã được gửi tới địa chỉ:</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.content}>Vui lòng đăng nhập để tiếp tục</Text>
        <Button   rippleColor="#afafaf"
          marX="10%"
          marY="2%"
          color="#697184"
          borR={1}
          onPress={onPress}
          >Đăng nhập</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
      
    
    },
    status:{
        fontSize:16,
        fontFamily:'montserrat-bold',
        marginVertical:'2%',
        alignSelf:'center',
    },
    contentContainer:{
        borderWidth:1,
        borderColor:'#cdcdcd',
        marginVertical:'2%',
        marginHorizontal:'10%',
        padding:'5%',
        
    },
    title:{
        fontSize:20,
        fontFamily:'montserrat-medium',
        color:'grey',
        textAlign:'left',
        marginVertical:'1%',
    },
    email:{
        fontSize:16,
        fontFamily:'montserrat-medium',
        color:'#000000',
        alignSelf:'center',
        marginVertical:'2%',
        textDecorationLine:'underline',
    },
    content:{
        marginVertical:'2%',
        fontSize:14,
        fontFamily:'montserrat-medium',
        color:'grey',
        alignSelf:'center',
    }

})