/**
 *
 * Created by yyt on 16/5/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"
module.exports = {

  name : 'personalInfoForm',
  properties : {
    userName : {
      required : true,
      label : "真实姓名",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    userIdentityCard : {
      required : true,
      label : "身份证号",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    }
  }
}
