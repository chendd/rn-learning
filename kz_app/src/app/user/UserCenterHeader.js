/**
 * Created by weimeng on 16/5/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
 import React, {Component} from 'react'
 import {
   View,
   Text,
   Image,
   StyleSheet,
   Dimensions
 } from "react-native"
 import {
  W,
  getResponsiveSize,
  dark,
 } from "common/index"

const USER_INFO_BAR_HEIGHT = 115

export class UserCenterHeader extends Component {
  render() {
    return (
      <View style={styles.userInfoContainer}>
        <Image source={require("../tabs/img/uc-bg.jpg")} style={styles.bgImg} />

        <View style={styles.avatarWrapper} >
          <View style={styles.avatarContainer}>
            <Image source={this.props.avatar} style={styles.avatar} />
          </View>
        </View>

        <View style={styles.mobileContainer}>
          <Text style={styles.mobile}>{this.props.mobile}</Text>
        </View>

        <View style={styles.arrowContainer} >
          <Image source={require("../tabs/img/arrow-white-icon.png")} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  userInfoContainer : {
    width : W,
    flexDirection : 'row',
    height : USER_INFO_BAR_HEIGHT
  },
  bgImg : {
    width : W,
    height : USER_INFO_BAR_HEIGHT,
    position : 'absolute',
    left : 0,
    top : 0
  },
  avatarWrapper : {
    width : 60,
    height : USER_INFO_BAR_HEIGHT,
    marginLeft : 17,
    justifyContent: 'center'
  },
  avatarContainer : {
    width : 60,
    height : 60,
    borderRadius : 30,
    backgroundColor : "rgba(255,255,255, 0.2)",
    borderColor : "rgba(255,255,255,0.33)",
    borderWidth : 1,
  },
  avatar : {
    width : 48,
    height  : 48,
    borderRadius : 24,
    position : 'absolute',
    top : 5,
    left : 5,
    borderColor : 'rgba(255, 255, 255, 0.6)',
    borderWidth : 3
  },
  mobileContainer : {
    justifyContent : "center",
    flex : 1,
    paddingLeft : 10,
    backgroundColor : "rgba(255,255,255, 0)"
  },
  mobile : {
    color : 'white',
    fontSize : getResponsiveSize(15)
  },
  arrowContainer : {
    alignItems : 'center',
    justifyContent : "center",
    marginRight : 15
  }
})
