/**
 * Created by yyt on 16/5/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 *
 */

import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'

import { connect } from 'react-redux'

import {
  grey,
  Form,
  PagesConfig,
  MSG_BIND_CARD_BEFORE,
  BottomButton,
  submitHelper,
  DONT_AGREE,
  getFormValues,
  ProgressView,
  getResponsiveSize,
  W,
  removeForm
} from "common/index"
import meta from "./form/bindCardForm"

import checked from '../common/Form/img/checkbox-checked.png'

import notChecked from '../common/Form/img/checkbox-not-checked.png'

import {GET_BANK_CARD_BY_USER_ID} from "service/contract/user"

import {
  create_service
} from 'actions/index'


import {
  SEND_DYNAMIC_CHECK_CODE,
  BIND_BANK_CARD
} from 'service/contract/user'

import {
  navTo,
  reset,
  navBack,
  switchTab
} from "actions/index"

import Toast from 'react-native-sk-toast'

import {
  mobile
} from "common/Form/default_validation_methods"

class BankInfoPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      fetching : true,
      hint : MSG_BIND_CARD_BEFORE,
      agree : true,
      loading : false,
      initialFormData : { card_holder : props.real_name }
    }

    this.submitPromise = null
    meta.properties.check_code.getVerifyCode = () => {
      const formData = getFormValues(meta.name)
      if(!formData.mobile_phone){
        Toast.center('请填写手机号')
        /*Alert.alert('请填写手机号')*/
        return
      }
      if(!mobile.regexOrCallback.test(formData.mobile_phone)) {
        Toast.center("手机号格式错误")
        return
      }
      return this.props.dispatch(create_service(SEND_DYNAMIC_CHECK_CODE, {mobile_phone : formData.mobile_phone, biz_type : 'band_card'}))
    }

    this._done = this._done.bind(this)
    this._showAgreement = this._showAgreement.bind(this)

  }

  getScrollView(){
    return this.refs[meta.name]
  }


  _done () {

    const {next} = this.props.passProps || {}
    const _s = this


    submitHelper.call(this, meta.name, data => {

      const agree = this.state.agree

      if(!agree) {
        Toast.center(DONT_AGREE)
        /*Alert.alert(TITLE_WARNING, DONT_AGREE)*/
        return
      }

      if(!data.card) {
        Toast.center("请扫描银行卡")
        /*Alert.alert(TITLE_WARNING, "请扫描银行卡")*/
        return
      }

      //this.props.dispatch(navBack())

      this.setState({
        loading : true
      })
      this.submitPromise = this.props.dispatch(create_service(BIND_BANK_CARD, {
        check_code : data.check_code,
        mobile_phone : data.mobile_phone,
        card_holder : data.card_holder,
        card_number : data.card.number,
        card_img : data.card.image.split(",").pop()
      }))
      this.submitPromise
        .then ( (data => {

          this.setState({
            loading : false
          })

          if(next){
            _s.props.dispatch(navTo(PagesConfig.FaceRecognition))
          } else {
            Toast.center("绑卡成功")
            _s.props.dispatch(reset(PagesConfig.Home))
          }



        }).bind(this))
      this.submitPromise
        .catch( e=>{
          console.log("---g8")
          this.setState({
            loading : false
          })
        })
    })

  }

  _showAgreement(){
    Alert.alert(
      "代扣电子授权协议",
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

  componentDidMount(){
    let load_bank_info = false
    if(this.props.passProps) {
      const {from} = this.props.passProps
      load_bank_info = true
      const promise = this.props.dispatch( create_service(GET_BANK_CARD_BY_USER_ID))
      promise.then( data => {
          console.log("card", data)
          //if(from === 'uc') {
          if (data && data.card_number) {

            meta.properties.card_holder.hidden = true
            meta.properties.card.hidden = true
            meta.properties.mobile_phone.hidden = true
            meta.properties.check_code.hidden = true

            meta.properties.card_number_for_display.hidden = false
            meta.properties.bank_name_for_display.hidden = false

            this.setState({
              fetching: false,
              hint: "如需更换绑定银行卡，请将本人名下的新卡号、新卡绑定的手机号邮件至xinfenqi@ucfgroup.com。",
              initialFormData: {
                card_number_for_display: data.card_number,
                bank_name_for_display: data.bank_name
              }
            })

          } else {
            this.setState({
              fetching: false
            })
          }
          //}
        })
        .catch( e=> {
          this.setState({
            fetching : false
          })
        })

    }

    if(!load_bank_info) {
      this.setState({
        fetching : false
      })
    }
  }

  componentWillUnmount(){
    removeForm(meta.name)
    if(this.submitPromise){
      this.submitPromise.cancel()
    }
  }

  render(){
    const { hint, agree, loading, fetching, initialFormData } = this.state
    const icon = agree ? checked : notChecked

    if(fetching) {
      return <View style={{flex : 1}}>
        <ProgressView />
      </View>
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={{flex : 1}}
          ref={meta.name}
          horizontal={false}
          keyboardDismissMode={Platform.OS === 'android' ? 'interactive' : 'interactive'}
          keyboardShouldPersistTaps={false}
        >
          <View style={ styles.view }/>
          <Form meta={ meta} data={initialFormData}/>
          {
            !initialFormData.card_number_for_display ?
              <View style={styles.agreementWrapper}>
                <TouchableOpacity onPress={this._showAgreement}>
                  <View style={styles.agreementContainer}>
                    <Image source={icon} style={ styles.imageSize }/>
                    <Text style={[styles.agreement ]}>代扣电子授权协议</Text>
                  </View>
                </TouchableOpacity>
              </View>
              : null
          }
          <View style={styles.textContainer}>
            <Text style={styles.textInfo} >{hint}</Text>
          </View>

        </ScrollView>
        {

          !initialFormData.card_number_for_display ?
            <BottomButton onPress={this._done} loading={loading}>完成</BottomButton>
            :null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  view: {
    height: 15,
  },
  textContainer : {
    width : W,
    paddingLeft : 20,
    paddingRight : 20,
    marginTop : 20
  },
  hintTitle : {
    color : grey,
    marginBottom: 5,
    fontSize : getResponsiveSize(11)
  },
  textInfo: {
    color: grey,
    fontSize: getResponsiveSize(11),
    lineHeight : 20
  },
  agreementWrapper : {
    height : 50,
    overflow : 'hidden'
  },
  agreementContainer : {
    paddingLeft : 15,
    flexDirection : "row",
    backgroundColor : 'white',
    height : 50,
    alignItems : 'center'
  },
  agreement: {
    marginLeft :10,
    color : grey,
    fontSize: getResponsiveSize(13)
  },
  imageSize: {
    height: getResponsiveSize(15),
    width: getResponsiveSize(15)
  }
})

const mapStateToProps = (state) => {
  return {
    passProps : state.navigator.current.passProps,
    real_name : state.user.real_name
  }
}
module.exports = connect(mapStateToProps)(BankInfoPage)
