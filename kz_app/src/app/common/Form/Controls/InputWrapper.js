/**
 * Created by weimeng on 16/3/11.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */



import React, {Component} from 'react'
import ReactNative, {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform
} from 'react-native'

import { CheckGroup } from "./CheckGroup"
import { INPUT_TYPES} from "../index"
import PickerHolder from "./PickerHolder"
import MultiPicker from "./pickers/MultiPicker"
import SMSVerifyCode from "./SMSVerifyCode"
import { hide_picker } from "../../../actions/poper"
import { connect } from 'react-redux'
import { OCRBankCardHolder } from "./OCRBankCardHolder"
import {ImageUploader} from "./ImageUploader"

import {
  grey,
  dark,
  getResponsiveSize
} from "common/index"

import Toast from 'react-native-sk-toast'

const textStyle = {
  fontSize: 13,
  color: dark
}

const smallTextStyle = {
  //fontSize: getResponsiveSize(13),
  fontSize: 13,
  color:grey
}


const {
  State : TextInputState
} = TextInput

const ROWHEIGHT = 50

const W = Dimensions.get("window").width
/**
 * Put input/label/hint/error-text into a layout
 */
class InputWrapper extends Component {

  constructor(){
    super()
    this.inputFocus = this.inputFocus.bind(this)
    this._change = this._change.bind(this)
    this._changeWithoutDissmissPicker = this._changeWithoutDissmissPicker.bind(this)

  }

  _change(value){
    this.props.dispatch(hide_picker())
    this.props.onChange(this.props.propName, value)
  }

  _touch(propName){
    
    return (() => {
      const node = this.refs[propName + '-input']
      if(node && node.focus) {
        node.focus()
      }
    }).bind(this)
  }



  _changeWithoutDissmissPicker(value){

    this.props.onChange(this.props.propName, value)
  }

  inputFocus( propName ){

    this.props.dispatch(hide_picker())
    //if(Platform.os === 'ios') {
    const {formName, getScrollView} = this.props
    if(!getScrollView) {
      return
    }
    const scrollView = getScrollView()
    setTimeout(() => {
      let scrollResponder = scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        ReactNative.findNodeHandle(this.refs[propName + "-input"]),
        110, //additionalOffset
        true
      );
    }, 50);

