/**
 * Created by weimeng on 16/5/11.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import React, { Component } from 'react'
import {
  NativeModules,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert
} from 'react-native'

import {
  ButtonSubmit,
  grey,
  orange,
  TITLE_ERROR,
  TITLE_REGISTER_SUCCESS,
  MSG_REGISTER_SUCCESSS,
  MSG_BEGIN_SCAN_IDCARD,
  MSG_SCAN_IDCARD_SUCCESS,
  PagesConfig,
} from "common/index"


import {
  USER_REGISTER,
  GET_BANK_CARD_BY_USER_ID
} from 'service/contract/user'

import Toast from 'react-native-sk-toast'


import { connect } from "react-redux"

import { navTo, create_service, reset } from "actions/index"


const mockData = {
  name : '魏蒙',
  image : "base64asbadsfa,12323421123412lkasfdja;lofdj",
  id : '110105198812188117'
}
class OCRCardView extends Component{

  constructor(props){
    super(props)
    this.state = {
      data : null,
      //data : null,
      hint : MSG_BEGIN_SCAN_IDCARD,
      submitting : false
    }
    this._go= this._go.bind(this)
    this._run = this._run.bind(this)
    this._restart = this._restart.bind(this)
  }

  async _run(){
    try{
      const data = await NativeModules.OCRIDCard.show()
      this.setState({
        data : {
          name : data.name,
          id : data.id,
          image : data.image
        },
        hint : MSG_SCAN_IDCARD_SUCCESS
      })
    }
    catch(e) {
      Toast.center(e.message)
      /*Alert.alert(TITLE_ERROR, e.message)*/
    }
  }

  _restart(){
    this._run()
  }

  _go() {


    const {data} = this.state
    if(!data) {
      this._run()
    } else {

      const passProps = this.props.passProps
      const base64 = data.image ? data.image.split(',').pop() : null
      const requestParams = {
        ...passProps,
        real_name : data.name,
        id_number : data.id,
        idcard_front :base64
      }
      this.setState({
        submitting : true
      })

      const _s = this
      const promise = this.props.dispatch( create_service(USER_REGISTER, requestParams))
        .then(data => {

          Alert.alert(TITLE_REGISTER_SUCCESS, "注册成功，请前往登录", [
            {
              text : "确定",
              onPress : () => {
                _s.props.dispatch( reset(PagesConfig.Login) )
              }
            }
          ])


        })
        .catch( e => {
          this.setState({
            submitting : false
          })
        })
      /*
      Alert.alert(TITLE_REGISTER_SUCCESS, MSG_REGISTER_SUCCESSS, [{
        text : "OK",
        onPress : (() => {
          this.props.dispatch( navTo(PagesConfig.Login, {}, true) )
        }).bind(this)
      }])
      */
    }


  }


  render(){
    const { hint, data, submitting} = this.state

    const btnText = data ? "确认" : "开始扫描"
    return (
      <View>
        <View style={styles.hintContainer}>
          <Text style={styles.hint}>{hint}</Text>
        </View>

        {data &&

        <View style={styles.table}>

          <TextBlock left="姓名" right={data.name} />
          <TextBlock left="身份证号" right={data.id} />
          <View>
            <Image source={{uri : data.image}} />
          </View>
          <TouchableOpacity onPress={this._restart}>
            <View style={[styles.row, {justifyContent : 'flex-start'}]}>
              <Text style={styles.link}>点击此处重新扫描</Text>
            </View>
          </TouchableOpacity>

        </View>

        }

        <ButtonSubmit loading={submitting} style={styles.button} onPress={this._go} >{btnText}</ButtonSubmit>
      </View>
    )
  }
}

const TextBlock = ({left, right} ) => <View style={styles.row}>
  <View style={styles.left}>
    <Text>{left}</Text>
  </View>
  <View style={styles.right}>
    <Text>{right}</Text>
  </View>
</View>


const styles = StyleSheet.create({
  hintContainer : {
    padding : 20,
  },
  hint : {
    fontSize : 20,
    color : grey
  },
  link : {
    color : orange,
  },
  table : {
    backgroundColor : "white"  ,
    marginBottom : 20
  },
  row : {
    flexDirection : "row",
    paddingLeft : 20,
    paddingRight : 20,
    height : 30,
    alignItems : "center",
    justifyContent : "center"
  },
  left : {
    width : 80
  },
  right : {
    flex : 1
  },


})
const mapStateToProps = state => {
  return {
    passProps : state.navigator.current.passProps
  }
}

module.exports = connect(mapStateToProps)(OCRCardView)
