/**
 * Created by yyt on 16/5/25.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform
} from 'react-native'
import { navBack } from "actions/index"

import {
  W,
  H,
  grey,
  lightGrey,
  getResponsiveSize,
  PagesConfig as Pages
} from "common/index"

import AboutUs from "./data/AboutUs"

class AboutUsPage extends Component {
  render(){
    return (
      <View style={ styles.page }>
        <View style={ styles.textView }>
          <Image
            source={ require('./images/aboutUs_logo.png') }
            resizeMode= { Image.resizeMode.contain }
          />
          <Text style={ styles.textFont }>
            {AboutUs}
          </Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: lightGrey,
  },
  textView: {
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  textFont: {
    lineHeight : 26,
    fontSize:getResponsiveSize(14),
    color: grey
  }
})

module.exports = AboutUsPage
