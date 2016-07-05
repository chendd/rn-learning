/**
 *
 * Created by weimeng on 16/6/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "common/Form/index"

module.exports = {
  name : 'idcard-form',
  properties : {
    no : {
      required : true,
      label : "身份证号",
      placeholder : "请输入身份证号",
      type : INPUT_TYPES.TextInput
    },
    image : {
      required : true,
      label : "点击此处上传身份证照片",
      type : INPUT_TYPES.Image
    }
  }
}
