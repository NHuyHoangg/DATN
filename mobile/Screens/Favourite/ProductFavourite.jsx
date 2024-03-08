import { StyleSheet, View } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import NotFoundFavourite from "./NotFoundFavourite";
import { getFavoriteProducts } from "../../utils/favourite";
import { favoriteProductActions } from "../../redux/favorite/favoriteProductSlice";
import LoadingOverlay from "../Overlay/LoadingOverlay";
import ErrorOverlay from "../Overlay/ErrorOverlay";
import { getFavoriteWatch } from "../../utils/watch";
import ProductList from "../../Components/watch/ProductList";
export default function ProductFavourite(props) {
  const token = useSelector((state) => state.auth.token);
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
    const getData = async () => {
      setIsFetching(true);
      try {
        const productData = await getFavoriteWatch(token);
        dispatch(favoriteProductActions.set(productData));
        setError(null);
      } catch (err) {
        console.log(err);
        setError("Không thể tải thông tin");
      }
      setRefreshing(false);
      setIsFetching(false);
    };
    getData();
  }, [change]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} reload={setChange} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <View style={styles.rootContainer}>
      <ProductList onRefreshing={onRefreshing} refreshing={refreshing} />
    </View>
  );
}

// export default function ProductFavourite({ route, navigation }) {
//   const found = useSelector(state => state.favoriteProduct.found);
//   const token = useSelector(state => state.auth.token);
//   const dispatch = useDispatch();

//   const [refreshing, setRefreshing] = useState(false);
//   const [change, setChange] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [error, setError] = useState();

//   const onRefreshing = () => {
//     setRefreshing(true);
//     setChange(!change);
//   };

//   useEffect(() => {
//     async function getData() {
//       setIsFetching(true);
//       try {
//         const favouriteProducts = await getFavoriteProducts(token);
//         dispatch(favoriteProductActions.set(favouriteProducts));
//         setError(null);
//       }
//       catch (error) {
//         console.log(error);
//         setError("Không thể tải thông tin");
//       }
//       finally {
//         setRefreshing(false);
//         setIsFetching(false);
//       }
//     }

//     getData();
//   }, [change])

//   if (error && !isFetching) {
//     return <ErrorOverlay message={error} reload={setChange} />;
//   }

//   if (isFetching) {
//     return <LoadingOverlay />
//   }

//   return (
//     <View style={styles.rootContainer}>
//       {found ?
//         <WatchList screenType="favoritePosts"
//           onRefreshing={onRefreshing}
//           refreshing={refreshing} /> :
//         <NotFoundFavourite type="post" />}
//     </View>
//   )
// }

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
