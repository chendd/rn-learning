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
    success : true
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

### 正确解法
为了解决上述问题， 应该使用es6的asyc语法配合redux-thunk

``` javascript
// file : login.action.js
import {http_get, http_post, jump_to} from 'common/actions'

export const login = (user_name, password) => {
    
    return async dispatch => {
        
        await dispatch ( http_post('/user/login', {user_name, password}) )
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
