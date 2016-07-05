/**
 * Created by weimeng on 16/4/18.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import {KE_SERVICE_ENV} from "common/Config"

const forceMocks = [
]

/**
 * Invoke a service.
 * e.g.
 *
 * @param name service name
 * @param params params
 */
export function call_service(name, ...params) {
  let env = XIN_SERVICE_ENV

  if(forceMocks.indexOf(name) !== -1){
    env = 'mock'
  }

  name = name.toLowerCase()
  if(env === 'mock') {
    if( !mocks[name] ) {
      throw 'mock service ' + name + " undefined."
    }
    return mocks[name].apply(null, params)
  } else if( env === 'dist' ) {
    if( !dists[name] )  {
      throw 'dist service ' + name + " undefined."
    }
    return dists[name].apply(null, params)
  }
}
