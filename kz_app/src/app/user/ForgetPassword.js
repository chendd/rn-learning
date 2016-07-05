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
  Alert,
  Platform
} from 'react-native'

import { connect } from 'react-redux'
import meta from "./form/forgetPasswordForm"


import {
  SEND_DYNAMIC_CHECK_CODE,
  USER_REGISTER,
  USER_CHECK_PASSWORD,
  VERIFY_CHECK_CODE
} from "service/contract/user"

import {
  W,
  H,
  ButtonSubmit,
  LightText,
  Form,
  DONT_AGREE,
  TITLE_WARNING,
  submitHelper,
  getResponsiveSize,
  getFormValues,
  PagesConfig,
} from "common/index"

import { navTo, create_service } from "actions/index"

import dismissKeyboard from 'dismissKeyboard'
import Toast from 'react-native-sk-toast'

import {
  mobile
} from "common/Form/default_validation_methods"

class ForgetPassword extends Component {

  constructor(props){
    super(props)
    this._submit = this._submit.bind(this)
    this._dismissKeyboard = this._dismissKeyboard.bind(this)

    // Set the getVerifyCode method of <SMSVerifyCode />..
    // See. SMSVerifyCode
    meta.properties.check_code.getVerifyCode = () => {
      const formData = getFormValues(meta.name)
      if(!formData.mobile_phone){
        Toast.center('请填写手机号')
        return
      }
      if(!mobile.regexOrCallback.test(formData.mobile_phone)) {
        Toast.center("手机号格式错误")
        return
      }
      return this.props.dispatch(create_service(SEND_DYNAMIC_CHECK_CODE, {mobile_phone : formData.mobile_phone, biz_type : 'reset_password'}))
    }
  }
  _submit(){

    submitHelper.call(this, meta.name, data => {


      this.props.dispatch( create_service(VERIFY_CHECK_CODE, {mobile_phone : data.mobile_phone, check_code : data.check_code, biz_type : "reset_password"}))
        .then(d => {

          this.props.dispatch(navTo(PagesConfig.ForgetPasswordStep2, {data}))
        })
        .catch (e => {
          
        })

      /*
      this.props.dispatch(create_service(USER_CHECK_PASSWORD, data))
        .then ( (data => {
          this.props.dispatch(navTo(PagesConfig.ForgetPasswordStep2, {}))
        }).bind(this))
      */
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
            <ButtonSubmit onPress={this._submit}>下一步</ButtonSubmit>
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
    marginTop : 30
  },
})

module.exports = connect()(ForgetPassword)
