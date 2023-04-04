import { useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, SIZES, icons, images } from '../constants';
import {
  Nearbyjobs,
  Popularjobs, 
  ScreenHeaderBtn,
  Welcome,
} from '../components';

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SafeAreaView
      style={{
        flex: 2,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen 
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn 
              iconUrl={icons.menu}
              dimension='60%'
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn 
              iconUrl={images.profile}
              dimension='100%'
            />
          ),
          headerTitle: "" //empty string to remove the word 'title'
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              // if searchTerm is not empty, navigate to search screen
              if(searchTerm) { 
                router.push(`/search/${searchTerm}`)
              }
            }}
          />

          <Popularjobs />

          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;