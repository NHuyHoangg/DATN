import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import WatchList1 from "../../Components/watch/WatchList1";
import NotFoundFavourite from './NotFoundFavourite';
import { getFavoritePosts } from '../../utils/favourite';
import { favoritePostActions } from '../../redux/favorite/favoritePostSlice';
import LoadingOverlay from '../Overlay/LoadingOverlay';
import ErrorOverlay from '../Overlay/ErrorOverlay';

export default function PostFavourite({ route, navigation }) {
  const found = useSelector(state => state.favoritePost.found);
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [change, setChange] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const onRefreshing = () => {
    setRefreshing(true);
    setChange(!change);
  };

  useEffect(() => {
    async function getData() {
      setIsFetching(true);
      try {
        const favouritePost = await getFavoritePosts(token);
        dispatch(favoritePostActions.set(favouritePost));
        setError(null);
      }
      catch (error) {
        setError("Không thể tải thông tin");
      }
      finally {
        setRefreshing(false);
        setIsFetching(false);
      }
    }

    getData();
  }, [change])

  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.rootContainer}>
      {found ?
        <WatchList1 screenType="favoritePosts"
          onRefreshing={onRefreshing}
          refreshing={refreshing} /> :
        <NotFoundFavourite type="post" />}
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  }
})