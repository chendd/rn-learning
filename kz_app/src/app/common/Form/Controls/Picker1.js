/**
 *
 * Created by weimeng on 16/2/29.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from "react-native"
import OPicker from 'react-native-picker'
export class Picker extends Component {

  _onPressHandle() {
    this.picker.toggle();
  }
  render(){
    const { label, password } = this.props
    return <View style={consts.InputContainer}>
      <Text style={styles.Label}>{ label }</Text>
      <TouchableOpacity
        style={[styles.Picker]} onPress={this._onPressHandle.bind(this)}>
        <Text>点我</Text>
      </TouchableOpacity>
      <OPicker
        pickerTitle="选择123"
        pickerBtnText="确定"
        pickerCancelBtnText="取消"
        ref={picker => this.picker = picker}
        style={{height : 200, backgroundColor : "white" }}
        showDuration={300}
        showMask={true}
        pickerData={[1,2,3]}
        selectedValue = {1}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  InputContainer : {
    flex : 3,
    alignItems : "center",
    flexDirection : "row",
    padding : 10
  },
  Picker : {
    flex : 3,
    height : 40,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius : 5,
    padding : 10
  },
})