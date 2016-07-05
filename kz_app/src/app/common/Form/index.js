/**
 *
 * Created by weimeng on 16/3/23.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import { setIn } from "../util/object"
import * as VMethods from "./default_validation_methods"
import invariant from "invariant";
import {
  Alert
} from 'react-native'

import Toast from 'react-native-sk-toast'

export const INPUT_TYPES =  {
  RegionPicker : "RegionPicker",
  SWITCH : "Switch",
  TextInput : "TextInput",
  NumTextInput : "NumTextInput",
  PhoneInput : "PhoneInput",
  CheckGroup : "CheckGroup",
  Picker : "Picker",
  Password : "Password",
  SMSVerifyCode : "SMSVerifyCode",
  OCRBankCardHolder : "OCRBankCardHolder",
  Image : "Image",
  TextArea : "TextArea"
}

const forms = {

}
/**
 * Create a form
 */
export const createForm = ( meta, initialData ) => {
  if ( !forms[ meta.name ] ) {
    const { name, properties, groups } = meta
    const data = create_default_value( meta.properties, initialData )
    forms[ name ] = {
      name,
      data,
      groups,
      properties
    }
  }
  return forms[ meta.name ]
}


export const removeForm = (formName) => {
  if(forms[formName])
    delete forms[formName]  
}

/**
 * Handlers fires after validation
 * @param formName
 * @param handler
 */
export const registerValidationHandler = (formName, handler ) => {
  const form = forms[ formName ]
  if ( !form.validationHandlers) {
    form.validationHandlers= []
  }
  form.validationHandlers.push( handler )
}


/**
 * Handlers fires after date changed.
 */
export const registerDataChangeHandler = (formName, handler) => {
  const form = forms[ formName ]
  if ( !form.dataChangeHandlers) {
    form.dataChangeHandlers= []
  }
  form.dataChangeHandlers.push( handler )
}


/**
 * Handlers fires when hidden changed
 * @param formName
 * @param handler
 */
export const registerDisplayChangeHandler = (formName, handler) => {
  
  const form = forms[ formName ]
  
  if ( !form.displayChangeHandlers) {
    form.displayChangeHandlers= []
  }
  form.displayChangeHandlers.push( handler )
}


export const unRegisterHandlers = (formName) => {
  if(!form) {
    return
  }
  const form = forms[ formName ]
  delete form.displayChangeHandlers
  delete form.validationHandlers
  delete form.dataChangeHandlers
}


export const unRegisterDisplayHandler = (formName) => {
  const form = forms[ formName ]
  if(!form) {
    return
  }
  form.displayChangeHandlers = []
}

export const triggerDisplayChanged = (formName) => {

  const form = forms[ formName ]
  for(let i = 0; i < form.displayChangeHandlers.length ; i++)
    form.displayChangeHandlers[i]()
}

/**
 * Change value and validate
 * @param formName
 * @param fieldName
 * @param newValue
 * @param params
 */
export const valueChange = ( formName, propName, newValue, params ) => {
  const form = forms[ formName ]
  if( !form ) {
    throw formName + " not created."
  }

  const meta = form.properties[propName]
  if(meta.editable === false){
    return
  }
  const data = form.data[propName]

  if(form.dataChangeHandlers) {
    for(let i = 0 ; i< form.dataChangeHandlers.length ; i++) {
      form.dataChangeHandlers[i](propName, data.value, newValue)
    }
  }

  data.value = newValue

  if(!(newValue === null || newValue === undefined || newValue === '')) {
    data.dirty = true
  }
  for(let i = 0; i < form.displayChangeHandlers.length ; i++)
    form.displayChangeHandlers[i]()
  //validate_field( formName, propName, params  )
}



