/**
 * Created by weimeng on 16/4/25.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, { Component } from 'react'
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  Dimensions
} from "react-native"

import {
  W,
  H,
  getResponsiveSize
 } from "common/index"

const IMAGEW = getResponsiveSize(1080)
const IMAGEH = getResponsiveSize(1655)
export class KeHomePage extends Component{

  render(){


    return (
      <ScrollView
        style={ styles.page }>
        
        <Image source={require("./img/startpage.jpg")} style={styles.img} />
        
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#eefefc',
  },
  img : {
    backgroundColor: '#eefefc',
    height: (IMAGEH*W)/IMAGEW,
    width: W
  }
})
