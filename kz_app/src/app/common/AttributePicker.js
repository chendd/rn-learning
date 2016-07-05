/**
 * Created by cauchywei on 16/5/2.
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
  orange,
  getResponsiveSize,
  W
} from "common/index"


const INVALID_INDEX = -1

const AttributePickProps = PropTypes.shape({
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    selectable: PropTypes.bool
  }))
})

export class AttributePicker extends Component {

  static Props = {
    ...View.props,
    attribute: AttributePickProps.isRequired,
    initIndex: PropTypes.number,
    onItemSelected: PropTypes.func
  }


  constructor(props) {
    super(props)
    this.state = this.getStateFromProps(props)
  }


  componentWillReceiveProps(nextProps){
    if (nextProps) {
      this.setState(this.getStateFromProps(nextProps))
    }
  }

  getStateFromProps(props) {

    let initIndex = props.initIndex;
    if (initIndex === null || initIndex === (void 0) || initIndex < 0 || initIndex >= props.attribute.items.length
      || !props.attribute.items[initIndex].selectable) {
      initIndex = INVALID_INDEX
    }
    return {
      selectedIndex:initIndex
    };
  }


  getSelectedIndex() {
    return this.state.selectedIndex
  }

  getSelectedItem() {
    const selectedIndex = this.state.selectedIndex;
    if (selectedIndex == INVALID_INDEX) {
      return null
    } else {
      return this.props.attribute.items[selectedIndex]
    }
  }



  onItemPress(item) {
    if(item.selectable) {
      this.props.onItemSelected(item)
    }
  }

  render() {
    let {attribute,style, ...props} = this.props
    console.log(attribute);
    return (
      <View style={[attrStyles.container,style]}>
        <Text style={attrStyles.title}>{attribute.attr_group_name}选择</Text>
        <View style={attrStyles.itemContainer}>
          {attribute.attr_list.map((item, index)=> {
            let itemStyle = null
            let itemTitleStyle = null
            if (item.selectable) {
              if (item.selected) {
                itemStyle = attrStyles.itemSelected
                itemTitleStyle = attrStyles.itemTitleSelected
              }
            } else {
              itemStyle = attrStyles.itemUnable
              itemTitleStyle = attrStyles.itemTitleUnable
            }
            return (
              <TouchableWithoutFeedback
                onPress={this.onItemPress.bind(this,item)}
                key={index}>
                  <View style={[attrStyles.item,itemStyle,attribute.attr_group_name=='分期'&&attrStyles.installmentItem]}>
                    <Text style={[attrStyles.itemTitle,itemTitleStyle,attribute.attr_group_name=='分期'&&attrStyles.installmentItem,attrStyles.installmentTitle]}>
                      {item.name}
                    </Text>
                  </View>
              </TouchableWithoutFeedback>
            )
          }, this)}
        </View>
      </View>
    )
  }

}


export class CompositeAttributesPicker extends Component {

  static Props = {
    ...View.props,
    attributes: PropTypes.arrayOf(AttributePickProps).isRequired
  }


  constructor(props) {
    super(props)

    //let selectState = new Array(props.attributes.length)
    let attributes = props.attributes.slice()

    this.state = {
      attributes
    }
  }


  onAttributeSelected(item) {
    this.props.onItemSelected(item)
  }

  render() {
    const {style, ...props} = this.props
    const attributes = this.state.attributes

    if (!attributes) return null

    return (
      <View style={[multiAttrStyles.container,style]}>
        {attributes.map((attr, index)=> {
          return(
            <AttributePicker
              ref={'picker' + index}
              key={index}
              attribute={attr}
              onItemSelected={(item)=>this.onAttributeSelected(item)}/>
          )})
        }
      </View>
    )
  }
}


var attrStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 12,
    paddingBottom : 0,
    backgroundColor: 'white'
  },
  title: {
    fontSize: getResponsiveSize(12),
    color: '#000a',
    marginLeft: 4
  },
  itemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 6,
    alignItems: 'flex-start'
  },
  item: {
    borderWidth: 1,
    borderColor: '#0003',
    paddingVertical: 6,
    paddingHorizontal: 24,
    margin: 4,
  },
  installmentItem: {
    width: W/3-16,
    alignItems: 'center'
  },
  installmentTitle: {
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  itemSelected: {
    borderColor: orange,
  },
  itemUnable: {
    borderColor: '#0002',
    borderStyle: 'dashed'
  },

  itemTitle: {
    fontSize: getResponsiveSize(12),
    color: '#0007',
  },
  itemTitleSelected: {
    color: orange,
  },
  itemTitleUnable: {
    color: '#0003',
  },

})


var multiAttrStyles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }

})
