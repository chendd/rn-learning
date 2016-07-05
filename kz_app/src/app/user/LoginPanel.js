/**
 * Created by weimeng on 16/5/9.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import React, {Component} from 'react'
import meta from "./form/loginForm"
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native'


import { connect } from 'react-redux'

import {
  W,
  H,
  getResponsiveSize,
  PagesConfig,
  form_connector,
  hasValidationError,
  getFormValues,
  validate
} from "common/index"

import {
  USER_LOGIN
} from "service/contract/user"

import {navTo, navBack, create_service, reset, navBackRefreshPrevious} from "actions/index"

import Toast from 'react-native-sk-toast'

const MARGINTOPVIEW = H <= 480 ? 47 : 10

class LoginPanel extends Component{
  constructor(props){
    super(props)
    this._forget = this._forget.bind(this)
    this._submit = this._submit.bind(this)
    this.state = {
      loading : false,
    }
    this.loginPromise = null
  }


  componentDidMount(){

    //const promise = this.props.dispatch(create_service(USER_LOGIN, {mobile_phone : "18610330551", "password" : "123456"}))


  }


  _submit(){
    // 表单验证
    validate(meta.name)

    // 有错报错
    for(let key in this.props.form.data) {
      const item = this.props.form.data[key]
      if(!item.valid) {
        Toast.center(item.errorMessage);
        return
      }
    }

    // 没有错误获得表单值
    const data = getFormValues(meta.name)

    const {isPop, firstp2p} = this.props
    // 提交请求
    this.loginPromise = this.props.dispatch(create_service(USER_LOGIN, data))

    // loading效果
    this.setState({
      loading : true
    })


    this.loginPromise
      .then( data => {
        this.setState( {
          loading : false
        })
        if(isPop){
          this.props.dispatch(navBackRefreshPrevious())
          //this.props.dispatch(navTo(PagesConfig.ApplyContract, {}, true))
        } else {
          this.props.dispatch(navTo(PagesConfig.Home, {}, true))
        }

      })
      .catch(e => {
        this.setState( {
          loading : false
        })
      })

  }

  componentWillUnmount() {
    if(this.loginPromise){
      this.loginPromise.cancel()
    }
  }
  _forget(){
    this.props.dispatch(navTo(PagesConfig.ForgetPassword))
  }

  render(){
    const { loading } =  this.state
    return (
      <View>
          {/* 信分期三个大字 */}
          <View style={styles.xinContainer}>
            <Image source={require("./images/xin.png")} />
          </View>

          {/* 表单 */}
          <FormGroup icon={require("./images/phone-icon.png")}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="请输入手机号"
                style={styles.formInput}
                placeholderTextColor="white"
                keyboardType="phone-pad"
                underlineColorAndroid="rgba(255,255,255,0)"
                onChangeText={this.props._change('mobile_phone')}
              />
            </View>
          </FormGroup>

          <FormGroup icon={require("./images/lock-icon.png")}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="请输入登录密码"
                underlineColorAndroid="rgba(255,255,255,0)"
                placeholderTextColor="white"
                secureTextEntry={true}
                style={styles.formInput}
                onChangeText={this.props._change('password')}
              />
            </View>
          </FormGroup>


        {/* 登录按钮 */}
        <View style={styles.buttonPannel}>
          {
            loading ?
              <View style={styles.btn}>
                <Text style={styles.btnColor}>登录...</Text>
              </View>
              :
              <TouchableOpacity onPress={this._submit}>
                <View style={styles.btn}>
                  <Text style={styles.btnColor}>登　录</Text>
                </View>

              </TouchableOpacity>

          }
        </View>


        {/*  忘记密码 */}
        <View style={styles.forgetPanel}>
          <TouchableOpacity onPress={this._forget}>
            <View>
              <Text style={styles.forgot}>忘记密码?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const FormGroup = ({icon, children}) => <View style={styles.group}>

  <View style={styles.groupLeft}>
    <Image source={icon} style={styles.formIcon} />
  </View>

  <View style={styles.groupRight}>
    {children}
  </View>
</View>

const styles = StyleSheet.create({
  formContainer: {
  },
  inputWrapper : {
    marginLeft : 20,
    width : W * 0.7,
    borderBottomColor : "white",
    borderBottomWidth : 1,
    alignItems : "center"
  },
  formInput: {
    width : W * 0.7,
    height : 50,
    fontSize : getResponsiveSize(14),
    color : 'white'
  },
  buttonPannel: {
    marginTop : 50
  },
  btn: {
    borderWidth : 1,
    borderColor : 'white',
    alignItems : 'center',
    justifyContent : "center",
    height : 40
  },
  btnColor : {
    color : 'white',
    fontSize: getResponsiveSize(14)
  },
  forgetPanel: {
    height: 50,
    marginTop :18
  },
  forgot : {
    textAlign: 'center',
    color : "white",
    fontSize : getResponsiveSize(12)
  },
  group: {
    flexDirection : "row" ,
    alignItems : "center",
    justifyContent : "center",
    marginBottom : 10

  },
  groupLeft: {
  },
  formIcon: {
  },
  groupRight: {
  },
  xinContainer: {
    marginTop : 74-MARGINTOPVIEW,
    marginBottom: 70-MARGINTOPVIEW,
    alignItems : 'center',
  },
})

module.exports = connect()(form_connector(LoginPanel, meta))
