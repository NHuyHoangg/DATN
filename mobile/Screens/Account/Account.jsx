import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { getUser } from '../../utils/user';
import LoadingOverlay from '../Overlay/LoadingOverlay';
import OptionView from './Component/OptionView';
import LockOverlay from '../Overlay/LockOverlay';
import ErrorOverlay from '../Overlay/ErrorOverlay';
import { getLocation } from '../../utils/location';
import Ionicons from "@expo/vector-icons/Ionicons";
import color from '../../constants/color';

export default function Account({ route, navigation }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);

  const isize = 25;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);

  const [data, setData] = useState({});


  useEffect(() => {
    async function fetchData() {

      setIsLoading(true);
      try {
        const res = await getUser(token);

        if (!res.first_name) res.first_name = '';
        if (!res.last_name) res.last_name = '';

        const dataFetch = { ...res };

        setData(dataFetch);
        setError(null);
      } catch (error) {
        setError("Không thể tải thông tin")

      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) fetchData();
  }, [change])

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (!isAuthenticated) {
    return <LockOverlay />
  }

  if (isLoading)
    return <LoadingOverlay />

  let customName = "Người dùng";
  if (data.first_name && data.last_name)
    customName = data.first_name + " " + data.last_name;

  return (
    <View style={styles.mainContainer}>
      {/****Ảnh đại diện và tên *****/}
      <View style={styles.infoViewStyle}>
        {data.avatar ? <Image
          source={{ uri: data.avatar }}
          style={styles.imageStyle}/>
          : <Ionicons name="person-circle-outline" size={100} color={color.baemin1} />
        }
        
        <View>
          <Text style={styles.name}>{customName.length < 14 ? customName : customName.slice(0, 14) + "..."}</Text>
          <Text style={styles.contactInfo}>{data.email}</Text>
        </View>
      </View>
      <OptionView type="info" isize={isize} color={color.baemin1} data={data} setData={setData} />
      <OptionView type="buy-history" isize={isize} color={color.baemin1} />
      <OptionView type="sell-history" isize={isize} color={color.baemin1} />
      <OptionView type="auction" isize={isize} color={color.baemin1} />
      <OptionView type="balance" isize={isize} color={color.baemin1} />
      <OptionView type="review" isize={isize} color={color.baemin1} />
      <OptionView type="language" isize={isize} color={color.baemin1} />
      <OptionView type="support" isize={isize} color={color.baemin1} />
      <OptionView type="logout" isize={isize} color={color.baemin1} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  infoViewStyle: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: '25%',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: '4%',
    borderTopWidth: 2,
    borderTopColor: '#E1E1E1',
    borderBottomWidth: 2,
    borderBottomColor: '#E1E1E1',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    //textAlign: 'center',
    marginBottom: '6%',
    marginHorizontal: '10%',
    fontFamily: "montserrat-semi-bold",
    fontSize: 17,
  },
  contactInfo: {
    //textAlign: 'center',
    marginHorizontal: '10%',
    fontFamily: "montserrat-light",
    fontSize: 14,
  },
})