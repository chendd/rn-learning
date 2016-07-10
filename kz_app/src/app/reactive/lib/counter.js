/**
 * 
 * ramroll on 16/7/10.
 */


// M 
let c = 1


import {trigger} from './event'



// F_modle  接收 Intent,更新模型
export const setValue = (value /* Intent */) => {
 trigger("counter-changed", value)
 c = value 
}

export const getValue = () => {
 return c
}
