/**
 * Created by yyt on 16/5/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 *
 */

import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  ViewPagerAndroid,
  Platform,
  InteractionManager
} from 'react-native'

import {
  W,
  H,
  orange,
  grey,
  lightGrey,
  Form,
  getResponsiveSize,
  PagesConfig,
  ProgressView
} from "common/index"

import {
  GET_JOB_INFO_BY_USER_ID,
  GET_HOME_INFO_BY_USER_ID
} from "service/contract/user"

import { create_service } from 'actions/index'
import { connect } from 'react-redux'
import metaWork from "./form/workInfoForm"
import metaFamily from "./form/familyInfoForm"

class ApplicationInfoPage extends Component {

  constructor(props){
    super(props)
    this._updateSelectedPage = this._updateSelectedPage.bind(this)
    this.state = {
      isFirst : true,
      createfamily: false,
      createWork: false
    }
    this.aPromise = null
    this.familyPromise = null


  }
  componentDidMount() {
    const { user_id }= this.props.user
    const data = {user_id:user_id}
    InteractionManager.runAfterInteractions(() => {
      this.aPromise = this.props.dispatch(create_service(GET_JOB_INFO_BY_USER_ID,data))
        .then( data => {
          for(let key in metaWork.properties ){
            metaWork.properties[key].defaultValue = data[key]
            if (key=='month_income') {
              metaWork.properties[key].defaultValue = String(data[key])
            }
          }
          this.setState({ createWork:true })
        })
        .catch(e => {
        })

      this.aPromise = this.props.dispatch(create_service(GET_HOME_INFO_BY_USER_ID,data))
        .then( data => {
          for(let key in metaFamily.properties ){
            metaFamily.properties[key].defaultValue = data[key]

            if (key =='marriage_status') {
              if (data[key] == 0) {
                data[key] = '未婚'
              }else if (data[key] == 1) {
                data[key] = '已婚'
              }else if (data[key] == 2) {
                data[key] = '其他'
              }
              metaFamily.properties[key].defaultValue = data[key]
            }
            if (key =='has_children') {
              metaFamily.properties[key].defaultValue = data[key]==0? '没有' : '有'
            }
          }
          this.setState({ createfamily:true })
        })
        .catch(e => {
        })

    })


  }
  componentWillUnmount() {
    if(this.aPromise) {
      this.aPromise.cancel()
    }
    if(this.familyPromise) {
      this.familyPromise.cancel()
    }
  }
  onPressButton(label){
    if (this.state.isFirst == true) {
      if (label == "家庭信息") {
        this.setState({ isFirst:false })
        if (Platform.OS === 'ios') {
          this.scrollView.scrollTo({x:W})
        }
        else{
          this.scrollView.setPage(1)
        }
      }
    }else{
      if (label == "工作信息") {
        this.setState({ isFirst:true })
        if (Platform.OS === 'ios') {
          this.scrollView.scrollTo({x:0})
        }
        else{
          this.scrollView.setPage(0)
        }
      }
    }
  }
  _updateSelectedPage(currentPage) {
    page = currentPage.nativeEvent.position;
    if(this.state.isFirst && page>0){
      this.setState({ isFirst:false })
    }
    else if(!this.state.isFirst && page==0){
      this.setState({ isFirst:true })
    }
  }
  renderScrollableContent() {
    if (Platform.OS === 'ios') {
      return (
        <ScrollView
          ref={ (scrollView) => { this.scrollView = scrollView } }
          horizontal={ true }
          contentContainerStyle={ styles.contentContainer }
          pagingEnabled={ true }
          onScroll={(e) => {

          }}
          onMomentumScrollBegin={(e) => {
              const offsetX = e.nativeEvent.contentOffset.x;
              const page = Math.round(offsetX / W);
              if(this.state.isFirst && page>0){
                this.setState({ isFirst:false })
              }
              else if(!this.state.isFirst && page==0){
                this.setState({ isFirst:true })
              }
          }}
          onMomentumScrollEnd={(e) => {
              const offsetX = e.nativeEvent.contentOffset.x;
              const page = Math.ceil(offsetX / W);
              if(this.state.isFirst && page>0){
                this.setState({ isFirst:false })
              }
              else if(!this.state.isFirst && page==0){
                this.setState({ isFirst:true })
              }
            }}>

          <View style={ styles.viewRow }>
            <Form meta={ metaWork } />
          </View>
          <View style={ styles.viewRow }>
            <Form meta={ metaFamily } />
          </View>

        </ScrollView>
      )
    }
    else {
      return (
        <ViewPagerAndroid
          style={styles.container}
          initialPage={0}
          onPageSelected={this._updateSelectedPage}
          keyboardDismissMode="on-drag"
          onPageScroll={(e) => {}}
          ref={(scrollView) => { this.scrollView = scrollView; }}
        >
          <View style={ styles.viewRow }>
            <Form meta={ metaWork } />
          </View>
          <View style={ styles.viewRow }>
            <Form meta={ metaFamily } />
          </View>
        </ViewPagerAndroid>
      )

    }
  }

  render(){
    if (this.state.createfamily && this.state.createWork) {
      return (
        <View style={ styles.container }>
          <HeaderChooseButton
            ref={ (header) => { this.header = header } }
            oneValue={ '工作信息' }
            twoValue={ '家庭信息' }
            isFirst={ this.state.isFirst }
            onPressButton={ this.onPressButton.bind(this) }
          />
          <View style={ styles.viewLine }/>
          {this.renderScrollableContent()}

        </View>
      )
    }else{
      return (
        <View style={{justifyContent:'center',flex:1}}>
          <ProgressView />
        </View>
      )
    }
  }
}

class HeaderChooseButton extends Component {
  constructor(props){
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }
  renderItem( isSelect, label ){
    return (
      <TouchableWithoutFeedback onPress={()=>{ this.props.onPressButton(label) }}>
        <View style={ headerStyles.buttonView }>
          <Text style={ isSelect ? headerStyles.textIconBlue : headerStyles.textDark }>
            { label }
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  render(){
    return (
      <View style={ headerStyles.headerView }>
        <View style= { headerStyles.row }>
          {this.renderItem( this.props.isFirst,this.props.oneValue )}
          {this.renderItem( !this.props.isFirst,this.props.twoValue )}
        </View>

        <View style={ [headerStyles.lineView, !this.props.isFirst && headerStyles.indexTwoLine ] }/>

      </View>
    )
  }
}

const headerStyles = StyleSheet.create({
  headerView: {
    width: W,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  row: {
    flexDirection: 'row'
  },
  buttonView: {
    width: W/2,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIconBlue: {
    color: orange,
    fontSize: getResponsiveSize(14)
  },
  textDark: {
    color: grey,
    fontSize: getResponsiveSize(14)
  },
  lineView: {
    marginLeft: 0,
    width: W/2,
    height: 2,
    backgroundColor: orange,
  },
  indexTwoLine: {
    marginLeft: W/2
  }
})

const styles = StyleSheet.create({
  container : {
    flex : 1,
    borderBottomWidth : 1,
    borderBottomColor : lightGrey
  },
  contentContainer: {
    height: H - 64 - 44 -45,
    width: W*2,
  },
  viewRow: {
    flex: 1,
  },
  viewLine: {
    backgroundColor: lightGrey,
    height: 1,
  }
})
const mapStateToProps = (state) => {
  return {
    route : state.navigator.current.name,
    user : state.user
  }
}
module.exports = connect(mapStateToProps)(ApplicationInfoPage)
