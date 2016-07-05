/**
 * Created by weimeng on 16/5/4.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


export const show_poper = (component) => {
  return {
    type : "SHOW_POPER",
    component : component
  }
}

export const hide_poper = () => {
  return {
    type : "HIDE_POPER"
  }
}

export const show_picker = (pickerType, value, onChange, options) => {
  return {
    type : "SHOW_PICKER",
    pickerType : pickerType,
    onChange : onChange,
    initialValue : value,
    options : options
  }
}


export const hide_picker = () => {
  return {
    type : "HIDE_PICKER"
  }
}