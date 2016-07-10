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

import {setValue, getValue} from "./lib/counter"
import {on, remove} from './lib/event'
class Example5 extends Component{

  render(){
    return(
      <View>
        <Example1 />
        <Example1 />
      </View>
    )
  }
}

class __Example1 extends Component{
  

  _press(){
    setValue(getValue() + 1)
  }

  render(){
    return(
      <View>
        <Text>This is example1~, counter is {this.props.data}</Text>
        <TouchableOpacity onPress={this._press}><Text>+</Text></TouchableOpacity>
      </View>
    )
  }
}

let Example1 = connector('counter-changed', __Example1)


const connector = (name, __Component) => {
  
  class SimpleEventConnector extends Component{
    
    constructor(){
      super()
      
      this.state = {
        data
      }
      
      this.__handler = ((data) => {
        this.setState({
          data 
        })
      }).bind(this)
    }
    componentDidMount(){
      on(name, this.__handler)
    }
    
    componentWillUnmout(){
      
      remove(name, this.__handler)
      
    }
    render(){
      return <__Component data={data} />  
    }  
  }
  
  return SimpleEventConnector
} 




const __module = Example5

__module.TitleBar = {
  LeftButton : <BackButton />,
  Title : <Title>Example5</Title>

}
module.exports = __module
