/**
 *
 * Created by weimeng on 16/5/9.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"
module.exports = {

  name : 'forgetPasswordForm',
  properties : {
    mobile_phone : {
      required : true,
      label : "手机号",
      type : INPUT_TYPES.PhoneInput
    },
    check_code : {
      required : true,
      label : "验证码",
      type : INPUT_TYPES.SMSVerifyCode
    }
  }
}

