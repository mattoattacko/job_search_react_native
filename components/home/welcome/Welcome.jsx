import React, { useState } from 'react';
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants';

const jobTypes = ['Full-Time', 'Part-Time', 'Contractor', 'Internship']

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-Time')

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>
          Hello Matthew
        </Text>        
        <Text style={styles.welcomeMessage}>
          Find your perfect job
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value=''
            onChange={() => {}}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity 
          style={styles.searchBtn}
          onPress={() => {}}
        >
          <Image 
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      {/* Jobs */}
      <View style={styles.tabsContainer}>
        <FlatList 
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              // we can switch b/t activeJobTypes
              onPress={() => {
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
            >
              <Text
                style={styles.tabText(activeJobType, item)}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item} //unique key for each item in the list
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome