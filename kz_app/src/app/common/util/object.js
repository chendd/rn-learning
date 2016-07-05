/**
 *
 * Created by weimeng on 16/3/23.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

/**
 * Change value in depth, make a smallest copy.
 * Make the object immutable.
 *
 * @param oldObject
 * @keyPath
 * @value
 * @firstTime first time run setIn
 */
export function setIn(oldObject, keyPath, value, firstTime = true) {

  if( !oldObject ) { oldObject = {} } // create object
  let obj = firstTime ?  { ...oldObject } : oldObject

  if( keyPath.length === 1) {
    if ( !firstTime ){
      obj = { ...oldObject }
    }
    obj[keyPath] = value
    return obj
  }

  const first = keyPath.shift()
  obj[first] = setIn( obj[first], keyPath, value, false)
  return obj
}