function validate_field( formName, propName, params  ){
  const form = forms[ formName ]
  const meta = form.properties[propName]
  const data = form.data[propName]
  const value = data.value

  if( meta.required ) {
    
    const s_value = value ? (typeof value === 'string' ? value.trim() : value) : value 
    if( s_value === null || s_value === undefined || s_value === '' ) {
      data.errorMessage = meta.emptyMessage || "请输入" + meta.label
      data.valid = false
    } else {
      data.errorMessage = ''
      data.valid = true
    }
  }

  if( meta.validation_methods ) {
    let preset_methods = VMethods
    for(let method of meta.validation_methods ) {

      const preset = preset_methods[ method.type ]

      if(!preset) {
        throw 'unknow validate method type ' + method.type
      }

      let type = Object.prototype.toString.call( preset.regexOrCallback )

      let valid = false
      if( type === "[object RegExp]") {
        valid = preset.regexOrCallback.test( value )
      }
      else if (type === "[object Function]") {
        valid = preset.regexOrCallback( value, method.params )
      }
      else {
        throw "unknow validation method type: " + type
      }

      if( valid ) {
        data.valid = true
        data.errorMessage = ''
      } else {
        data.valid = false
        let defaultMessage = preset.defaultMessage

        if( typeof preset.defaultMessage !== 'string' ) {
          defaultMessage = preset.defaultMessage( method.params )
        }
        data.errorMessage = method.errorMessage || defaultMessage
        break
      }
    }
  }

  if ( form.validationHandlers) {
    for(let i = 0; i < form.validationHandlers.length; i++ ) {
      form.validationHandlers[ i ] ( propName, data, params )
    }
  }


}

/**
 * Validate all fields
 * @param formName
 * @param params
 */
export const validate = ( formName, params  ) => {
  const form = forms[ formName ]
  for(let key in form.data ) {
    validate_field( formName, key, params )
  }
}


/**
 * return false is any validation error
 * @param formName
 */
export const hasValidationError = ( formName ) => {

  const form = forms[ formName ]
  for(let key in form.data ) {
    const data = form.data[key]
    if ( !(data.valid || data.hidden) ) {
      return true
    }
  }
  return false
}


/**
 * Get all values
 * @param formName
 */
export const getFormValues = ( formName ) => {

  const form = forms [ formName ]

  const n = {}
  for (let key in form.data ) {
    n[key] = form.data[key].value
  }
  return n
}


/**
 *
 * set the hidden attribute to false ...
 * show items
 * @param formName
 * @param itemNames
 */
export const showFormItems = (formName, itemNames) =>{
  const form = forms[ formName ]
  for(let key in form.data) {
    if( itemNames.indexOf(key) != -1 ) {
      form.data[key].hidden = false
      for(let i = 0 ; i< form.displayChangeHandlers.length ; i++) {
        form.displayChangeHandlers[i](key)
      }
    }
  }
}


/**
 * set hidden attribute to true
 * @param formName
 * @param itemNames
 */
export const hideFormItems = (formName, itemNames) => {
  const form = forms[ formName ]
  for(let key in form.data) {
    if( itemNames.indexOf(key) != -1 ) {
      form.data[key].hidden = true
      for(let i = 0 ; i< form.displayChangeHandlers.length ; i++) {
        form.displayChangeHandlers[i](key)
      }
    }
  }
}


/**
 * Helper to submit form
 * e.g
 * submitHelper('..someForm', data => {
 *    .... Process data here
 * });
 * @param formName
 * @param callback
 */
export const submitHelper = (formName, callback ) => {

  invariant(formName, 'form name is needed')
  invariant(callback, 'callback is needed')
  invariant(typeof callback === 'function', 'callback must be a function')

  validate(formName)
  if(hasValidationError(formName)) {

    for(let key in forms[formName].data) {
      const meta = forms[formName].properties[key]
      const data = forms[formName].data[key]
      //meta.alertError
      if(data.errorMessage && !data.hidden) {
        Toast.center(data.errorMessage)
        break
      }

    }

    return false
  }

  callback(getFormValues(formName))
}


function create_default_value( properties, initialData ){
  initialData = initialData || {}
  const data = {}
  for( let propName in properties ) {
    if( properties.hasOwnProperty(propName) ) {
      let prop = properties[propName]
      data[propName] = {
        value : initialData[propName] || prop.defaultValue || null,
        dirty : false,
        valid : false,
        hidden : !!prop.hidden
      }
    }
  }
  return data
}
