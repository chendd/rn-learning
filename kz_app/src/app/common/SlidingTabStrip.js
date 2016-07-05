/**
 * Created by cauchywei on 16/4/30.
 */


import React, {Component, PropTypes} from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
    ScrollView,
    ColorPropType,
    Animated,
} from "react-native"

import {
 getResponsiveSize,
} from "common/index"
// var titles = ["苹果", "三星", "小米", "魅族", "华为", "一加", "锤子", "海尔", "格力"]


export default class SlidingTabStrip extends Component {

    static Props = {
        titleColor: ColorPropType,
        selectedTitleColor: ColorPropType,
        maxTabInScreen: PropTypes.number,
        initSelectedIndex: PropTypes.number,
        onTabSelected: PropTypes.func,
        tabs: PropTypes.arrayOf(PropTypes.string).isRequired
    }

    static defaultProps = {
        width: 0,
        maxTabInScreen: 9,
        titleColor: 'gray',
        selectedTitleColor: 'black',
        selectedIndex: 0,
        animationDuration: 500
    }


    constructor(props) {
        super(props)

        this.state = {
            tabWidth: 0,
            underLineOffset: new Animated.Value(0),
            underlineWidth: 20,
            selectedIndex: props.initSelectedIndex || 0,
        }
    }

    getCurrentIndex(){
        return this.state.selectedIndex
    }



    selectedTab(index,notify = false) {

        if (index === this.state.selectedIndex) {
            return
        }


        const newTab = this.getTab(index)

        if(!newTab){
            return
        }

        const newOffset = newTab.layout.x + (newTab.layout.width - this.state.underlineWidth) / 2;

        requestAnimationFrame(() => {
            const anim = Animated.timing(
                this.state.underLineOffset,
                {
                    toValue: newOffset,
                    duration: Math.min(1, Math.abs(this.state.underLineOffset.__getValue() - newOffset) / this._width) * this.props.animationDuration
                }
            )
            // anim.addListener((v) => {
            //     if (v === newOffset) {
            //         this.setState({selectedIndex: index})
            //         this.props.onTabSelected && this.props.onTabSelected(index)
            //     }
            // })
            anim.start();
        })

        this.setState({selectedIndex: index})
        notify && this.props.onTabSelected && this.props.onTabSelected(index)

    }


    onPageScroll(currentIndex, offset) {

        const length = this.props.tabs.length;

        if(offset < 0) {
            currentIndex -= 1
            offset = 1 - offset
        }

        if (length <= 1 ) {
            return
        }

        if (this.tabHasLayouted(currentIndex) && this.tabHasLayouted(currentIndex+1)) {

            const currentTabOffset = this.getUnderlineOffsetOfTab(this.getTab(currentIndex));
            const nextTabOffset = this.getUnderlineOffsetOfTab(this.getTab(currentIndex+1));

            let value = currentTabOffset + offset *(nextTabOffset-currentTabOffset);
            value = Math.max(0,value)
            this.state.underLineOffset.setValue(value)

        }


    }

    onPageScrollRelease(currentIndex, offset) {

    }

    tabHasLayouted(index){
        const tab = this.getTab(index);
        return tab && tab.layout
    }

    _onLayout(e) {

        this._width = e.nativeEvent.layout.width
        this.setState({
            tabWidth: this._width / Math.min(this.props.maxTabInScreen + 0.5,this.props.tabs.length)
        })

    }

    _onTabLayout(e, index) {

        const tab = this.getTab(index);
        const needRerender = !tab.layout || tab.layout.width !== e.nativeEvent.layout.width
        tab.layout = e.nativeEvent.layout

        // if(this.state.tabWidth < tab.layout.width){
        //     tab.setNativeProps({width:this.state.tabWidth })
        // }

        if (index == this.state.selectedIndex) {
            const initOffset = this.getUnderlineOffsetOfTab(tab);
            this.state.underLineOffset.setValue(initOffset)
        }

        if (needRerender) {

        }

    }

    getTab(index){
        return this.refs['tab_'+index];
    }

    getUnderlineOffsetOfTab(tab) {
        return tab.layout.x + (tab.layout.width - this.state.underlineWidth) / 2;
    }

    renderTab(title, index) {

        const spaceEnough = this.props.tabs.length <= this.props.maxTabInScreen;

        if(!spaceEnough && !this.state.tabWidth)
            return null

        const isSelected = this.state.selectedIndex == index;
        const tabStyle = {}

        if (spaceEnough) {
            tabStyle['width'] = this.state.tabWidth
        } else {

            tabStyle['paddingLeft'] = 20;
            tabStyle['paddingRight'] = 20;
            tabStyle['width'] = this.state.tabWidth
        }


        return (
            <TouchableWithoutFeedback
                key={'tab' + index}
                ref={'tab_' + index}
                accessible={true}
                accessibilityLabel={title}
                accessibilityTraits='button'
                onPress={() => this.selectedTab(index,true)}
                onLayout={ (e) => this._onTabLayout(e,index)}
            >

                <View style={[styles.tab,tabStyle]}>
                    <Text
                        numberOfLines={1}
                        style={[styles.tabTitle,{ color: isSelected?this.props.selectedTitleColor:this.props.titleColor }]}>
                        {title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>)

    }


    render() {

        const underlineStyle = {
            backgroundColor: this.props.selectedTitleColor,
            left: this.state.underLineOffset,
            width: this.state.underlineWidth
        };

        return (<View style={styles.container}>
            <ScrollView
                ref={(scrollView)=>{this.scrollView = scrollView}}
                horizontal={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onLayout={(e)=>this._onLayout(e)}
                contentContainerStyle={styles.scrollView}
            >

                {this.props.tabs.map((title, index) => this.renderTab(title, index))}

                <Animated.View style={[styles.tabUnderline, underlineStyle]}/>
            </ScrollView>
        </View>)

    }
}

var styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: 45
    },
    scrollView: {

    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 16,
    },

    tabTitle: {
        color: 'black',
        fontSize: getResponsiveSize(13),
    },

    tabTitleSelected: {
        color: 'black'
    },
    tabUnderline: {
        position: 'absolute',
        height: 2,
        width: 20,
        backgroundColor: 'red',
        bottom: 0,
        left: 0
    }
})