    //}
  }


  pickerPop( propName ) {
    TextInputState.blurTextInput(TextInputState.currentlyFocusedField())
  }


  renderInput({type, label, placeholder, options, getVerifyCode, editable}, {value}, propName){
    // console.log('value', value)
    const onChange = this.props.onChange
    switch(type) {
      case INPUT_TYPES.TextInput :
        return <TextInput
          ref={propName + "-input"}
          onChangeText={ this._change }
          onFocus={this.inputFocus.bind(this, propName)}
          underlineColorAndroid="rgba(255,255,255,0)"
          placeholder={placeholder}
          value={value}
          editable={editable}
          style={[styles.TextInput, smallTextStyle]} />
      case INPUT_TYPES.TextArea :
        return (
          <View style={styles.TextAreaWrapper}>
            <TextInput
              ref={propName + "-input"}
              onChangeText={ this._change }
              onFocus={this.inputFocus.bind(this, propName)}
              underlineColorAndroid="rgba(255,255,255,0)"
              placeholder={placeholder}
              value={value}
              multiline={true}
              editable={editable}
              style={[styles.TextArea, smallTextStyle, {height : 70 , width : W - 50}]} />
          </View>
        )
      case INPUT_TYPES.Password:
        return <TextInput
          ref={propName + "-input"}
          onChangeText={ this._change }
          onFocus={this.inputFocus.bind(this, propName)}
          underlineColorAndroid="rgba(255,255,255,0)"
          placeholder={placeholder}
          secureTextEntry={true}
          value={value}
          style={[styles.TextInput, smallTextStyle]} />

      case INPUT_TYPES.NumTextInput:
        return <TextInput
          ref={propName + "-input"}
          onChangeText={ this._change }
          onFocus={this.inputFocus.bind(this, propName)}
          underlineColorAndroid="rgba(255,255,255,0)"
          placeholder={placeholder}
          keyboardType="numbers-and-punctuation"
          value={value}
          style={[styles.TextInput, smallTextStyle]} />
      case INPUT_TYPES.PhoneInput:
        return <TextInput
          ref={propName + "-input"}
          onChangeText={ this._change }
          onFocus={this.inputFocus.bind(this, propName)}
          underlineColorAndroid="rgba(255,255,255,0)"
          placeholder={placeholder}
          keyboardType="phone-pad"
          value={value}
          style={[styles.TextInput, smallTextStyle]} />
      case INPUT_TYPES.CheckGroup:
        return <CheckGroup
          onChange={ this._change }
          value={value}
          options={options}
        />
      case INPUT_TYPES.RegionPicker:
        return <PickerHolder
          onChange={this._changeWithoutDissmissPicker }
          onPop={this.pickerPop.bind(this)}
          value={value}
          pickerType={MultiPicker.Types.RegionPicker}
        />
      case INPUT_TYPES.Picker :
        return <PickerHolder
          onChange={this._changeWithoutDissmissPicker}
          onPop={this.pickerPop.bind(this)}
          value={value}
          options={options}
          pickerType={MultiPicker.Types.Single}
        />
      case INPUT_TYPES.SMSVerifyCode :
        return <SMSVerifyCode
          ref={propName + "-input"}
          onChange={this._change}
          value={value}
          getVerifyCode={getVerifyCode}
        />

      case INPUT_TYPES.OCRBankCardHolder :
        return <OCRBankCardHolder
          onChange={this._changeWithoutDissmissPicker}
          value={value}

        />
      case INPUT_TYPES.Image :
        return <ImageUploader
          onChange={this._changeWithoutDissmissPicker}
          value={value}
          label={label}
        />
      default :
        return null

    }
    return null
  }

  _shouldShowErrorMessage(meta, data){
    if(meta.alertError) {
      return false
    }
    return !!data.errorMessage
  }
  render(){
    const { meta, data, propName } = this.props
    // console.log(data)
    const {label} = meta
    return (
      <View>
        <View style={styles.GroupContainer}>
          <TouchableWithoutFeedback onPress={this._touch(propName)}>
            {
              meta.type === INPUT_TYPES.OCRBankCardHolder || meta.type === INPUT_TYPES.Image || meta.type === INPUT_TYPES.TextArea ?
                <View style={styles.Container}>

                  { this.renderInput(meta, data, propName) }
                </View>
                :

                <View style={styles.Container}>
                  <View style={styles.Left}>
                    <Text style={styles.LeftText}>{ label }</Text>
                  </View>
                  <View style={styles.Right}>

                    { this.renderInput(meta, data, propName) }
                  </View>


                </View>
            }
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  GroupContainer : {
    borderBottomColor : "#eee",
  },
  Container : {
    flexDirection : "row",
    alignItems : 'center',
    paddingLeft : 15
  },
  TextInput : {
    flex : 3,
    height: ROWHEIGHT,
    borderColor: '#eee',
    borderWidth: 0,
    paddingTop : 10,
    paddingBottom : 10,
    paddingLeft : 10,

  },
  TextAreaWrapper : {
    borderWidth : 1,
    borderColor : "#eee",
    padding : 10,
    marginRight : 15 
  },
  TextArea : {
    flex : 1,
  },
  Left : {
    alignSelf : 'flex-end',
    width : 80,
    paddingRight : 10,
    height : ROWHEIGHT,
    justifyContent : 'center',
    alignItems: 'flex-end'
  },
  LeftText : {
    ...textStyle,
  },
  Right : {
    flex : 1,
    marginRight : 20
  },
  Label : {
    flex : 1
  },
  errorPositionHolder : {
    flex : 2,
  },
  errorMessage : {
    ...textStyle,
    color : 'red' ,
    flex : 7,
    marginTop : 4

  },
  errorContainer : {
    position : 'absolute',
    top : 0,
    left : 0 ,
    height : ROWHEIGHT,
    justifyContent : 'center',
    backgroundColor : 'rgba(0,0,0,0)'
  }

})


export default connect()(InputWrapper)
