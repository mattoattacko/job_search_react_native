import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native' //ActivityIndicator is a loading spinner from react native
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
  const router = useRouter();

  // const isLoading = false;
  // const error = false;
  // we can remove the dummy data above and use the useFetch hook to get the data from the API
  const { data, isLoading, error } = useFetch(
    'search', { 
      // limit: 10, page: 1, sort: 'date_posted', order: 'desc' 
      query: 'React',
      num_pages: 1,
  })

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item?.job_id}`);
    setSelectedJob(item.job_id)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Popular Jobs
        </Text>

        {/* Button */}
        <TouchableOpacity>
          <Text style={styles.headerBtn}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Jobs */}
      <View style={styles.cardsContainer}>
        {isLoading ? ( //if isLoading is true, show the ActivityIndicator
          <ActivityIndicator 
            size='large' 
            colors={COLORS.primary} 
          />
        ) : error ? (
          <Text>
            Something went wrong
          </Text>
        ) : (
          <FlatList 
            data={data}
            renderItem={({ item }) => ( //item is the data from the array
              <PopularJobCard 
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            //key Extractor is a function that returns a unique key for each item in the array
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs