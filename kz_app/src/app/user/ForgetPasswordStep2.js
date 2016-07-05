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
  Alert,
  TouchableWithoutFeedback,
  Platform
} from 'react-native'

import { connect } from 'react-redux'
import meta from "./form/forgetPasswordStep2Form"

import {
  SEND_DYNAMIC_CHECK_CODE, USER_REGISTER, RESET_PASSWORD
} from "service/contract/user"

import {
  W,
  H,
  ButtonSubmit,
  LightText,
  Form,
  DONT_AGREE,
  PASSWORD_NOT_EQUAL,
  TITLE_WARNING,
  submitHelper,
  getResponsiveSize,
  PagesConfig
} from "common/index"

import { navTo, create_service } from "actions/index"
import Toast from 'react-native-sk-toast'

import dismissKeyboard from 'dismissKeyboard'

class ForgetPasswordStep2 extends Component {

  constructor(props){
    super(props)
    this._submit = this._submit.bind(this)
    this._dismissKeyboard = this._dismissKeyboard.bind(this)
  }
  _submit(){

    submitHelper.call(this, meta.name, data => {
      const {passProps} = this.props
      if(data.password != data.confirm_password) {
        Toast.center(PASSWORD_NOT_EQUAL)
        /*Alert.AlertIOS(TITLE_WARNING, PASSWORD_NOT_EQUAL)*/
        return
      }
      this.props.dispatch(create_service(RESET_PASSWORD, {...passProps, new_password: data.password}))
        .then ( (data => {

          this.props.dispatch(navTo(PagesConfig.Login))
        }).bind(this))
    })
  }
  _dismissKeyboard(){
    dismissKeyboard()
  }
  render(){
    return (
      <TouchableWithoutFeedback onPress={ this._dismissKeyboard }>
        <View style={styles.container}>
          <View style={ styles.view }/>
          <Form meta={meta} />
          <View style={styles.submit}>
            <ButtonSubmit onPress={this._submit}>完成</ButtonSubmit>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  view: {
    height: 15
  },
  submit : {
    marginTop : 20
  },
})

const mapStateToProps = state => {
  return {
    passProps : state.navigator.current.passProps.data
  }
}

module.exports = connect(mapStateToProps)(ForgetPasswordStep2)
