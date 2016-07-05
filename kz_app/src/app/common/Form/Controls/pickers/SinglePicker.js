/**
 * Created by weimeng on 16/5/6.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import React, {Component} from 'react'
import ReactNative, {Platform} from 'react-native'

import PickerAndroid from 'react-native-picker-android'
let Picker = (Platform.OS === 'ios' ) ? ReactNative.PickerIOS : PickerAndroid


import R from 'ramda'

export default class SinglePicker extends Component {

  constructor(props) {
    super(props)  
    this._change = this._change.bind(this)
  }
  
  componentDidMount(){
    if(!this.props.value) {

      const opt = this.props.options[0]
      this._change(opt.value) 
    }
  }
  
  _change(value){
    const options = this.props.options
    
    let text = value
    if(options[0] && typeof options[0] === 'object') {
      const item = R.head(R.filter(s => s.value === value, options))
      text = item.label
    }
    this.props.onChange(value, text)  
  }
  
  render(){
    const { options, value } = this.props
    return <Picker
      selectedValue = {value}
      onValueChange={this._change}
      mode="dropdown"
    >
      {options.map( (opt, i) => {
        let label = null, value = null
        if(typeof opt === 'object') {
          label = opt.label
          value = opt.value
        } else {
          label = opt
          value = opt
        }
        return <Picker.Item label={label} value={value} key={i} />
      })}
      </Picker>
  }
}