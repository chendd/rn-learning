/**
 *
 * ramroll on 16/7/10.
 */

import React, { Component } from 'react'

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import {
  BackButton,
  Title
} from 'common/index'
class Example2 extends Component{

  constructor(){
    super()
    this.state = {
      c : 0
    }
  }
  _press(){
    this.setState({
      c : this.state.c + 1
    })
  }
  render(){
    return(
      <View>
        <Text>This is example2~, counter is {this.state.c}</Text>
        <TouchableOpacity onPress={this._press.bind(this)}><Text>+</Text></TouchableOpacity>
      </View>
    )
  }
}



const __module = Example2

__module.TitleBar = {
  LeftButton : <BackButton />,
  Title : <Title>Example2</Title>

}
module.exports = __module
