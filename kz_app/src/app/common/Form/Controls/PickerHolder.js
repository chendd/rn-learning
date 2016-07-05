/**
 *
 * Created by weimeng on 16/5/5.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {Component} from 'react'
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet
} from "react-native"

import MultiPicker from "./pickers/MultiPicker"
import {show_picker} from "../../../actions/poper"
import {connect} from 'react-redux'

import {
  grey,
  dark,
  getResponsiveSize
} from "common/index"


const textStyle = {
  fontSize: getResponsiveSize(12),
  color: dark
}

const smallTextStyle = {
  fontSize: getResponsiveSize(11),
  color:grey
}

import R from 'ramda'

class PickerHolder extends Component {

  constructor(props){
    super(props)
    this._change = this._change.bind(this)
    this._changeSingle = this._changeSingle.bind(this)
    this._press = this._press.bind(this)

    this.state = {
      text : props.value || "请选择"
    }
  }

  _change(selection ,textObj) {
    this.setState({
      text : R.values(textObj).join(' ') || '请选择'
    }, (() => {
      this.props.onChange(selection)
    }).bind(this))
  }

  _changeSingle(value, text) {

    this.setState({
      text : text 
    },  (() => {
      this.props.onChange(value)
    }).bind(this))
  }

  _press(){
    if(this.props.pickerType === MultiPicker.Types.Single) {
      this.props.dispatch(show_picker(this.props.pickerType, this.props.value, this._changeSingle, this.props.options))
    }
    else {
      this.props.dispatch(show_picker(this.props.pickerType, this.props.value, this._change, this.props.options))
    }
    this.props.onPop()
  }

  render(){

    const { text } = this.state

    const icon = require("../img/arrow-down-icon.png")
    return (
      <View>
        <TouchableOpacity onPress={this._press} style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {text}
            </Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={icon} style={styles.icon}  />
          </View>
        </TouchableOpacity>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    flexDirection : 'row',
    height : 30
  }  ,
  textContainer : {
    flex : 1
  },
  icon : {

  },
  text : {

    ...textStyle
  },
  imageContainer : {
    alignItems : 'flex-start',
    marginRight : 20
  }
})


module.exports = connect()(PickerHolder)
