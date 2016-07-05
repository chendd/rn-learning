/**
 * Created by weimeng on 16/5/4.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {Component} from 'react'
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Text
} from 'react-native'


import {
  W, H, borderColor 
} from 'common/index'
import { hide_poper } from "../actions/poper"


import { connect } from 'react-redux'

import MultiPicker from "../common/Form/Controls/pickers/MultiPicker"


const PanelHeight = 30


class _PickerPop extends Component{

  constructor(props){
    super(props)

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
    this._hide = this._hide.bind(this)
    this._change = this._change.bind(this)
    this.state = {
      top : new Animated.Value(H),
      value : props.initialValue
    }
  }


  shouldComponentUpdate(nextPorops){
    // Use a animation frame to calculate component height
    const old = {...this.props}
    requestAnimationFrame( (() => {
      if(old.picker.show !== nextPorops.picker.show) {
        if(!this.refs.view) {
          return
        }
        this.refs.view.refs.node.measure ( ((ox, oy, width, height, px, py) => {
          if(nextPorops.picker.show) { // begin to show
            this.state.top.setValue(H)
            requestAnimationFrame( (() => {
              Animated.timing(
                this.state.top,
                {
                  toValue : H - height - (Platform.OS === 'ios' ? 0 : 30),
                }
              ).start()
            }).bind(this))
          } else {
            this.state.top.setValue(H)
            requestAnimationFrame( (() => {
              Animated.timing(
                this.state.top,
                {
                  toValue : H,
                }
              ).start()
            }).bind(this))
          }
        }).bind(this))

      }
    }).bind(this))

    return true
  }

  _hide(){
    this.props.dispatch(hide_poper())
  }

  _change(selection, textObj){

    this.props.picker.onChange(selection, textObj)
    this.setState({
      value : selection,
      textObj : textObj
    })
  }

  render(){

    const {  pickerType, options } = this.props.picker
    const {value} = this.state
    
    return (
      <Animated.View style={[styles.container, {top : this.state.top}]} ref="view">
        <View style={styles.poper}>
          {
            <MultiPicker type={pickerType} onChange={this._change} value={value} options={options} />
          }
          <View style={styles.panel}>
            <TouchableOpacity onPress={this._hide} style={styles.done}>
              <Text>完成</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    )

  }

}


const styles = StyleSheet.create({
  container : {
    position : 'absolute',
    backgroundColor : 'white',
    width : W
  },

  poper: {
  },

  panel : {
    height : PanelHeight,
  },

  done : {
    width : W,
    alignItems : 'center',
    justifyContent : "center"
  }
})


const mapStateToProps = ( state ) => {
  return {
    picker : state.poper.picker
  }
}
export let PickerPop = connect(mapStateToProps)(_PickerPop)