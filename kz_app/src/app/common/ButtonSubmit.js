import React, {Component} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  W,
  orange,
  getResponsiveSize,
  ProgressBar
} from 'common/index'

export class ButtonSubmit extends Component {
  render() {
    const { children, onPress, loading } = this.props

    return (
      <View style={styles.container}>
        {loading ?
          <View style={styles.Button}>
            <View style={styles.inner}>
              <ProgressBar/>
            </View>
          </View>
          :
          <TouchableOpacity onPress={onPress} style={ styles.Button }>
          <View style={styles.inner}>
            <Text style={styles.ButtonText }>{ children }</Text>
          </View>
        </TouchableOpacity>
        }

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    justifyContent : "center",
    alignItems : "center",
    width : W,
    borderRadius : 0
  },
  inner : {
    backgroundColor : orange ,
    overflow : 'hidden',
    borderRadius : 2,
    justifyContent : "center",
    alignItems : "center",
    height : 45,
    width : W - 30,
  },
  Button : {

  },
  ButtonText : {
    color : 'white',
    fontSize : getResponsiveSize(15)
  }
})
