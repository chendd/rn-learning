/**
 * Created by weimeng on 16/4/6.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import React, {Component} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native"

import checked from '../img/checkbox-checked.png'
import notChecked from '../img/checkbox-not-checked.png'


import {
  grey,
  dark,
  getResponsiveSize
} from "common/index"


const textStyle = {
  fontSize: getResponsiveSize(12),
  color: dark
}

const smallTextStyle = {
  fontSize: getResponsiveSize(11),
  color:grey
}
export class CheckGroup extends Component {
  render() {
    const { value, options } = this.props
    const arr = []
    for(let key in options) { arr.push( { index : key, text : options[key] }) }
    const N = options.length
    return <View style={styles.CheckBoxGroupContainer}>
      {
        arr.map( ({index, text}, i) => {
          const source = index == value ? checked : notChecked
          return (
            <TouchableOpacity key={i}
                              onPress={ e => this.props.onChange(index) }
                              style={styles.CheckBoxItemContainer}>
              <View style={styles.CheckBoxElementContainer}>
                <Image source={ source } style={{ height: getResponsiveSize(13), width: getResponsiveSize(13) }}/>
                <Text style={ [styles.Text, textStyle] }>{text}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
  }
}


const styles = StyleSheet.create({

  Text : {
    marginLeft : 5
  },
  CheckBoxItemContainer : {
    flex : 1
  },
  CheckBoxElementContainer : {
    flexDirection: 'row',
    height : 40,
    alignItems : "center",
    justifyContent : "flex-start"
  },
  CheckBoxGroupContainer : {
    flexDirection:"row",
    height : 40,
    alignItems : 'center',
  },
})
