/**
 * Created by weimeng on 16/5/4.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import React, {Component} from 'react'
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native'


import { W, H, borderColor } from "common/index"
import { hide_poper } from "../actions/poper"


import { connect } from 'react-redux'

const PanelHeight = 30


class Poper extends Component{

  constructor(props){
    super(props)

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
    this._hide = this._hide.bind(this)
    this.state = {
      top : new Animated.Value(H)
    }
  }

  shouldComponentUpdate(nextPorops){
    // Use a animation frame to calculate component height
    const old = {...this.props}
    requestAnimationFrame( (() => {
      if(old.show !== nextPorops.show) {
        this.refs.view.refs.node.measure ( ((ox, oy, width, height, px, py) => {
          if(nextPorops.show) { // begin to show
            this.state.top.setValue(H)
            requestAnimationFrame( (() => {
              Animated.timing(
                this.state.top,
                {
                  toValue : H - height,
                }
              ).start()
            }).bind(this))
          } else {
            this.state.top = H - h

          }
        }).bind(this))

      }
    }).bind(this))

    return true
  }
  
  _hide(){
    this.props.dispatch(hide_poper())
  }

  render(){
    const { show, component } = this.props
    if(!show) { return null }
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.poper, {top : this.state.top}]} ref="view">
          {component}
          <View style={styles.panel}>
            <TouchableOpacity onPress={this._hide} style={styles.done}>
              <Text>完成</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )

  }

}


const styles = StyleSheet.create({
  container : {
    position : 'absolute',
    backgroundColor : 'rgba(0, 0, 0, 0.1)',
    top : 0,
    width : W,
    height : H  
  },

  poper: {
    position : 'absolute',
    backgroundColor : 'white',
    width : W,
    top : H
  },

  panel : {
    height : PanelHeight,
    
    
  },
  
  done : {
    width : W,
    alignItems : 'center',
    justifyContent : "center"
  }
})


const mapStateToProps = ( state ) => {
  return {
    show : state.poper.show,
    component : state.poper.component
  }
}
export default connect(mapStateToProps)(Poper)