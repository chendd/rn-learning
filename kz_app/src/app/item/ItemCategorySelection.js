/**
 *
 * Created by weimeng on 16/6/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native'


const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;


import {
  W,
  H,
  h2,
  PagesConfig
} from 'common/index'

import {StepBar} from "./StepBar"
import {connect} from 'react-redux'

import {navTo} from "actions/index"

class _ItemCategorySelection extends Component {
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _select(item){
    
    this.props.dispatch(navTo(PagesConfig.Input))
  }
  render(){

    return (
      <View style={styles.container}>

        <StepBar step={1} />
        <View style={styles.inner}>
          <View style={styles.title}>
            <Text style={h2}>丢丢 请告诉我您捡到了什么?</Text>
          </View>
          <View >
            <Select
              width={W * 0.8}
              ref="SELECT1"
              optionListRef={this._getOptionList.bind(this)}
              defaultValue="点击此处选择失物类别 ..."
              onSelect={this._select.bind(this)}>
              <Option>身份证</Option>
              <Option>银行卡</Option>
              <Option>护照</Option>
              <Option>驾驶证</Option>
              <Option>其他物品</Option>
            </Select>

            <OptionList containerHeight={H * 0.4} ref="OPTIONLIST"/>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : 'white',
    width : W,
  },
  inner : {
    flex : 1,
    width : W,
    alignItems : 'center',
  },
  title : {
    marginBottom : 20,  
    marginTop : 40 
  }
})

export let ItemCategorySelection = connect()(_ItemCategorySelection)