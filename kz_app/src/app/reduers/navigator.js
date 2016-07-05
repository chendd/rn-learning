/**
 *
 * Created by weimeng on 16/4/20.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 *
 */


import {
  NAVIGATOR_CONSUME, 
  NAVIGATOR_PRODUCE,
  NAVIGATOR_SET_INITAL,
  NAVIGATOR_BACK_AND_REFRESH_PREVIOUS,
  NAVIGATOR_RESET
} from "../actions/navigator"

import {PagesConfig as conf} from "common/index"

const initialState = {
  queue : [],
  current : null ,
  lock: false
}


export function navigator (state = initialState, action) {

  let nState = {}
  
  switch(action.type){
    case NAVIGATOR_SET_INITAL : 
      return  {...initialState, current : action.route}
    case NAVIGATOR_CONSUME:
      if(action.current) {
        return {...state, current : action.current , queue : [], lock : false}
      } else {
        return {...state, queue : [], lock : false}
      }
    case NAVIGATOR_PRODUCE:
      if(state.lock) {
        return state
      }
      nState = {...state, lock : true}
      nState.queue.push({
        route : action.route, 
        replace : action.replace, 
        back : action.back, 
        reset : action.reset,
        passProps : action.passProps,
        replaceWithAnimation : action.replaceWithAnimation,
        backAndRefreshPrevious : action.backAndRefreshPrevious})
      return nState
  }
  
  return state
  
}

