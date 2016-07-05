import qs from "qs"
import {
  CancelablePromise
}  from 'common/index'

import {
  XIN_SERVICE_URL,
  XIN_REQ_TIMEOUT
} from 'common/XinConfig'

import {getStore} from "store/configureStore"

/**
 * Mock a successful request
 * @param data
 * @param time
 * @returns {*}
 */
export const mock = ( data, time ) => {

  return new CancelablePromise( (resolve, reject ) => {
    setTimeout( () => {
      resolve( data )
    }, time)
  })
}


/**
 * Mock a logic error
 */
export const mock_fail = ( errorCode, errorMessage, time ) => {

  return new Promise( (resolve, reject ) => {
    setTimeout( () => {
      reject({errorCode, errorMessage})
    }, time)
  })
}


export function service_url ( ) {
  return XIN_SERVICE_URL

}


export const http_get = ( method_name, params ) => {

  const token = getStore().getState().user.token

  const query = {
    method : method_name,
    format : 'json',
    sign : sign(params),
    params : JSON.stringify(params),
    token
  }

  let url = service_url() + "?" + qs.stringify(query)
  const meta = {
    //credentials: 'same-origin'
    timeout : XIN_REQ_TIMEOUT
  }
  //const I = pending_test( url )
  const promise = new CancelablePromise( (resolve, reject) => {

    fetch(url, meta)
      .catch(e => {
        return {status : 404}
      })
      .then(normalize_response(reject) )
      .then(normalize_data(resolve, reject))
      .catch(error => {
      })

  })

  return promise
}



export const http_post = ( method_name , params ) => {
  const token = getStore().getState().user.token
  const query = {
    method : method_name,
    format : 'json',
    sign : sign(params),
    params : JSON.stringify(params),
    token
  }

  let url = service_url()

  /*
   const form = new FormData()
   form.append( 'method', method_name )
   form.append( 'format', 'json')
   form.append( 'params', JSON.stringify(params) )
   form.append( 'sign', sign(params))
   form.append( 'token', token )
   */

  const obj = {
    method : method_name,
    format : "json",
    params : JSON.stringify(params),
    sign : sign(params),
    token : token || ""
  }


  const promise = new CancelablePromise( (resolve, reject) => {
    const meta = {
      method : 'POST',
      body : qs.stringify(obj),
      timeout : XIN_REQ_TIMEOUT,
      headers : {
        'Accept': 'application/json',
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }


    fetch(url, meta)
      .catch(e => {
        return {status : 404}
      })
      .then(normalize_response(reject) )
      .then(normalize_data(resolve, reject))
      .catch(error => {
        console.error(error)
      })

  })
  return promise
}


function sign(params){
  return ""
}

function resolve_url_into_parts( url ) {
  return url.match(/([^/]+)/g)
}

function getFormData( params ) {

  const f = new window.FormData()
  for(let key in params ) {
    if (params.hasOwnProperty(key)) {
      f.append(key, params[key])
    }
  }
  return f
}


function normalize_response( reject) {

  return response => {
    if (response.status >= 200 && response.status < 300 ) {
      return response.json()
    }
    const error = {result_code : -1, error_msg : `[${response.status}]${response.statusText}`}
    reject(error)
  }
}


function normalize_data(resolve, reject) {

  return data => {
    if(!data) { return }
    if (data.result_code !== 0) {
      reject(data)
    }
    else{
      resolve(data.data)
    }
  }
}



function pending_test( url ) {
  let I = setInterval( () => {
    console.error("request is pending ...", url)
  }, 2000)
  return I
}

function stop_pending( I ) {
  return data => {
    clearInterval(I)
    return data
  }
}
