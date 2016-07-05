/**
 *
 * Created by weimeng on 16/5/9.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {Component} from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native'



import { connect } from 'react-redux'
import {navTo} from "../actions/navigator"

import {
  orange,
  getResponsiveSize,
} from "common/index"


class _Link extends Component{

  constructor(props){
    super(props)
    this._press = this._press.bind(this)
  }
  _press() {
    const {route, dispatch, passProps, replace} = this.props
    dispatch(navTo(route, passProps, replace || false))
  }

  render() {
    const {children} = this.props

    return(
      <View>
        <TouchableOpacity onPress={this._press}>
          <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

_Link.propTypes = {
  route : function(props, propName, componentName) {
    if(!props[propName]) {
      return new Error("Failed propType : Link : prop 'route' is required.")
    }
    const route = props[propName]

    if(!route['name'] || !route['Component']) {
      return new Error("Failed propType : Link : prop 'route' must have children props 'name' and 'Component'.")
    }

  }
}


const styles = StyleSheet.create({
  text : {
    color : orange,
    fontSize: getResponsiveSize(14),
  }
})

export let Link = connect()(_Link)
