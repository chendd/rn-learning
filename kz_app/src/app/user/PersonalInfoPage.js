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
  InteractionManager
} from 'react-native'

import { connect } from 'react-redux'

import {
  W,
  H,
  ButtonSubmit,
  Form,
  grey,
  getResponsiveSize,
  PagesConfig,
  ProgressView,
  removeForm
} from "common/index"
import meta from "./form/personalInfoForm"

import {GET_USER_REAL_INFO} from "service/contract/user"
import { create_service } from 'actions/index'

class PersonalInfoPage extends Component {

  constructor(props){
    super(props)
    this.state = {initialData : null}
    this.aPromise = null

  }
  componentDidMount() {

    InteractionManager.runAfterInteractions(() => {
      this.aPromise = this.props.dispatch(create_service(GET_USER_REAL_INFO))
      .then( data => {
        this.setState({
          initialData : {
            userName  : data.real_name,
            userIdentityCard : data.id_number
          }
        })
        //meta.properties.userName.defaultValue = data.real_name;
        //meta.properties.userIdentityCard.defaultValue = data.id_number;
        //this.setState({ create:true })
      })
      .catch(e => {
      })
    })

  }
  componentWillUnmount() {
    removeForm(meta.name)
    if(this.aPromise) {
      this.aPromise.cancel()
    }
  }
  render(){
    const { initialData } = this.state
    if (initialData) {
      return (
        <View style={styles.container}>
          <View style={ styles.view }/>
            <View>
              <Form meta={ meta }  data={initialData} />
               
              <View style={styles.textContainer}>
                <Text style={styles.textInfo}>姓名、身份证号一经实名不可修改。</Text>
              </View>
            </View>
        </View>
      )
    }else{
      return (
        <View style={[styles.container,{justifyContent:'center'}]}>
          <ProgressView />
        </View>
      )
    }

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
  textInfo: {
    color : grey,
    fontSize : getResponsiveSize(13)
  },
})

module.exports = connect()(PersonalInfoPage)
