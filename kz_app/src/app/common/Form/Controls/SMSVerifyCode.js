/**
 * Created by weimeng on 16/5/9.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'


import {
  orange,
  grey,
  getResponsiveSize
} from "common/index"

const getText = (timeLeft, sending) => {
  return sending
    ? '正在发送...' : (timeLeft ? `已发送(${timeLeft})` : "获取验证码")
}

class SMSVerifyCode extends Component {
  constructor(props){
    super(props)
    this._getCode = this._getCode.bind(this)
    this._startTimer = this._startTimer.bind(this)
    this.state = {
      lock : false,
      timeLeft : 0,
      sending : false
    }
    this.I = null
  }

  _startTimer(){
    this.setState({
      timeLeft : this.props.timeLeft ||  60
    })

    this.I = setInterval( (() => {
      const { timeLeft } = this.state
      if(timeLeft > 1) {
        this.setState ({
          timeLeft : timeLeft-1
        })
      }
      else {
        this.setState({
          lock : false,
          timeLeft : 0
        })
        this._clearTimer()
      }
    }).bind(this), 1000)
  }

  _clearTimer(){
    if(this.I) {
      clearInterval(this.I)
    }
  }

  componentWillUnmount () {
    this._clearTimer()
  }

  focus(){
    this.input.focus()
  }

  _getCode(){
    const { lock } = this.state
    if( lock ) {
      return
    }


    const promise = this.props.getVerifyCode()
    if(!promise) {
      return
    }
    this.setState({
      sending : true,
      lock : true
    })
    promise.then( (data => {
      this.setState({
        sending : false
      })
      this._startTimer()
    }).bind(this))
  }


  render() {

    const {
      timeLeft,
      sending,
      lock
    } = this.state

    const { value, onChange } = this.props

    const text = getText(timeLeft, sending)
    const textStyle = {
      color : lock ? grey : orange
    }
    const TouchableX = lock ? TouchableWithoutFeedback : TouchableOpacity

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <TextInput
            ref={c => {this.input = c}}
            maxLength={6}
            underlineColorAndroid="rgba(255,255,255,0)"
            value={value}
            onChangeText={onChange}
            style={styles.input} />
        </View>
        <View style={styles.touchableContainer}>
          <TouchableX onPress={this._getCode}>
            <View>
              <Text style={[styles.text, textStyle]}>{text}</Text>
            </View>
          </TouchableX>
        </View>
      </View>

    )

  }
}


SMSVerifyCode.propTypes = {
  getVerifyCode : React.PropTypes.func
}



const styles = StyleSheet.create({
  container : {
    height : 40,
    alignItems : "center",
    justifyContent : "center",
    flexDirection : 'row'
  },
  textContainer : {
    flex : 1
  },
  touchableContainer : {
    marginRight : 20
  },
  input : {
    width : 100,
    height: 40,
    borderColor: '#eee',
    borderWidth: 0,
    paddingTop : 10,
    paddingBottom : 10,
    paddingLeft : 0,
    fontSize : getResponsiveSize(12),
    color : grey
  },
  text : {
    fontSize : getResponsiveSize(13)
  }
})

module.exports = SMSVerifyCode
