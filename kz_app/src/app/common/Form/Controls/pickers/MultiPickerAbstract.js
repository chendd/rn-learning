/**
 * Created by weimeng on 16/4/27.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {Component} from 'react'
import {
  Picker,
  StyleSheet,
  View
} from 'react-native'


import R from 'ramda'

import { W } from 'common/index'




/**
 *
 * The core of multi-picker is a state change from current to next.
 * Any class extend multi-picker must implement two method : next(), normalize()
 *
 *
 * function getInitalData() returns the intial data of picker
 * f getInitialData => () => (data)
 *
 * data is unstructured to MultiPicker and after normalize, data becomes a key-value list:
 * e.g.
 * {
 *     k1 : [...],
 *     k2 : [...]
 * }
 *
 *
 * function next() is a map from next selection to next state.
 * f next => ( selection ) -> ({selection, data})
 *
 *
 * when there is a network request to fetch data , f next returns a promise
 * f next => ( selection ) -> Promise -> ({selection, data})
 *
 * function normalize is a map from data[key] to normalized data to render
 * f normalize => ( object ) -> [{label, value}]
 *
 *
 */
export default MultiPickerAbstract = React.createClass ({
  getInitialState(){
    const _s = this
    try{
      const initialData = this.getInitialData()
      if(_s.props.onChange){
        setTimeout( () => {
          _s.props.onChange(initialData.selection, _s.getText(initialData.selection))
        }, 0)
      }
      return initialData.data
    }catch(e) {
      throw 'error happends in getInitalData: ' + e
    }
  },


  getText(selection){
    const obj = {}
    const _n = this.normalize
    for(let key in this.state) {
      const list = _n(this.state[key])

      const h = R.head(R.filter( item => {
        return item.value === selection[key]
      }, list))

      if(!h) {
        obj[key] = null
      } else {
        obj[key] = h.label
      }
    }
    return obj
  },

  combineState(preState, nextState){
    const { data, selection } = nextState
    let nState = {}
    if( data === null ) {
      nState.data = preState.data
    }
    nState.selection = selection
    return nState
  },

  valueChange (key){
    const _s = this
    return (itemValue, itemPosition) => {
      const nextSelection = {..._s.props.value}
      console.log("valuechanged", nextSelection)
      nextSelection[key] = itemValue

      const nextState = this.next( nextSelection )
      if(nextState !== false) {
        _s.setState(nextState.data, () => {
          if(_s.props.onChange){
            _s.props.onChange(nextState.selection, this.getText(nextState.selection))
          }
        })
      }

    }
  },

  renderItems( data, selection ){
    selection = selection || {}
    const keys = R.keys(data)
    const N = keys.length // How many pickers
    const _n = this.normalize
    return keys.map( key => {
      const list = _n( data[key] )
      return <View key={key}>
        <Picker
          style={styles.pickContainer}
          onValueChange={this.valueChange(key)}
          selectedValue={selection[key]}>
          {list.map( (kv, i) => {
            return <Picker.Item key={i} label={kv.label} value={kv.value} />
          })}
        </Picker>
      </View>
    })
  },

  render(){

    const { value } = this.props

    return (
      <View style={styles.container}>
        {this.renderItems(this.state, value)}
      </View>
    )
  },
})


const styles = StyleSheet.create({
  container : {
    flex : 1,
    flexDirection : 'row',
    justifyContent: 'center'
  },
  pickContainer : {
    width : 100,
  }
})
