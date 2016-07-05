/**
 * Created by weimeng on 16/4/26.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"


let toggle = true

module.exports = {
  name : 'familyStatusForm',
  properties : {
    marriage_status : {
      required : true,
      label : "婚姻状态",
      type : INPUT_TYPES.CheckGroup,
      multi : true,
      options : {
        "0" : "未婚",
        "1" : "已婚",
        "2" : "其他"
      },
      defaultValue : "0"
    },
    spouse_name: {
      required : true,
      type : INPUT_TYPES.TextInput,
      label : "配偶姓名",
      placeholder : "请填写配偶姓名",
      hidden : true
    },
    spouse_phone : {
      required : true,
      type : INPUT_TYPES.TextInput,
      label : "配偶电话",
      placeholder : "请填写配偶电话",
      hidden : true
    },
    children_num : {
      required : true,
      type : INPUT_TYPES.CheckGroup,
      label : "有无子女",
      multi : false,
      options : {
        1 : '有',
        0 : "无"
      },
      defaultValue: 0 
    },

    family_addr : {
      required : true,
      type : INPUT_TYPES.TextInput,
      label : "家庭住址",
      placeholder : "请填写"
    },

    parent_name : {
      required : true,
      type : INPUT_TYPES.TextInput,
      label : "父/母姓名",
      placeholder : "请填写"
    },

    parent_phone : {
      required : true,
      type : INPUT_TYPES.PhoneInput,
      label : "父/母电话",
      placeholder : "请填写"
    },
    kinship_name : {
      required : true,
      type : INPUT_TYPES.TextInput,
      label : "亲属姓名",
      placeholder : "请填写",
      hidden : true
    },

    kinship_phone : {
      required : true,
      type : INPUT_TYPES.PhoneInput,
      label : "亲属电话",
      placeholder : "请填写",
      hidden : true
    }

  },
  groups : [
  {
    hint : "请正确填写家庭信息，会影响你的申请结果",
    range : ["marriage_status", "children_num"]
  },
  {
    range : ["family_addr", "kinship_phone"]
  }, {
    button : {
      getText : () => {
        return toggle ? "无法提供父母联系方式，点击这里" : '可以提供父母联系方式'
      },
      handler: () => {
        if(toggle) {
          hideFormItems('familyStatusForm', ['parent_name', 'parent_phone'])
          showFormItems('familyStatusForm', ['kinship_name', 'kinship_phone'])
          toggle = !toggle


        } else {
          showFormItems('familyStatusForm', ['parent_name', 'parent_phone'])
          hideFormItems('familyStatusForm', ['kinship_name', 'kinship_phone'])
          toggle = !toggle
        }

        triggerDisplayChanged('familyStatusForm')
      }
    }
  }]
}
