/**
 * Created by weimeng on 16/4/20.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */



import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
} from "react-native"


import { connect } from 'react-redux'
import { switchTab } from "../actions/index"
import {TabBar} from "common/index"
import {KeHomePage} from "./KeHomePage"
import {ItemCategorySelection} from "item/ItemCategorySelection"
import ItemSearch from "item/ItemSearch"

const iconUser = {
  normal : require("./img/icon-user.png"), 
  selected : require("./img/icon-user-selected.png")
}
const iconHome = {
  normal : require("./img/icon-home.png"),
  selected : require("./img/icon-home-selected.png")
}
const iconWrite = {
  normal : require("./img/icon-write.png"),
  selected : require("./img/icon-write-selected.png")
}




import {
  orange,
  grey,
  lightGrey,
  getResponsiveSize
} from "common/index"


class KeTabsView extends Component {




  onTabSelected(tab) {
    if(this.props.tab !== tab) {
      this.props.dispatch(switchTab(tab))
    }
  }
  render(){
    return (
      <TabBar
        barTintColor='white'
        style={styles.tab}
        selectedColor={orange}
        color={grey}
        height={49}
        paddingTop={2}
        paddingBottom={7}
        paddingLeft={10}
        paddingRight={10}
        borderColor={lightGrey}
        fontSize={12}
        selectedColor={orange}
      >



        <TabBar.Item
          key="1"
          title = '首页'
          selected = {this.props.tab === 'purchase'}
          onPress={this.onTabSelected.bind(this, 'purchase')}
          icon={iconHome.normal}
          selectedIcon={iconHome.selected}
        >
          <KeHomePage />
        </TabBar.Item>

        <TabBar.Item
          key="2"
          title = '失物录入'
          selected = {this.props.tab === 'bill'}
          onPress={this.onTabSelected.bind(this, 'bill')}
          icon={iconWrite.normal}
          selectedIcon={iconWrite.selected}>

          <ItemCategorySelection />
        </TabBar.Item>
        <TabBar.Item
          key="3"
          title = '账号管理'
          selected = {this.props.tab === 'uc'}
          onPress={this.onTabSelected.bind(this, 'uc')}
          icon={iconUser.normal}
          selectedIcon={iconUser.selected}
        >
          <View />
        </TabBar.Item>


      </TabBar>
    )
  }
}

KeTabsView.propTypes = {

}

const styles = StyleSheet.create({
  tabbar : {
    borderColor : 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    tab : state.tab
  }
}
module.exports = connect(mapStateToProps)(KeTabsView)
