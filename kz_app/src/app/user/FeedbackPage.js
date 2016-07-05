/**
 * Created by yyt on 16/5/11.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  InteractionManager
} from 'react-native'
import { connect } from 'react-redux'
import { navBack } from "actions/index"

import {
  W,
  H,
  borderColor,
  ButtonSubmit,
  BottomButton,
  getResponsiveSize,
  PagesConfig as Pages
} from "common/index"

import dismissKeyboard from 'dismissKeyboard'

import {
  USER_CONSULT_OR_COMPLAINT
} from "service/contract/user"

import Toast from 'react-native-sk-toast'

import { create_service } from 'actions/index'

class FeedbackPage extends Component {

  constructor(props){
    super(props)
    this._dismissKeyboard = this._dismissKeyboard.bind(this)
    this._submit = this._submit.bind(this)
    this.feedbackPromise = null
    this.state = {
      content : "",
      loading: false
    }
  }
  _dismissKeyboard() {
    dismissKeyboard();
  }
  _submit() {

    if (this.state.content.length > 0) {
      this.setState({
        loading: true
      })
      const { user_id }= this.props.user
      const data = {user_id:user_id, content:this.state.content}
      this.feedbackPromise = this.props.dispatch(create_service(USER_CONSULT_OR_COMPLAINT,data))

      this.feedbackPromise
        .then( data => {
          if (data.status == '0') {
            Toast.center('提交成功')
            this.setState({
              loading: false
            })
          }
        })
        .catch(e => {
        })
    }else{
      Toast.center('请输入内容')
    }


  }
  componentWillUnmount() {
    if(this.feedbackPromise){
      this.feedbackPromise.cancel()
    }
  }
  didChangeText(text){
    this.setState({content:text})
  }
  render(){
    return (
      <TouchableWithoutFeedback onPress={ this._dismissKeyboard }>
        <View style={styles.page}>
          <FeedbackTextInput didChangeText={this.didChangeText.bind(this)}/>
          <BottomButton onPress={this._submit} loading={this.state.loading}>提交</BottomButton>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

class FeedbackTextInput extends Component {
  render(){
    return (
      <View style={styles.textInputView}>

        <View style={ styles.textInputViewChild }>
          <TextInput
            style={styles.textInput}
            onChangeText={this.props.didChangeText}
            multiline = {true}
            underlineColorAndroid="rgba(255,255,255,0)"
          />
        </View>

        <Text style={styles.textInputViewText}>
          您的咨询或意见，我们会尽快处理，谢谢！
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
  },
  textInputView: {
    top: 30,
    marginHorizontal: 30,
  },
  textInputViewChild: {
    height: 130,
    width: W - 60,
    borderColor: borderColor,
    borderColor: borderColor,
    borderWidth: 1
  },
  textInput: {
    height: 120,
    width: W - 70,
    marginLeft: 5,
    marginTop: 5,
    textAlignVertical: "top",
    fontSize: getResponsiveSize(14)
  },
  textInputViewText: {
    marginTop: 35,
    alignSelf: 'center',
    fontSize: getResponsiveSize(12)
  }
})

const mapStateToProps = (state) => {
  return {
    route : state.navigator.current.name,
    user : state.user

  }
}

module.exports = connect(mapStateToProps)(FeedbackPage)
