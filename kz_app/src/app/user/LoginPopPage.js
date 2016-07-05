/**
 * Created by weimeng on 16/5/9.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform
} from 'react-native'


import { connect } from 'react-redux'


import {navTo, navBack, switchTab, reset} from "actions/index"
import LoginPanel from "./LoginPanel"
//import Pages from "common/PagesConfig"

import {
  W,
  H,
  getResponsiveSize,
  PagesConfig as Pages
} from "common/index"

class LoginPopPage extends Component{

  constructor(){
    super()
    this._register = this._register.bind(this)
    this._back = this._back.bind(this)
  }
  _back () {
    const { route } = this.props
    //if(this.props.passProps && this.props.passProps.from === 'uc') {
    this.props.dispatch( switchTab('purchase') )    
    //}
    this.props.dispatch(reset(Pages.Home))
  }
  _register(){
    this.props.dispatch(navTo(Pages.Register))
  }
  render(){
    return (
      <View style={styles.page}>

        <Image source={require("./images/login-bg.png")} style={styles.bg} resizeMode="cover" />

        {/* 头部 */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={this._back}>
              <Image source={require("./images/back-icon.png")} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>登录</Text>
          </View>
          <TouchableOpacity style={styles.registerContainer} onPress={this._register}>
            <Text style={styles.register}>注册</Text>
          </TouchableOpacity>
        </View>

        <LoginPanel isPop={true} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  page: {
    alignItems : "center",
    backgroundColor :'rgba(0,0,0,0)',
    flex : 1
  },
  bg: {
    position : 'absolute',
    width : W,
    height : H,
  },
  header: {
    flexDirection : "row",
    marginTop :Platform.OS === 'ios' ? 20 : 0,
    width : W,
    height : 44,
    justifyContent : "center",
    alignItems : "center"
  },
  titleContainer: {
    flex : 1,
    alignItems : 'center'
  },

  title: {
    color : "white",
    fontSize : getResponsiveSize(15)
  },
  iconContainer : {
    width : 40,
    marginLeft : 15
  },
  registerContainer: {
    width : 40,
    alignItems : "flex-end",
    marginRight : 15
  },
  register: {
    color : 'white',
    fontSize : getResponsiveSize(15)
  },


})

const mapStateToProps = (state) => {
  return {
    route : state.navigator.current.name,
    passProps : state.navigator.current.passProps

  }
}

module.exports = connect(mapStateToProps)(LoginPopPage)