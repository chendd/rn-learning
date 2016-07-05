import React, {Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  orange,
  grey,
  getResponsiveSize,
  W,
  ProgressBar
} from 'common/index'

/// TODO 需要精简样式,套用太复杂了
export class BottomButton extends Component {
  render() {
    const { children, onPress, loading } = this.props

    return (

      <View style={[styles.Button,this.props.isTap&&styles.ButtonlightGrey]}>
        {
          loading ?
            <View style={styles.inner}>
              <ProgressBar/>
            </View>
            :
            <TouchableOpacity onPress={onPress} style={ styles.inner }  disabled={this.props.isTap}>
              <View style={ [styles.Button, this.props.isTap&&styles.ButtonlightGrey]}>
                <Text style={ styles.ButtonText }>{ children }</Text>
              </View>
            </TouchableOpacity>
        }
      </View>

    )
  }
}


const styles = StyleSheet.create({
  Button : {
    backgroundColor : orange ,
    height : 49,
    justifyContent : "center",
    alignItems : "center"
  },
  inner : {
    flex: 1,
    width : W,
    height : 49,
    justifyContent : "center",
    alignItems : "center"
  },
  ButtonText : {
    color : 'white',
    fontSize : getResponsiveSize(15)
  },
  ButtonlightGrey: {
    backgroundColor : grey
  }
})
