/**
 * Created by yyt on 16/5/11.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 * 已购买物品页面
 */
import React, {Component} from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ListView,
  Platform,
  InteractionManager
} from 'react-native'

import { connect } from 'react-redux'
import LoginPanel from "./LoginPanel"
import PurchasedGoodsItem  from "./PurchasedGoodsItem"
import { UserCenterHeader } from "./UserCenterHeader"

import {
  W,
  H,
  borderColor,
  lightGrey,
  getResponsiveSize,
  PagesConfig as Pages,
  ProgressView,
} from "common/index"

const USER_INFO_BAR_HEIGHT = 95

import {
  ORDER_GET
} from "service/contract/order"

import { create_service, navTo, navBack } from 'actions/index'

class PurchasedGoodsPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loading: false
    }

    this.aPromise = null

    this._view = this._view.bind(this)
  }

  _view(data){

    return (() => {
      this.props.dispatch( navTo(Pages.Bill, {order_sn : data.order_sn}) )  
    }).bind(this)
  }

  renderRow(data,product, sectionID, rowID, highlightRowFunc) {
    return(
      <PurchasedGoodsItem
        key={data.order_id}
        product={data}
        onClick={this._view(data)}
      />
    )
  }

  renderSeparator(sectionID, rowID) {
    return (
      <View style = {styles.separatorView} key={rowID} >
      </View>
    )
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.aPromise = this.props.dispatch(create_service(ORDER_GET))
        .then( (data => {
          if (data.order_list.length>0) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data.order_list),
              loading: true
            })
          }
        }).bind(this))
        .catch( e => {

        })
    })
  }
  componentWillUnmount() {
    if(this.aPromise) {
      this.aPromise.cancel()
    }
  }
  render(){
    var { isLoggedIn, mobile, avatar }= this.props.user
    if (this.state.loading) {
      if (typeof(avatar) == "undefined") {
        avatar = require('../tabs/img/user.png')
      }else{
        avatar = {uri : this.props.avatar, scale : 3}
      }
      return (
        <View style= {styles.page}>
          <UserCenterHeader mobile= {mobile} avatar= {avatar}/>
          <ListView
            dataSource= {this.state.dataSource}
            renderRow= {this.renderRow.bind(this)}
            renderSeparator= {this.renderSeparator.bind(this)} />
        </View>
      )
    }else{
      return (
        <View style={[styles.container,{justifyContent:'center'}]}>
          <ProgressView />
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex : 1,
    backgroundColor : lightGrey,
  },
  separatorView: {
    height: 1,
    width: W,
    backgroundColor: borderColor,
  }
})

const mapStateToProps = (state) => {
  return {
    route : state.navigator.current.name,
    user : state.user
  }
}

module.exports = connect(mapStateToProps)(PurchasedGoodsPage)
