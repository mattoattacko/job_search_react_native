import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font'; //need this to use custom fonts
import * as SplashScreen from 'expo-splash-screen'; //need this to hide the splash screen

SplashScreen.preventAutoHideAsync(); //when app is initially loading, this makes the splash screen visible

const Layout = () => {

  // ~~~ Load Fonts ~~~ //
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
  });

  // we only want to show our home screen when the fonts are loaded
  //useCallback is a hook that returns a memoized callback that only changes if one of the dependencies has changed
  const onLayoutRootView = useCallback(async () => { 
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); //hide the splash screen
    }
  }, [fontsLoaded]);

  if(!fontsLoaded) { //if fonts are not loaded, return null 
    return null;
  }

  //if the fonts have loaded
  return <Stack onLayout={onLayoutRootView} />;
}

export default Layout;