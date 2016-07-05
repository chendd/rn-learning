/**
 * Created by yyt on 16/5/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 * 进度详情页面
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
import PurchasedGoodsItem  from "./PurchasedGoodsItem"
import ProgressItem from "./ProgressItem"
import {
  W,
  H,
  lightGrey,
  getResponsiveSize,
  PagesConfig as Pages,
  ProgressView,
  LoadingView
} from "common/index"

import {
  ORDER_PROCESS_DETAIL
} from "service/contract/order"

import {
  create_service
} from "actions/index"


class ProgressDetailPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      order : null
    }
    this.progressPromise = null
  }

  componentDidMount() {

    let {order_sn} = this.props.passProps

    InteractionManager.runAfterInteractions(() => {
      let {order_sn} = this.props.passProps

      this.progressPromise = this.props.dispatch(create_service(ORDER_PROCESS_DETAIL, {order_sn}))
      this.progressPromise.then(data => {

        this.allData = data
        this.setState({
          order : data,
          dataSource : this.state.dataSource.cloneWithRows(data.order_records)
        })
      })
      this.progressPromise.catch( e=> {

      })
    })
  }
  componentWillUnmount() {
    if(this.progressPromise) {
      this.progressPromise.cancel()
    }
  }

  renderRow({status, date}, s_id, rowID) {

    console.log(this.allData.order_records);
    let isHeader = false, isBottom = false
    if (Number(rowID) == 0 ) {
      isHeader = true
    }
    if (this.allData.order_records.length == Number(rowID)+1) {
      isBottom = true
    }

    const _s = this
    const {order_sn} = this.props.passProps

    const {order} = this.state

    const action = () => {
      if(status === "审核通过" && order.status === '审核通过') {

        return {
          text : "签约",
          onPress : () => {
            _s.props.dispatch(navTo(Pages.ApplyContract, {order_sn}))
          }
        }
      } else if(status === "发货中" && order.status === "发货中") {


        return {
          text : "确认收货",
          onPress : () => {
            _s.props.dispatch(navTo(Pages.ConfirmReceiptPage, this.state.order))
          }

        }
      }
      return null
    }
    return(
      <ProgressItem
        key = {rowID}
        num = {Number(rowID)+1}
        isHeader = {isHeader}
        isBottom = {isBottom}
        status={status}
        date={date}
        action={action()}
      />
    )
  }


  render(){
    const {order} = this.state

    if(!order) {
      return <View style={styles.loadingView}>
        <ProgressView />
      </View>
    }


    return (
      <View style={styles.page}>
        <PurchasedGoodsItem isTwelve = {true} product={order} />
        <ListView
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingView : {
    flex : 1,
    justifyContent : 'center'
  },
  page: {
    flex : 1,
    backgroundColor : lightGrey,
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
    user : state.user,
    passProps : state.navigator.current.passProps
  }
}

module.exports = connect(mapStateToProps)(ProgressDetailPage)
