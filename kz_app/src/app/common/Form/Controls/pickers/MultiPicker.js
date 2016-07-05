
import React, {Component} from 'react'
import {
  Picker,
} from 'react-native'
import RegionPicker from "./RegionPicker"
import SinglePicker from "./SinglePicker"

export default MultiPicker = React.createClass({
  render() {
    const { type, onChange, value, options } = this.props
    if( type === MultiPicker.Types.RegionPicker ){
      return (
        <RegionPicker onChange={onChange} value={value} />
      )
    }
    
    else if(type === MultiPicker.Types.Single) {
      return (
        <SinglePicker onChange={onChange} value={value} options={options} />
      )   
    }
    return null
  }

})

MultiPicker.Types = {
  RegionPicker : "RegionPicker",
  Single : "Single"
}