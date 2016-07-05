/**
 * Created by weimeng on 16/4/6.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import { Platform, Dimensions } from "react-native"

import {
  getResponsiveSize
} from "common/index"


export const FontSize = 10

export const White = '#FFFFFFF'
export const LightGrey = '#F2F2F2'
export const Grey = '#909090'

const o = Dimensions.get("window")
export const FontColorGrey = "#333"
export const W = o.width
export const H = o.height
export const TitleBarHeight = Platform.OS === 'ios' ? 62 : 42
export const ThemeLightBlueColor = "#7fd9cf"
export const HeadSpace = (Platform.OS === 'ios' ? 20 : 0)

export const StandardText = {
  fontSize: getResponsiveSize(10),
  color: FontColorGrey
}

export const LightText = {
  fontSize: getResponsiveSize(10),
  color: Grey
}
