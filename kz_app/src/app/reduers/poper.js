/**
 * Created by weimeng on 16/5/4.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


const initialState = {
  poper : {
    show : false,
    component : null  
  },
  picker : {
    show : false,  
    pickerType : null,
    onFinished : null
  }
}

export const poper = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_POPER" :
      return {show : true, component : action.component} 
    case "HIDE_POPER" :
      return initialState
    case 'SHOW_PICKER' :
      return {...state, picker : {show : true, pickerType : action.pickerType, onChange : action.onChange, options : action.options}}
    case 'HIDE_PICKER':
      return {...state, picker : {show : false}}
  }
  return state
}