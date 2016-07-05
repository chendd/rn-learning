/**
 * Created by yyt on 16/5/11.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 * 已购买物品的cell
 */
import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Platform
} from 'react-native'

import { connect } from 'react-redux'

import {
  W,
  H,
  dark,
  orange,
  getResponsiveSize,
  PagesConfig as Pages
} from "common/index"

import R from 'ramda'
const ITEM_HEIGHT = 95
export default class PurchasedGoodsItem extends Component {

  componentDidMount(){

  }
  render(){
    let { thumb, product_name, attr_value, status } = this.props.product
    const attr_str = R.values(attr_value).join(" ")
    console.log(thumb);
    return (
      <TouchableWithoutFeedback
          onPress={()=> this.props.onClick && this.props.onClick()}
      >
      <View style={styles.page}>
        <View style={styles.viewOne}>
          <Image
            source={{uri:thumb}}
            style={styles.img}
            resizeMode= {Image.resizeMode.contain}/>
        </View>
        <View style={styles.viewTwo}>
          <Text
            numberOfLines = {2}
            style={[styles.viewgreyFont, styles.viewTwoTextH, this.props.isTwelve && styles.textFontTwelve ]}>{product_name}</Text>
          <Text style={[styles.viewgreyFont, this.props.isTwelve && styles.textFontTwelve]}>{attr_str}</Text>
        </View>
        <View style={styles.viewThree}>
          <Text
            numberOfLines = {1}
            style={[ styles.viewyellowFont, this.props.isTwelve && styles.textFontTwelve ]}>{status}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>

    )
  }
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: ITEM_HEIGHT,
    width: W
  },
  viewOne: {
    backgroundColor: 'white',
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: 50,
    height: ITEM_HEIGHT- 20,
  },
  viewTwo: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 4.3,
    justifyContent: 'center'
  },
  viewgreyFont: {
    fontSize: getResponsiveSize(13),
    color: dark
  },
  viewTwoTextH: {
    marginBottom: 8
  },
  viewThree: {
    flex: 1.6,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  viewyellowFont: {
    fontSize: getResponsiveSize(13),
    color: orange,
    textAlign: 'left'
  },
  textFontTwelve: {
    fontSize: getResponsiveSize(13)
  }
})
