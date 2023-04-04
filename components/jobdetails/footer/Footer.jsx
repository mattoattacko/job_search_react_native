import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'

const Footer = ({ url }) => {
  return (
    <View style={styles.container}>

      {/* Like Button: Currently Not Working. Outside of MVP scope */}
      <TouchableOpacity style={styles.likeBtn}>
        <Image 
          source={icons.heartOutline}
          resizeMode='contain'
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      {/* Apply Button */}
      <TouchableOpacity 
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>
          Apply Now
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Footer