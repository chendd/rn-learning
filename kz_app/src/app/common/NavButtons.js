/**
 *
 * Created by weimeng on 16/5/18.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {
  Component
} from 'react'

import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'


export const NavButton = ({ children, onPress }) => <TouchableOpacity onPress={onPress}>
  <View style={styles.leftBtn}>
    {children}
  </View>
</TouchableOpacity>


const styles = StyleSheet.create({
  leftBtn : {
    width : 60,
    height : 40,
    alignItems : 'center',
    justifyContent : "center"

  }
})

