/**
 *
 * Created by weimeng on 16/2/29.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {Component} from 'react'
import { View, Text, Switch as OSwitch, StyleSheet } from "react-native"

export class Switch extends Component {

  render(){
    const { label, password } = this.props
    return <View style={styles.InputContainer}>
      <Text style={styles.Label}>{ label }</Text>
      <OSwitch style={styles.Switch}></OSwitch>
    </View>
  }
}

const styles = StyleSheet.create({

  Label : {
    flex : 1
  },
  Switch : {
    flex : 3,
    height : 40
  },
  InputContainer : {
    flex : 3,
    alignItems : "center",
    flexDirection : "row",
    padding : 10
  }
})