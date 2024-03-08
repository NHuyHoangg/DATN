import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Main from './Navigation/Main';
import { NavigationContainer } from '@react-navigation/native';
import LoadingOverlay from './Screens/Overlay/LoadingOverlay';
import AuthStack from './Navigation/AuthStack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/index.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnBoarding from './Navigation/OnBoardingStack';

import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationInstrumentation()

// Sentry.init({
//   dsn: 'https://828114a74ac8562df455266a0dfbf590@o4505639953170432.ingest.sentry.io/4505639953301504',

//   integrations: [new Sentry.ReactNativeTracing({
//     tracePropagationTargets: ['localhost', /^https:\/\//],
//     routingInstrumentation,
//   })],
//   tracesSampleRate: 1,
// });

const Stack = createNativeStackNavigator()

// SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
    'montserrat-thin-italic': require('./assets/fonts/Montserrat-ThinItalic.ttf'),
    'montserrat-black': require('./assets/fonts/Montserrat-Black.ttf'),
    'montserrat-semi-bold': require('./assets/fonts/Montserrat-SemiBold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <StatusBar backgroundColor="white" height={35} style="dark" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(false)
  const navigation = useRef()

  useEffect(() => {
    checkFirstLoad()
  }, [])
  async function checkFirstLoad() {
    setIsLoading(true)
    const RunState = await AsyncStorage.getItem("CtimeFirstLoad");
    if (!RunState)
      setIsFirstLoad(true)
    await AsyncStorage.setItem("CtimeFirstLoad", 'false')
    setIsLoading(false)
  }

  if (isLoading) {
    return null
  }


  return (
    <NavigationContainer
      ref={navigation}
      onReady={() => {
        //routingInstrumentation.registerNavigationContainer(navigation);
      }}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      
      >
        {isFirstLoad && <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
        />}

        <Stack.Screen
          name="Authenticate"
          component={AuthStack}
        />
        <Stack.Screen
          name="Main"
          component={Main}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

//export default Sentry.wrap(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
