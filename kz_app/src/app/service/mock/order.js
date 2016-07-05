/**
 * Created by weimeng on 16/4/5.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

import {mock} from "service/service_helpers"

export const order_get = () => {

  const data = {
    "orderList": [
      {
        "order_id": "1",
        "total_price": 10000,
        "monthRepay": 1000,
        "terms": 10,
        "status": "审核中",
        "order_time": "2012-04-23T18:25:43.511Z",
        "loan_status": "审核中",
        "product_id": "111",
        "product_name": "iphone119",
        "sku_id": "111",
        "thumb": "http://image.xinfenqi.com/test/thumb4u.jpg",
        "attr_value": "{\"颜色\":\"红色\"}"
      },
      {
        "order_id": "2",
        "total_price": 10000,
        "monthRepay": 1000,
        "terms": 10,
        "status": "审核中",
        "order_time": "2012-04-23T18:25:43.511Z",
        "loan_status": "审核中",
        "product_id": "111",
        "product_name": "iphone119",
        "sku_id": "111",
        "thumb": "http://image.xinfenqi.com/test/thumb4u.jpg",
        "attr_value": "{\"颜色\":\"红色\"}"
      },
    ]
  }
  
  return mock(data, 1000)
  

}

export const order_process_detail = ({order_sn}) => {
  const data = {
    "order_sn":"2",
    "total_price":10000,
    "status":"审核中",
    "order_time":"2012-04-23T18:25:43.511Z",
    "loan_status":"审核中",
    "product_id":"111",
    "product_name":"iphone119",
    "sku_id":"111",
    "thumb":"http://image.xinfenqi.com/test/thumb4u.jpg",
    "attr_value":"{\"颜色\":\"红色\"}",
    "order_records":[
      {
        "status":"审核中",
        "date":"2012-04-23T18:25:43.511Z"
      },
      {
        "status":"审核中",
        "date":"2012-04-23T18:25:43.511Z"
      }
    ]
  }

  return mock(data, 100)
}
  

export const order_detail = ({order_sn}) => {
  const data = {
    "order_sn":"2",
    "total_price":10000,
    "status":"审核中",
    "order_time":"2012-04-23T18:25:43.511Z",
    "loan_status":"审核中",
    "product_id":"111",
    "product_name":"iphone119",
    "sku_id":"111",
    "thumb":"http://image.xinfenqi.com/test/thumb4u.jpg",
    "attr_value":"{\"颜色\":\"红色\"}",
    "repay_plans":[
      {
        repaid_amount:10000,
        repay_amount:10000,
        repay_time:"2012-04-23T18:25:43.511Z"
      },
      {
        repaid_amount:10000,
        repay_amount:10000,
        repay_time:"2012-05-23T18:25:43.511Z"
      }
    ]
  }

  
  return mock(data, 1000)
}


/**
 * 订单签约
 * @param order_sn
 * @param accept
 */
export const order_user_sign = ({order_sn, accept}) => {

  return mock({
    status : 0
  }, 500)
}


export const order_sett_detail = ({order_sn}) => {

  return mock({
    app_no : "123",
    order_sn : order_sn,
    buy_time : "2015-01-25",
    staging_times  : "12",
    repay_amount : 1000,
    repay_interest_amt : 12,
    loan_amount : 10000,
    overdue_day : 0,
    overdue_amount : 0,
    over_interest_amt : 0,
    overdue_penalty : 0,
    repaid_times : 3,
    repay_times : 9,
    staging_pass_time : 12,
    first_repay_time : "2015-03-27",
    loan_status : "还款中",
    sett_results : [{
      app_no : "2222",
      order_sn : order_sn,
      product_name : "iphone 6s",
      apply_date : "2015-03-21",
      period_no : '12',
      pay_date : "2015-03-28",
      over_status : 0,
      pay_status : 0,
      should_repay_amount : 1010,
      repaid_amount : 1000,
      remain_repay_amount : 100 
    }]

  }, 500)
}


export const customer_sett_detail = () => {


  
  const makSettList = () => {
    const getItem = () => {

      const should_repay_amount = Math.floor(Math.random() * 5000) + 5000
      const remain_repay_amount = Math.floor(Math.random() * 5000 )
      return {
        app_no : '123123',
        order_sn : "123123",
        product_name : "iphone 6s",
        apply_date : '2015-03-01',
        period_no : "12",
        pay_date : "2015-03-15",
        over_status : 0,
        should_repay_amount ,
        remain_repay_amount,
        repaid_amount : should_repay_amount - remain_repay_amount
      }

    }
    
    const list = []
    for(var i = 0; i < 5; i++) {
      list.push(getItem())
    }
    return list
  }

  const makeSettlement = (year_month) => {

    const should_repay_amount = Math.floor(Math.random() * 5000) + 5000
    const remain_repay_amount = Math.floor(Math.random() * 5000 )
    return {
      year_month,
      repay_day : '15',
      should_repay_amount,
      remain_repay_amount,
      repaid_amount : should_repay_amount - remain_repay_amount,
      sett_results : makSettList()
    }
  }

  const data = {
    customer_id : 100,
    repay_day : '15',
    samount: "10000",
    sett_list : [
      makeSettlement('2015/06'),
      makeSettlement('2015/05'),
      makeSettlement('2015/03'),
      makeSettlement('2015/02'),
      makeSettlement('2015/01'),
      makeSettlement('2014/12'),
      makeSettlement('2014/11'),
      makeSettlement('2014/10'),
      makeSettlement('2014/9'),
    ]

  }

  return mock(data, 500)
}