/**
 *
 * Created by weimeng on 16/5/9.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"
module.exports = {

  name : 'forgetPasswordStep2Form',
  properties : {

    password : {
      required : true,
      label : "新密码",
      type : INPUT_TYPES.Password
    },
    confirm_password : {
      required : true,
      label : "确认新密码",
      type : INPUT_TYPES.Password
    }
  }
}

