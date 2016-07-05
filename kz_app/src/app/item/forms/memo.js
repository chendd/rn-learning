/**
 *
 * Created by weimeng on 16/6/12.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import { INPUT_TYPES } from "common/Form/index"
module.exports = {
  name : "memoForm",
  properties: {
    memo : {
      required : true,
      type : INPUT_TYPES.TextArea,
      placeholder : "写入失物相关的备注(可选)",
      label : '备注(可选)'
    },
  }

}
