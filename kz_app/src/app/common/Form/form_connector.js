/**
 *
 * Created by weimeng on 16/3/28.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */



import React, { Component } from 'react'
import {
  createForm,
  valueChange,
  registerValidationHandler,
  registerDisplayChangeHandler,
  unRegisterHandlers, 
  removeForm
} from "common/index"
import { setIn } from "../util/object"

/**
 * Encapsulate common form behavior into a high order function
 * @param FormComponent
 * @param formMeta
 * @returns {*}
 */
export function form_connector( FormComponent, formMeta ){

  const connector = React.createClass({
    getInitialState(){
      const form = createForm(formMeta)
      registerValidationHandler(form.name, this.onValidation)
      registerDisplayChangeHandler(form.name, () => {
        this.forceUpdate()
      })
      return {
        form
      }

    },

    componentWillUnmount(){
      unRegisterHandlers (formMeta.name)
      removeForm(formMeta.name)
    },

    onValidation( propName, data, params ) {

      const nForm = setIn( this.state.form, ['data', propName], data)
      if ( params && !params.showError ) { data.errorMessage = '' }

      this.setState ({
        submittingError : "",
        form : nForm
      })

    },

    change(propName, showError = false){
      return (value) => {
        valueChange(this.state.form.name, propName, value, { showError })
      }

    },



    render() {
      return <FormComponent {...{...this.props, _change : this.change }} {...this.state} />
    }
  })

  return connector
}

