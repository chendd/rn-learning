/**
 *
 * Created by yyt on 16/5/13.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"
module.exports = {

  name : 'bindCardForm',
  properties : {
    card_holder : {
      required : true,
      label : "持卡人姓名",
      type : INPUT_TYPES.TextInput,
      defaultValue: ''
    },
    card : {
      required : true,
      label : "银行卡号",
      type : INPUT_TYPES.OCRBankCardHolder,
      alertError : true,
      defaultValue: ''
    },
    mobile_phone : {
      required : true,
      label : "手机号",
      type : INPUT_TYPES.PhoneInput,
      defaultValue: ''
    },
    check_code : {
      required : true,
      label : "验证码",
      type : INPUT_TYPES.SMSVerifyCode,
      defaultValue: ''
    },
    card_number_for_display : {
      label : "银行卡号",
      type : INPUT_TYPES.TextInput,
      editable : false,
      hidden : true
    },
    bank_name_for_display : {
      label : "银行名称",
      type : INPUT_TYPES.TextInput,
      editable : false,
      hidden : true
    }


  },
}
