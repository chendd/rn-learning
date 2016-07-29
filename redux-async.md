### Redux如何组织连续的操作

假如有这样的一个需求，在用户登录后需要检查用户账户中是否有余额，然后需要如果没有余额需要跳转到充值页面， 如果有余额跳转到首页。 
这是一个非常简单的需求， 但存在几个步骤， 1. 调用登录接口 2. 调用获取用户余额的接口 3. 跳转页面

假设我们所有的操作都在redux内，我们如何处理？ 

### 抽象

#### 需求描述

我们的app在用户登陆时要检查用户的余额，如果有余额，那么让用户去继续使用app，如果没有， 让用户去充值。 

#### 接口描述
用户登录： /user/login 
``` javascript
// 请求方式post
// 返回值 
{
    user_id : 111
}

```
读取余额： /user/account
``` javascript
// 请求方式get
// 返回值
{
    balance : 2000  //余额2000
}
```
#### redux api
为了满足上述需求， 我们的redux里面有若干个方法
http_get, http_post，jump_to


http_get和http_post发送网络请求,  返回promise
jump_to跳转页面， 无返回

### 思考
问题的核心在于用户操作过程中，有少量逻辑需要客户端处理， 而实际需求当中遇到的逻辑可能更为复杂。 目前其实是一个3个步骤+1个逻辑判断。 
随着逻辑的复杂， 每一个地方如果都需要做结果处理和异常处理， 就变得特别复杂。 另外在系统复杂度上升过程中，逻辑如果写在视图里，会让逻辑无法重用。 

总结一下，两点：
1. 首先不能写这样的代码,这样一层一层嵌套下去没完没了，如果需求复杂无穷无尽， 而且每层都要catch异常,非常麻烦。 
``` javascript
dispatch( http_post('/user/login', {user_name, password}) )
  .then( {success} => {
      dispatch( http_get('/user_account') )
          .then( ...)
          // ...
  }) 
  .catch(ex => {
  })
```

2. 其次上述代码应该想办法封装成纯函数（为什么要使用纯函数可以参考函数式变成的书籍 ），不能写在视图里， 否则如果有两个地方要用就要copy来copy去，痛苦无比


### 正确解法
为了解决上述问题， 应该使用es6的asyc语法配合redux-thunk

``` javascript
// file : login.action.js
import {http_get, http_post, jump_to} from 'common/actions'

export const login = (user_name, password) => {
    
    return async dispatch => {
        
        const {user_id} = await dispatch ( http_post('/user/login', {user_name, password}) )
        const {balance} = await dispatch( http_get('/user/account') )
        
        if(balance === 0) {
            dispatch (jump_to("Recharge"))
        } else {
            dispatch (jump_to("Home") )
        }
    }
}


// file : 使用的react组件

...
_press() {
    const {user_name, password} = this.state

    const promise = this.props.dispatch( login(user_name, password) )
    promise.catch( ex => {
        // 显示错误
    })
}
...
```

这样做的好处：
1. 逻辑层是纯函数
2. 逻辑层可以复用
3. 异常在使用曾的catch里面处理， 不用嵌套
4. 扩展性好


### 什么是扩展性好？ 
我们增加一个需求， 比如说在用户登录时需要判断有没有置手势密码， 再充值。 

那么我们需要写一个设置手势密码的函数
``` javascript
export const check_gesture_password = (user_id) => {

   if( !user_has_gesture_password(user_id) ) {
       jump_to("SetGesturePassword")
       return false
   }
   return true

}
```

将来我们可以把这段代码很轻松的加到login里面
``` javascript 
export const login = (user_name, password) => {
    
    return async dispatch => {
        
        const {user_id} = await dispatch ( http_post('/user/login', {user_name, password}) )
        if(!check_gesture_password(user_id)){
            return
        }
        const {balance} = await dispatch( http_get('/user/account') )
        
        if(balance === 0) {
            dispatch (jump_to("Recharge"))
        } else {
            dispatch (jump_to("Home") )
        }
    }
}
```
