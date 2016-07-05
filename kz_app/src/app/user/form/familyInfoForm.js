/**
 *
 * Created by yyt on 16/5/13.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"
module.exports = {

  name : 'familyInfoForm',
  properties : {
    marriage_status : {
      required : true,
      label : "婚姻状况",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    spouse_name : {
      required : true,
      label : "配偶姓名",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    spouse_phone : {
      required : true,
      label : "配偶电话",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    has_children : {
      required : true,
      label : "有无子女",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    family_addr : {
      required : true,
      label : "家庭住址",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    parent_name : {
      required : true,
      label : "父母姓名",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    parent_phone : {
      required : true,
      label : "父母电话",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    kinship_name : {
      required : true,
      label : "亲属姓名",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    },
    kinship_phone : {
      required : true,
      label : "亲属电话",
      type : INPUT_TYPES.TextInput,
      editable: false,
      defaultValue: ''
    }
  },
}
