import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
  return (
    <View style={styles.btnContainer}>
      <View style={{ width: 20, height: 50, backgroundColor: 'transparent' }} />
      <TouchableOpacity
        style={styles.btn}
        onPress={handlePress}
      >
        <Image
          source={iconUrl}
          resizeMode='cover'
          style={styles.btnImg(dimension)}
        />
      </TouchableOpacity>
      <View style={{ width: 20, height: 50, backgroundColor: 'transparent' }} />
    </View>
  )
}

export default ScreenHeaderBtn