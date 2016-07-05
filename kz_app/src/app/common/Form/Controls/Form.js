/**
 *
 * Created by weimeng on 16/2/27.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import React, {Component} from 'react'
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'


import InputWrapper from "./InputWrapper"
import { createForm, valueChange, registerDisplayChangeHandler, registerValidationHandler, unRegisterDisplayHandler, removeForm } from "../index"
import { setIn } from "../../util/object"
import {
  grey,
  dark,
  getResponsiveSize
} from "common/index"


const textStyle = {
  fontSize: getResponsiveSize(12),
  color: dark
}

const smallTextStyle = {
  fontSize: getResponsiveSize(11),
  color:grey
}
export class Form extends Component {

  constructor() {
    super()
    this.state = {
      form : null
    }
    this._displayHandler = this._displayHandler.bind(this)
  }

  _displayHandler() {

    console.log('force update')
    this.forceUpdate()
  }

  componentDidMount(){
    const form = createForm( this.props.meta, this.props.data )
    //registerValidationHandler(form.name, this.onValidation.bind(this))
    registerDisplayChangeHandler(form.name, this._displayHandler)
    this.setState({
      form
    })
  }
  
  componentWillUnmount(){
    unRegisterDisplayHandler(this.props.meta.name)
    removeForm(this.props.meta.name)
  }
  



  onValidation(propName, data, params){
    const nForm = setIn( this.state.form, ['data', propName], data)
    if ( params && !params.showError ) { data.errorMessage = '' }

    this.setState ({
      submittingError : "",
      form : nForm
    })
  }



  _initGroup (form) {
    if(!form.groups) {
      form.groups =  []

      let arr = []
      for(let key in form.properties) {
        arr.push(key)
      }

      form.groups.push({
        range : [arr[0], arr[arr.length - 1]]
      })
    }

  }

  render() {

    const { form } = this.state
    const { getScrollView } = this.props

    if( !form ) {
      return null
    }

    this._initGroup(form)

    return (
      <View>

          {
            form.groups.map( (group, i ) => {
              return <ContrlGroup key={i} group={group} form={form} getScrollView={getScrollView} isLast={i === form.groups.length - 1} />
            })
          }
      </View>
    )
  }
}


class ContrlGroup extends Component{
  _change(propName, value) {
    const { form } = this.props
    valueChange(form.name, propName, value)
  }
  renderItem(i, propName , meta, data, getScrollView) {
    if(data.hidden){
      return null
      
    }
    return <InputWrapper
      key={i}
      propName={propName}
      meta={meta}
      formName={this.props.form.name}
      data={data}
      getScrollView={getScrollView}
      onChange={this._change.bind(this)} />
  }


  renderGroupItems( group, form, getScrollView ){
    if(!(group.range)) {
      return []
    }
    const { range } = group
    const [ start, end ] = range
    const items = []

    let begin = false
    for(let key in form.properties) {
      if( key === start) {
        begin = true
      }
      if(begin)
        items.push( this.renderItem(key, key, form.properties[key], form.data[key], getScrollView) )
      if( key === end ) {
        break
      }
    }
    // console.log(items.length)
    return items
  }


  render(){
    const { group, form, getScrollView, isLast } = this.props
    const mix = {

    }

    if(isLast) {
      mix.marginBottom= 0
    }
    return (
      <View style={styles.GroupContainerWrapper}>
          <View style={styles.GroupHintContainer} >

            {group.hint &&
            <View style={styles.GroupHintContainerInner}>
              <Text style={smallTextStyle}>{group.hint}</Text>
            </View>
            }
          </View>
        <View style={[styles.GroupContainer, mix]} >
          {group.button
          &&
          <TouchableOpacity onPress={group.button.handler.bind(group)} style={styles.GroupButton}>
            <View>
              <Text style={textStyle}>
                {group.button.getText()}
              </Text>
            </View>
          </TouchableOpacity>
          }
          { this.renderGroupItems( group, form, getScrollView ) }
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  GroupContainerWrapper : {

  },
  GroupHintContainer : {
  },
  GroupHintContainerInner : {
    height : 40,
    justifyContent: 'center',
    paddingLeft : 20,
  },
  GroupContainer : {
    backgroundColor: 'white',
    marginBottom : 10,
    paddingBottom : 10
  },
  GroupButton : {
    height : 40,
    paddingLeft : 20,
    alignItems : 'flex-start',
    justifyContent : "center"
  },
})
