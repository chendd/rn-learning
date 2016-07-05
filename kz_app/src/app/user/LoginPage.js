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
  TouchableWithoutFeedback,
  Platform,
  NativeModules
} from 'react-native'


import { connect } from 'react-redux'


import {navTo, navBack, switchTab} from "actions/index"
import LoginPanel from "./LoginPanel"
//import Pages from "common/PagesConfig"
import dismissKeyboard from 'dismissKeyboard'

import {
  W,
  H,
  getResponsiveSize,
  PagesConfig as Pages
} from "common/index"

class LoginPage extends Component{

  constructor(){
    super()
    this._register = this._register.bind(this)
    this._back = this._back.bind(this)
    this._dismissKeyboard = this._dismissKeyboard.bind(this)
  }
  _back () {
    const { route } = this.props
    
    this.props.dispatch(navBack())
  }
  _register(){
    this.props.dispatch(navTo(Pages.Register))
  }
  _dismissKeyboard() {
    dismissKeyboard();
  }

  render(){
    return (
      <TouchableWithoutFeedback onPress={ this._dismissKeyboard }>
        <View style={styles.page}>

          <Image source={require("./images/login-bg.png")} style={styles.bg} resizeMode="cover" />

          {/* 头部 */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this._back}>
                <View style={ styles.imageSize }>
                  <Image source={require("./images/back-icon.png")}          />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>登录</Text>
            </View>
            <TouchableOpacity style={styles.registerContainer} onPress={this._register}>
              <Text style={styles.register}>注册</Text>
            </TouchableOpacity>
          </View>

          <LoginPanel />
        </View>
      </TouchableWithoutFeedback>
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
    height: 40,
    alignItems : "flex-end",
    justifyContent: 'center',
    marginRight : 15
  },
  register: {
    color : 'white',
    fontSize : getResponsiveSize(15)
  },
  imageSize: {
    height: 40,
    width: 40,
    justifyContent: 'center',
  }


})

const mapStateToProps = (state) => {
  return {
    route : state.navigator.current.name,
    passProps : state.navigator.current.passProps
  }
}

module.exports = connect(mapStateToProps)(LoginPage)
