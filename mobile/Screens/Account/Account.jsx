import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { getUser } from '../../utils/user';
import LoadingOverlay from '../Overlay/LoadingOverlay';
import OptionView from './Component/OptionView';
import LockOverlay from '../Overlay/LockOverlay';
import ErrorOverlay from '../Overlay/ErrorOverlay';
import { getLocation } from '../../utils/location';


export default function Account({ route, navigation }) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);
  const isSeller = useSelector(state => state.user.isSeller)

  const isize = 40;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(true);

  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {

      setIsLoading(true);
      try {
        const res = await getUser(token);

        if (!res.name) res.name = 'Customer';
        if (!res.lastName) res.lastName = '';
        if (!res.province) res.province = 0;
        if (!res.district) res.district = 0;
        if (!res.ward) res.ward = 0;
        if (!res.address) res.address = '';

        const dataFetch = { ...res };

        const { provinces, districts, wards } = await getLocation();
        dataFetch.provinces = provinces;
        dataFetch.districts = districts;
        dataFetch.wards = wards;

        setData(dataFetch);
        setError(null);
      } catch (error) {
        //setError(error.message)
        setError("Không thể tải thông tin")
        // if (error && error.message) {
        //   Alert.alert(error.message);
        // }
      } finally {

        setIsLoading(false);
      }
    }

    if (isAuthenticated) fetchData();
  }, [change, isSeller])

  if (error && !isLoading) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (!isAuthenticated) {
    return <LockOverlay />
  }

  if (isLoading)
    return <LoadingOverlay />

  const customName = data.name + " " + data.lastName;

  return (
    <View style={styles.mainContainer}>
      {/****Ảnh đại diện và tên *****/}
      <View style={styles.infoViewStyle}>
        <Image
          source={{ uri: data.image }}
          style={styles.imageStyle}
        />
        <View>
          <Text style={styles.name}>{customName.length < 14 ? customName : customName.slice(0, 14) + "..."}</Text>
          <Text style={styles.contactInfo}>{data.email}</Text>
        </View>
      </View>
      <OptionView type="shopping-history" isize={isize} color='#697184' />
      <OptionView type="info" isize={isize} color='#697184' data={data} setData={setData} />
      <OptionView type="support" isize={isize} color='#697184' />
      <OptionView type="logout" isize={isize} color='#697184' />
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
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    //textAlign: 'center',
    marginBottom: '6%',
    marginHorizontal: '10%',
    fontFamily: "montserrat-semi-bold",
    fontSize: 20,
  },
  contactInfo: {
    //textAlign: 'center',
    marginHorizontal: '10%',
    fontFamily: "montserrat-light",
    fontSize: 15,
  },
})