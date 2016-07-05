/**
 * Created by cauchywei on 16/5/1.
 */

import React, {Component, PropTypes} from 'react'
import {
    View,
    StyleSheet,
    Platform,
    ProgressBarAndroid,
    ActivityIndicatorIOS,
    Color,
    ColorPropType
} from "react-native"


var STYLE_ATTRIBUTES = [
    'Horizontal',
    'Normal',
    'Small',
    'Large',
    'Inverse',
    'SmallInverse',
    'LargeInverse'
];

export class ProgressView extends Component {

    static Props = {
        ...View.Props,
        colorIOS: ColorPropType,
        colorAndroid: ColorPropType,
        animating: PropTypes.bool,
        styleAttr: PropTypes.oneOf(STYLE_ATTRIBUTES)
    }

    render() {

        var {colorIOS, colorAndroid, styleAttr, animating, ...props} = this.props

        if (Platform.OS == 'android') {
            return <ProgressBarAndroid {...props} styleAttr={styleAttr||'Normal'} color={colorAndroid}/>
        } else {
            return <ActivityIndicatorIOS {...props} animating={animating} color={colorIOS}/>

        }


    }

}

