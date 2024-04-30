import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import WatchList1 from "../../Components/watch/WatchList1";
import EmptyOrder from '../Overlay/EmptyOrder';
import LoadingOverlay from '../Overlay/LoadingOverlay';
import ErrorOverlay from '../Overlay/ErrorOverlay';

export default function OrderDelivering({ route, navigation }) {
  const found = useSelector(state => state.favoritePost.found);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [change, setChange] = useState(false);
  // const [isFetching, setIsFetching] = useState(true);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  const onRefreshing = () => {
    setRefreshing(true);
    setChange(!change);
  };

  // useEffect(() => {
  //   async function getData() {
  //     setIsFetching(true);
  //     try {
  //       const favouritePost = await getFavoritePosts(token);
  //       dispatch(favoritePostActions.set(favouritePost));
  //       setError(null);
  //     }
  //     catch (error) {
  //       setError("Không thể tải thông tin");
  //     }
  //     finally {
  //       setRefreshing(false);
  //       setIsFetching(false);
  //     }
  //   }

  //   getData();
  // }, [change])

  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.rootContainer}>
      {/* {found ? */}
        <WatchList1 
          screenType="delivering"
          onRefreshing={onRefreshing}
          refreshing={refreshing} /> 
        {/* : <EmptyOrder />} */}
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  }
})