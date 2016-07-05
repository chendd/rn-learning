/**
 *
 * Created by weimeng on 16/4/20.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import invariant from 'invariant'



/**
 * Produce a navigation event
 * @type {string}
 */
export const NAVIGATOR_PRODUCE = "xin@NAVIGATOR_PRODUCE"

/**
 *
 * Consume a navigation event
 * @type {string}
 */
export const NAVIGATOR_CONSUME = "xin@NAVIGATOR_CONSUME"


/**
 * Set the initial navigator
 * @type {string}
 */
export const NAVIGATOR_SET_INITAL = "xin@NAVIGATOR_SET_INITIAL"


export const NAVIGATOR_RESET = 'xin@NAVIGATOR_RESET'


export const NAVIGATOR_BACK_AND_REFRESH_PREVIOUS = 'xin@NAVIGATOR_BACK_AND_REFRESH_PREVIOUS'


/**
 * Action creator to produce a navigation event.
 * @param route a route : route := route => {name, component}
 */
export const navTo = (route, passProps, replace = false) => {
  invariant(route, "navTo fail, argument route is required")
  invariant(route['name'], 'navTo fail, route must have child prop name')
  invariant(route['Component'], 'navTo fail, route must have child prop Component')
  passProps = passProps || {}
  return dispatch => {
    requestAnimationFrame( () => {
      dispatch({
        type: NAVIGATOR_PRODUCE,
        route: {...route, passProps},
        replace : route.replace || replace
      })
    })

  }

}


/**
 * nav back and refresh previous page
 */
export const navBackRefreshPrevious = () => {

  return {
    type : NAVIGATOR_PRODUCE,
    backAndRefreshPrevious : true
  }
}

export const navReplaceWithAnimation = (route, passProps) => {
  return {
    type : NAVIGATOR_PRODUCE,
    route : {...route, passProps},
    replaceWithAnimation : true
  }
}



export const setInitial = (route) => {
  return {

    type : NAVIGATOR_SET_INITAL,
    route : route
  }  
}
/**
 * Action creator to producer a navigation back event.
 */
export const navBack = (passProps) => {
  return dispatch => {
    requestAnimationFrame ( () => {
      dispatch({
        type : NAVIGATOR_PRODUCE,
        back : true,
        passProps 
      })
    })
  }

}


/**
 * Action creator to consume all events in queue.
 */
export const navConsumeAll = (current) => {
    return {
        type: NAVIGATOR_CONSUME,
        current
    }
}


export const reset = (route, passProps) => {
  passProps = passProps || {}
  return {
    type : NAVIGATOR_PRODUCE,
    route : {...route, passProps},
    reset : true
  }
}