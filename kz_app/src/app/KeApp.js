  /**
 * Created by weimeng on 16/2/18.
 */
import React, {Component} from 'react'
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';

import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';

import { Provider } from 'react-redux';
import {configureStore, getStore} from "./store/configureStore"
import KeNavigator from "./KeNavigator"
import { connect } from "react-redux"

import {
  lightGrey,
  PickerPop,
  PagesConfig,
  ProgressView,
  W,
  H

} from "common/index"

import {create_service} from "actions/service"
import { setInitial } from "actions/index"
import {KeTitleBar} from "./KeTitleBar"  


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      store : null
    }


  }
  componentDidMount() {
    configureStore( () => {

      const store = getStore()
      function init(){

        /*
        if(PagesConfig.initial.name === PagesConfig.Login.name) {
          if(store.getState().user.isLoggedIn) {
            store.dispatch(setInitial(PagesConfig.Home))
            return
          }
        }
        */
        store.dispatch(setInitial(PagesConfig.initial))
      }
      init()
      this.setState({
        store : getStore()
      })

    })


  }
  render() {

    const {store} = this.state
    if(!store) {
      return <View style={{flex : 1, width : W, height : H}}>
        <ProgressView />
      </View>
    }
    const { current } = store.getState().navigator
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.2)"
            networkActivityIndicatorVisible={true}
            style={styles.statusBar}
          />
          <KeTitleBar />

          {current && <KeNavigator /> }
          <PickerPop />
        </View>
      </Provider>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : lightGrey,
  },
});



module.exports = App
