/**
 *
 * Created by yyt on 16/5/13.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"
module.exports = {

  name : 'workInfoForm',
  properties : {
    title : {
      required : true,
      label : "职务",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    company_name : {
      required : true,
      label : "公司名称",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    company_addr : {
      required : true,
      label : "公司地址",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    company_tel : {
      required : true,
      label : "公司固话",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    month_income : {
      required : true,
      label : "月收入",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    }
  },
}
