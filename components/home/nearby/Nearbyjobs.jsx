import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native' //ActivityIndicator is a loading spinner from react native
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, isLoading, error } = useFetch(
    'search', { 
      // limit: 10, page: 1, sort: 'date_posted', order: 'desc' 
      query: 'React',
      num_pages: 1
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Nearby Jobs
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
          //get each individual job from the data array and return a NearbyJobCard component
          data?.map((job) => (
            <NearbyJobCard 
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default Nearbyjobs;