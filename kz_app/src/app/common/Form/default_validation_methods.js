/**
 *
 * Created by weimeng on 16/3/10.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */




export const mobile = {
  regexOrCallback : /^1[3|4|5|7|8][0-9]\d{8}$/,
  defaultMessage : "手机号码格式不正确"
}

export const telephone = {
  regexOrCallback : /^0\d{2,3}-?\d{7,8}$/,
  defaultMessage : "固定电话号码格式不正确"
}

export const postCode ={
  regexOrCallback : /^[1-9][0-9]{5}$/,
  defaultMessage : "邮编格式不正确"
}

export const email = {
  regexOrCallback : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  defaultMessage : "e-mail格式不正确"
}

export const url = {
  regexOrCallback : /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
  defaultMessage : "URL格式不正确"
}

export const date = {
  regexOrCallback : ( value ) => {
    return !/Invalid|NaN/.test(new Date(value).toString())
  },
  defaultMessage : "日期格式不正确"

}

export const idCard = {
  regexOrCallback : (value) => {
    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];

    function idCardValidate(idCard) {
      idCard = $.trim(idCard);
      if (idCard.length == 15) {
        return validity15(idCard);
      }
      ;
      if (idCard.length == 18) {
        return validity18(idCard);
      }
      ;
      return false;
    };

    function validity15(idCard) {
      var year = parseInt(idCard.substring(6, 8), 10);
      var month = parseInt(idCard.substring(8, 10), 10);
      var day = parseInt(idCard.substring(10, 12), 10);

      var temp_date = new Date(year, month - 1, day);
      if (
        temp_date.getYear() != year ||
        temp_date.getMonth() != month - 1 ||
        temp_date.getDate() != day
      ) {
        return false;
      }
      return true;
    };

    function validity18(idCard) {
      function validity(idCard) {
        var year = parseInt(idCard.substring(6, 10), 10);
        var month = parseInt(idCard.substring(10, 12), 10);
        var day = parseInt(idCard.substring(12, 14), 10);
        var temp_date = new Date(year, month - 1, day);
        if (
          temp_date.getFullYear() != year ||
          temp_date.getMonth() != month - 1 ||
          temp_date.getDate() != day
        ) {
          return false;
        }
        return true;
      };
      var result = validity(idCard);
      if (result) {
        var nums = idCard.split("");
        var sum = 0;
        if (nums[17].toLowerCase() == 'x') {
          nums[17] = 10;
        }
        ;
        for (var i = 0; i < nums.length - 1; i++) {
          sum += Wi[i] * parseInt(nums[i], 10);
        }
        ;
        var position = sum % 11;
        if (nums[17] == ValideCode[position]) {
          return true;
        }
        return false;
      }
      return false;
    };
    return idCardValidate( value );
  },
  defaultMessage : "请输入合法的身份证号"
}


export const string = {
  regexOrCallback : ( value, { minLength, maxLength } ) => {
    const len = value ? value.length : 0
    if ( !nullOrUdef(minLength) && len < minLength ) {
      return false
    }

    if ( !nullOrUdef(maxLength) && len > maxLength) {
      return false
    }
    return true
  },
  defaultMessage : ( {minLength, maxLength} ) => {
    if ( nullOrUdef(minLength) && nullOrUdef(maxLength) ) {
      return 'undefined error'
    }

    else if( nullOrUdef(minLength)) {
      return "请最多输入" + maxLength + "个字符"

    } else if( nullOrUdef(maxLength) ) {
      return "请至少输入" + minLength + "个字符"
    } else {
      return "请输入" + minLength + "至"  + maxLength + "个字符"
    }

  }
}

/* 数字验证 */
// 整数 : Integer  非负整数用 Integer && minValue = 0 表示, 正整数用 Integer && minValue = 1表示
// 浮点数: Float 浮点数 ,,
//
function nullOrUdef( value ) {
  return value === undefined || value === null
}
export const integer = {
  regexOrCallback : ( value, {minValue, maxValue} ) => {
    if( !/^\d*/.test(value) ) {
      return false
    }

    if( !nullOrUdef(minValue) && value < minValue ) {
      return false
    }

    if( !nullOrUdef(maxValue) && value > maxValue ) {
      return false
    }
    return true
  } ,
  defaultMessage : ( {minValue, maxValue} ) => {
    if( minValue === 0 && ( nullOrUdef(maxValue) )) {
      return '请输入非负整数'
    }
    else if( minValue === 1 && ( nullOrUdef(maxValue) )) {
      return '请输入正整数'
    }
    else if( minValue && ( nullOrUdef(maxValue) ) ) {
      return '请输入大于' + minValue + "的整数"
    }
    else if ( nullOrUdef(minValue) && maxValue) {
      return '请输入小于' + maxValue + "的整数"
    }
    else{
      return `请输入${minValue}到${maxValue}之间的整数`
    }
  }
}


export const floatNumber = {
  regexOrCallback : ( value, {minValue, maxValue, currency} ) => {

    if( !/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value) ) {
      return false
    }

    if( !nullOrUdef(minValue) && value < minValue ) {
      return false
    }

    if( !nullOrUdef(maxValue) && value > maxValue ) {
      return false
    }

    if ( currency ) {
      if ( value.toString().split(".").length === 2 ) {
        if( value.toString().split(".").pop().length > 2 ) {
          return false
        }
      }
    }

    return true
  } ,
  defaultMessage : ( {minValue, maxValue, currency} ) => {
    if( minValue === 0 && ( nullOrUdef(maxValue) )) {
      return '请输入非负数'
    }
    else if( minValue === 1 && ( nullOrUdef(maxValue) )) {
      return '请输入正数'
    }
    else if( minValue && ( nullOrUdef(maxValue) ) ) {
      return '请输入大于' + minValue + "的数字"
    }
    else if ( nullOrUdef(minValue) && maxValue) {
      return '请输入小于' + maxValue + "的数字"
    }
    else{
      return `请输入${minValue}到${maxValue}之间的数字`
    }


    if(currency) {
      if ( value.toString().split(".").length === 2 ) {
        if( value.toString().split(".").pop().length > 2 ) {
          return "小数点后面最多两位"
        }
      }
    }
  }
}
