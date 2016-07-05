/**
 * Created by yyt on 16/5/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 * 进度详情的cell
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

import {
  W,
  H,
  orange,
  dark,
  lightGrey,
  getResponsiveSize,
  PagesConfig as Pages
} from "common/index"

import { connect } from 'react-redux'

import moment from 'moment'
const ITEM_HEIGHT = 90

import icon from '../tabs/img/arrow-white-icon.png'
export default class ProgressItem extends Component {
  twoInt(num) {
    const ss = Number(num)
    let str = ss.toString()
    if (str.length == 1) {
      return "0"+str
    }
    return str
  }
  render(){
    const { status, date, action } = this.props
    return (
      <View style= {styles.page}>
        <View style= {styles.viewOne}>
          <View style= {styles.numView}>
            <Text style= {styles.numText}>{ this.twoInt(this.props.num) }</Text>
          </View>
          <LineView isHeader= {this.props.isHeader} isBottom= {this.props.isBottom}/>
        </View>

        <View style= {styles.viewTwo}>
          <View>
            <Text style= {styles.time}>{moment(date).format("YYYY年MM月DD日")}</Text>
          </View>
          <View style= {styles.viewTwoTextView}>
              <Text style= {styles.stateText}>{status}</Text>

            {

              action &&
              <View style={styles.actionWrapper}>
                <TouchableOpacity onPress={action.onPress}>
                  <View style={styles.actionInner}>
                    <Image source={icon} />
                  </View>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      </View>
    )
  }
}

class LineView extends Component {

  render(){
  console.log(this.props.isHeader);
    return (
      <View style= {styles.lineView}>
      {this.props.isHeader === true?
       <View style={styles.lineHidden}/> : <View style={styles.lineHeader}/>}
        <Image
          source= {this.props.isBottom? require('./images/circle_1.png') : require('./images/circle_2.png')}
          style= {styles.circle}
        />
        <View style={[styles.lineBottom, this.props.isBottom && styles.lineHidden]} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  page: {
    width: W,
    flexDirection: 'row',
    backgroundColor: lightGrey,
    height: ITEM_HEIGHT,
  },
  viewOne: {
    backgroundColor: lightGrey,
    flex: 1,
    flexDirection: 'row'
  },
  numView: {
    flex: 1.4,
    alignItems: 'flex-end',
  },
  numText: {
    marginTop: 12,
    fontSize: getResponsiveSize(18),
    color: dark
  },
  ////////////lineView////////////////
  lineView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  lineHeader: {
    width: 1,
    backgroundColor: orange,
    height: 21,
  },
  lineHidden: {
    width: 0,
    height: 21,
    backgroundColor: 'transparent'
  },
  circle: {
    width: 13,
    height: 13,
  },
  lineBottom: {
    width: 1,
    backgroundColor: orange,
    height: ITEM_HEIGHT - 21
  },
  ///////viewTwo///////////////////////
  viewTwo: {
    flexDirection: 'column',
    flex: 3,
    justifyContent: 'space-between'
  },
  time: {
    marginTop: 18,
    fontSize: getResponsiveSize(12),
    color: dark,
    marginBottom: 10,
  },
  viewTwoTextView: {
    backgroundColor: '#d0ebe8',
    borderRadius: 3,
    justifyContent: 'center',
    height: 40,
    marginRight: 35
  },
  stateText: {
    marginLeft: 15,
    fontSize: getResponsiveSize(14),
    color: dark
  },
  actionWrapper : {
    position : 'absolute',
    width : 40,
    height : 40,
    right : 0,
    top : 0
  },
  actionInner : {
    height : 40,
    justifyContent : 'center',
    alignItems : "center"

  }


})
