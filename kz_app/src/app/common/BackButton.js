/**
 * 
 * Created by weimeng on 16/6/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import React, {Component} from 'react'
import {
  Image 
} from 'react-native'

import {
  NavButton
} from 'common/index'

import {navBack} from "actions/index"

import {connect} from 'react-redux'

const _BackButton = ({dispatch}) => <NavButton onPress={() => dispatch(navBack())}>
  <Image source={require("./img/back-icon.png")} />
</NavButton>

export const BackButton = connect()(_BackButton)