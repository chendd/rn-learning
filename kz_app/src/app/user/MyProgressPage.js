/**
 * Created by yyt on 16/5/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 * 我的进度页面
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
import { navTo, navBack } from "actions/index"
import LoginPanel from "./LoginPanel"
import ProgressDetailPage  from "./ProgressDetailPage"
import PurchasedGoodsItem  from "./PurchasedGoodsItem"

import {
  W,
  H,
  getResponsiveSize,
  PagesConfig as Pages,
  ProgressView,
} from "common/index"

import {
  ORDER_GET
} from "service/contract/order"

import { create_service } from 'actions/index'

class MyProgressPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loading: false
    }
    this.aPromise = null
  }


  renderRow(data) {
    return(
      <PurchasedGoodsItem
        key={data.order_id}
        product={data}
        onClick={this.onItemClick.bind(this, data)}/>
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
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data.order_list),
            loading: true
          })
        }).bind(this))
        .catch( e => {

        })
    })
  }
  onItemClick(data) {
    this.props.dispatch( navTo(Pages.ProgressDetailPage, {order_sn : data.order_sn}))
  }
  componentWillUnmount() {
    if(this.aPromise) {
      this.aPromise.cancel()
    }
  }

  render(){
    const { isLoggedIn, mobile, avatar }= this.props.user
    if (this.state.loading) {
      return (
        <View style={styles.page}>
          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderRow.bind(this)}
            renderSeparator = {this.renderSeparator.bind(this)} />
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
    backgroundColor : 'white',
  },
  separatorView: {
    height: 1,
    width: W,
    backgroundColor: '#f3f3f3',
  }
})

const mapStateToProps = (state) => {
  return {
    route : state.navigator.current.name,
    user : state.user
  }
}

module.exports = connect(mapStateToProps)(MyProgressPage)
