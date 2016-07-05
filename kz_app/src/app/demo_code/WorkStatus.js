/**
 * Created by weimeng on 16/4/26.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { INPUT_TYPES, showFormItems, hideFormItems, triggerDisplayChanged } from "../../common/Form/index"


module.exports = {
  name : 'workingStatusForm',
  properties : {
    company_name: {
      required : true,
      label : "公司名称",
      type : INPUT_TYPES.TextInput,
    },
    title : {
      required : true,
      type : INPUT_TYPES.Picker,
      label : "职务",
      options : [
        {value : "0" , label : "高层管理人员/总监以上/局级以上干部"},
        {value : "1" , label : "中层管理人员/经理以上/科级以上干部"},
        {value : "2" , label : "基层管理人员/主管组长/科员"},
        {value : "3" , label : "工人（包括 生产、加工、建筑和设备操作人员及有关人员）"},
        {value : "4" , label : "销售/中介/业务代表/促销"},
        {value : "5" , label : "商业、服务业人员"},
        {value : "6" , label : "保安/治安/防损"},
        {value : "7" , label : "学生"},
        {value : "8" , label : "个体"},
        {value : "9" , label : "军人"},
        {value : "10" , label : "司机"},
        {value : "11" , label : "退休"},
        {value : "12" , label : "其他"}
      ]
    },
    otherTitle : {
      required : true,
      type : INPUT_TYPES.TextInput,
      label : "",
      hidden : true
    },
    company_tel: {
      required : true,
      type : INPUT_TYPES.PhoneInput,
      label : "公司固定电话",
    },

    company_addr : {
      required : true,
      type : INPUT_TYPES.TextInput,
      label : "公司地址"
    },
    month_income : {
      required : true,
      type : INPUT_TYPES.Picker,
      label : "平均月收入",
      options : [
        {label : '2000以下', value : 1500},
        {label : '2000-3000', value : 2500},
        {label : '3000-5000', value : 4000},
        {label : '5000-10000', value : 7500},
        {label : '10000以上', value : 15000}
      ]
    },
  },
  groups : [
    {
      hint : "请正确填写工作信息，会影响你的申请结果",
      range : ["company_name", "month_income"]
    }
  ]
}


