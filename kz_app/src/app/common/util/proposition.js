/**
 * Created by weimeng on 16/3/30.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


/*
import { assert } from 'chai'
import { call_service } from "../service/service_caller"

export const success = ( done ) => {
  return data => {
    if(data.errorMessage)
      console.log(data)
    if( done )
      done()
  }
}
export const no_error = ( data ) => {
  setTimeout( () => {
    assert.equal(null, data)
  })
}

export const service_available = (done, name, ...params) => {
  call_service.apply(null, [name, ...params])
    .then(success(done))
    .catch(success(done))

}
*/