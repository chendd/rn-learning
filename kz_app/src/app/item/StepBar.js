/**
 *
 * Created by weimeng on 16/4/6.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions
} from "react-native"



import {
  lightGrey,
  orange,
  grey,
  getResponsiveSize
} from "common/index"

const L = 60
const T = 20
const r = 10
const W = Dimensions.get("window").width

export const StepBar = ({step}) => {

  const FinishedCircle = [styles.Circle, styles.CircleFull, { borderColor: orange}]
  const CurrentCircle = [styles.Circle, { borderColor: orange}]
  const PendingCircle = [styles.Circle, styles.CircleFull, { borderColor: lightGrey }]

  const FinishedLine = [styles.Line, { backgroundColor: orange}]
  const PendingLine = [styles.Line, { backgroundColor: lightGrey }]

  const FinishedNCurrentText = [styles.Text, { color: orange }]
  const PendingText = [styles.Text]

  const circleStyle = n => {
    if      (step > n)  return FinishedCircle
    else if (step == n) return CurrentCircle
    else if (step < n)  return PendingCircle
  }

  const lineStyle = n =>
    step > n ?
      FinishedLine:
      PendingLine

  const TextStyle = n =>
    step >= n ?
      FinishedNCurrentText:
      PendingText

  return (
    <View style={styles.Container}>
      <View style={[styles.Circle1, circleStyle(1)]} />
      <View style={[styles.Circle2, circleStyle(2)]} />
      <View style={[styles.Circle3, circleStyle(3)]} />

      <View style={[styles.L1, lineStyle(1)]} />
      <View style={[styles.L2, lineStyle(2)]} />

      <Text style={[styles.T1, TextStyle(1)]}>分类选择</Text>
      <Text style={[styles.T2, TextStyle(2)]}>失物拍照</Text>
      <Text style={[styles.T3, TextStyle(3)]}>资料补充</Text>
    </View>
  )
}

const styles = {
  Finished: {
    background: orange
  },
  Pending: {
    background: lightGrey
  },
  Container: {
    position: 'relative',
    height: 70,
    backgroundColor: 'white'
  },
  Circle: {
    borderRadius: 50,
    width: r,
    height: r,
    backgroundColor: 'white',
    borderWidth: 1.2,
    // borderColor: ThemeLightBlueColor,
    position: "absolute",
    top: T
  },
  CircleFull: {
    borderWidth: 5
  },
  Circle1: {
    left: L - r / 2
  },
  Circle2: {
    left: W / 2 - r / 2
  },
  Circle3: {
    right: L - r / 2
  },
  Line: {
    position: 'absolute',
    height: 1.2,
    // backgroundColor: ThemeLightBlueColor,
    width: (W - 2 * L) / 2 - r,
    top: T + r / 2 - 1
  },
  L1: {
    left: L + r / 2
  },
  L2: {
    left: W / 2 + r / 2
  },
  Text: {
    color : grey,
    fontSize : getResponsiveSize(11),
    position: 'absolute',
    top: T + 20
  },
  T1: {
    left: L - 22 
  },
  T2: {
    left: W / 2 - 22 
  },
  T3: {
    right: L - 22 
  }
}
