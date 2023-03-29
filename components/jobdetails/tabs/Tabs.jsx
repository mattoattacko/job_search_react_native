import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'

import styles from './tabs.style'
import { SIZES } from '../../../constants'

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)} //we pass in the name and active tab to see which one is active
    onPress={onHandleSearchType} //when we press the button, we call the function that sets the active tab
  >
    <Text style={styles.btnText(name, activeTab)}>
      {name}
    </Text>
  </TouchableOpacity>
)

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={tabs}
        renderItem={({ item }) => (
          <TabButton 
            name={item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item)} //set the active tab, meaning we are searching for this specific thing
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item} //item is the name of the tab
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
      />
    </View>
  )
}

export default Tabs