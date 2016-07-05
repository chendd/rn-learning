/**
 * Created by weimeng on 16/4/20.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, { Component } from 'react'
import {
  Navigator,
  View,
  Text,
  StyleSheet,
  InteractionManager,
  Platform
} from "react-native"

import { connect } from "react-redux"
import { navConsumeAll, navTo, setInitial } from "./actions/index"
import {PagesConfig as PagesConf, lightGrey} from "common/index"

var KeNavigator = React.createClass({

  getInitialState : function(){



    return null
  },


  componentWillReceiveProps : function(nextProps){
    const queue = nextProps.navigator.queue

    if(queue && queue.length > 0){

      const {passProps, route, replace, back, reset, backAndRefreshPrevious, replaceWithAnimation} = queue.pop()

      // 返回
      if(back) {
        this.refs.nav.pop()
        requestAnimationFrame( (() => {
          const routes = this.refs.nav.getCurrentRoutes()
          const t = routes.slice(0, routes.length - 1)

          // 在返回的时候, 如果路由栈中只有1个路由,则返回到home, replace操作没有动画, 所以先将home压入栈中在pop
          if(t.length > 0) {
            if(passProps) {
              t[t.length - 1].passProps = passProps
            }
            this.props.dispatch(navConsumeAll(t[t.length - 1]))
          } else {
            this.refs.nav.immediatelyResetRouteStack([PagesConf.Home, routes[0]])
            this.refs.nav.pop()
            this.props.dispatch(navConsumeAll(PagesConf.Home))
          }
        }).bind(this))
      } 
      else if(replace) {
        this.refs.nav.replace(route)
        this.props.dispatch(navConsumeAll(route))
      }
      else if (reset) {
        this.refs.nav.resetTo(route)
        //this.refs.nav.immediatelyResetRouteStack([route])
        this.props.dispatch(navConsumeAll(route))
      }
      // B -> A -> Login |  B
      else if(backAndRefreshPrevious) {
        let stack = this.refs.nav.getCurrentRoutes().slice()
        const curr = stack.pop() // Pop current
        const prev = stack.pop() // Pop Prev

        const next = PagesConf[prev.name]
        if (stack.length > 0) {
          this.refs.nav.popToRoute(stack[stack.length - 1])
          this.refs.nav.push(next)
        } else {
          this.refs.nav.resetTo(next)
        }
        this.props.dispatch(navConsumeAll(next))
      }
      else if (replaceWithAnimation ) {
        this.refs.nav.push(route)
        InteractionManager.runAfterInteractions( (() => {
          const stack = this.refs.nav.getCurrentRoutes()
          const a = stack.pop()
          const b = stack.pop()
          stack.push(a)
          this.refs.nav.immediatelyResetRouteStack(stack)  
        }).bind(this))
        
        this.props.dispatch(navConsumeAll(route))
      }
      else {
        this.refs.nav.push(route)
        this.props.dispatch(navConsumeAll(route))
      }

    }
  },


  shouldComponentUpdate : function(nextProps, nextState){
    return this.props.navigator === nextProps.navigator;
  },


  componentDidMount : function(){

  },


  configScene : function(route) {
    if(route === null) {
      return null
    }

    if(Platform.OS === 'android') {
      return Navigator.SceneConfigs.FadeAndroid
    }

    /*
    if( route.name === PagesConf.Login.name) {
      return Navigator.SceneConfigs.VerticalDownSwipeJump
    }
    */
    /*
     if( Platform === 'android' ){
     return Navigator.SceneConfigs.
     }
     */

    return Navigator.SceneConfigs.FloatFromRight
  },


  renderScene : function(route){
    if(route === null) {
      return null
    }
    let Comp = route.Component

    return(

      <View style={styles.container}>
        <Comp {...route.passProps}></Comp>
      </View>
    )
  },

  render : function() {


    return (
      <Navigator
        ref="nav"
        initialRoute={this.props.navigator.current}
        configureScene={this.configScene}
        renderScene={this.renderScene}
      />
    )
  }
})

function mapStateToProps(state) {
  return {
    navigator : state.navigator,
    isLoggedIn : state.user.isLoggedIn
  }
}


const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : lightGrey
  }

})

module.exports = connect(mapStateToProps)(KeNavigator) 




