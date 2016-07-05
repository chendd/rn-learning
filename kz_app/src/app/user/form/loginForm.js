/**
 *
 * Created by weimeng on 16/5/9.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"
module.exports = {

  name : 'loginForm',
  properties : {
    mobile_phone : {
      required : true,
      validation_methods : [
        { type : "mobile"}  
      ], 
      label : "手机号",
      type : INPUT_TYPES.PhoneInput
    },
    password : {
      required : true,
      label : "登录密码",
      type : INPUT_TYPES.Password
    },
  }
}

