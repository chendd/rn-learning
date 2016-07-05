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
import meta from "./form/registerForm"

import {
  SEND_DYNAMIC_CHECK_CODE, USER_REGISTER, VERIFY_CHECK_CODE
} from "service/contract/user"

import checked from '../common/Form/img/checkbox-checked.png'
import notChecked from '../common/Form/img/checkbox-not-checked.png'



import {
  W,
  H,
  ButtonSubmit,
  Form,
  getResponsiveSize,
  grey,
  DONT_AGREE,
  TITLE_WARNING,
  submitHelper,
  PagesConfig,
  getFormValues
} from "common/index"

import {
  mobile
} from 'common/Form/default_validation_methods'
import { navTo, reset, create_service } from "actions/index"
import dismissKeyboard from 'dismissKeyboard'
import Toast from 'react-native-sk-toast'

class RegisterPanel extends Component {

  constructor(props){
    super(props)
    this._submit = this._submit.bind(this)
    this._showAgreement = this._showAgreement.bind(this)
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
      return this.props.dispatch(create_service(SEND_DYNAMIC_CHECK_CODE, {mobile_phone : formData.mobile_phone, biz_type : 'user_register'}))
    }

    // agreement status
    this.state = {
      agree : true
    }
  }
  _submit(){

    submitHelper.call(this, meta.name, data => {

      const agree = this.state.agree
      if(!agree) {
        Toast.center(DONT_AGREE)
        /*Alert.alert(TITLE_WARNING, DONT_AGREE)*/
        return
      }

      this.props.dispatch(create_service(VERIFY_CHECK_CODE,
        {mobile_phone : data.mobile_phone, biz_type : "user_register", check_code : data.check_code}))
        .then( d => {
          this.props.dispatch(navTo(PagesConfig.OCRCard, {...data}))
        })
        .catch( ex => {

        })



      /*
      this.props.dispatch(create_service(USER_REGISTER, data))
        .then ( (data => {
          this.props.dispatch(navTo(PagesConfig.OCRCard))
        }).bind(this))
      */
    })
  }
  _showAgreement(){
    Alert.alert(
      "注册协议",
      require("./data/Agreement"),
      [
        {
          text : "同意",
          onPress : (() => {
            this.setState({
              agree : true
            })
          }).bind(this)
        },
        {
          text : "不同意",
          onPress : (() => {

            this.setState({
              agree : false
            })
          }).bind(this)

        }
      ]
    )

  }
  _dismissKeyboard(){
    dismissKeyboard()
  }
  render(){
    const icon = this.state.agree ? checked : notChecked
    return (
      <TouchableWithoutFeedback onPress={ this._dismissKeyboard }>
        <View style={styles.container}>
          <View style={ styles.view }/>
          <Form meta={meta} />
          <View style={styles.submit}>
            <ButtonSubmit onPress={this._submit}>注册</ButtonSubmit>
          </View>
          <View>
            <TouchableOpacity onPress={this._showAgreement}>
              <View style={styles.agreementContainer}>
                <Image source={icon} style={ styles.imageSize }/>
                <Text style={styles.agreement}>注册协议</Text>
              </View>
            </TouchableOpacity>
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
  agreementContainer : {
    marginTop : 20,
    paddingLeft : 15,
    flexDirection : "row"
  },
  imageSize: {
    height: getResponsiveSize(15),
    width: getResponsiveSize(15)
  },
  agreement: {
    marginLeft :10,
    color: grey,
    fontSize: getResponsiveSize(13)
  }
})
module.exports = connect()(RegisterPanel)
