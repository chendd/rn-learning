/**
 * Created by weimeng on 16/4/5.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import * as Contract from "../contract/product"

import { mock } from "../service_helpers"
import * as R from "ramda";


const randGet = (arr) => {
  return arr[Math.floor(arr.length * Math.random())]
}

const imgs = [
  'http://img13.360buyimg.com/n7/jfs/t2461/281/145335373/97081/8af73dbf/55f0e80aN532efcae.jpg',
  'http://img14.360buyimg.com/n7/jfs/t2560/177/1418798090/238476/aa7d7e25/572f6384Nde3e023c.jpg',
  "http://img11.360buyimg.com/n7/jfs/t1879/318/1901346163/284074/2a390c92/56809e54Ndf39cb10.jpg",
  "http://img12.360buyimg.com/n7/jfs/t2269/156/2752556311/110186/45c4c1d6/56f3a6a4N8b12f7f5.jpg",
  "http://img10.360buyimg.com/n7/jfs/t1912/281/871017211/122828/967a5a28/56334a5dN44ee2e85.jpg",
  "http://img11.360buyimg.com/n7/jfs/t2443/45/2975552355/336361/1ec28cbd/572bf671N87cff702.jpg",
  "http://img11.360buyimg.com/n7/jfs/t1498/52/751865672/111077/d0c7f763/55a8ac33N79f72f05.jpg"
]
/**
 * 根据类目编号查询类目信息
 * @param cat_id
 * @return Promise
 */
export function get_category_by_cat_id({cat_id}) {
  const params = {cat_id}

  return mock({
    id:1,
    cat_id:1,
    name:"root",
    initial:"r",
    parentId:null,
    sub_cates : [{
      id:2,
      cat_id:2,
      name:"手机",
      initial:"p",
      parent_id:1,
    }, {
      id:3,
      cat_id:3,
      name:"电视",
      initial:"p",
      parent_id:1,
    }, {
      id:4,
      cat_id:4,
      name:"包包",
      initial:"p",
      parent_id:1,
    }, {
      id:5,
      cat_id:5,
      name:"打火机",
      initial:"p",
      parent_id:1,
    }, {
      id:6,
      cat_id:6,
      name:"汽车",
      initial:"c",
      parent_id:1,
    }]
  })
}


/**
 * 根据用户id查询已购买商品信息
 * @type {string}
 */
export function get_commodity_by_user_id({user_id}) {

  const params = {user_id}
  return mock([
    {
      "id": 1,
      "name": "some A product",
      "min_price": 100,
      "max_price": 1000,
      "thumb":"商品缩略图"
    },
    {
      "id": 1,
      "name": "some A product",
      "min_price": 100,
      "max_price": 1000,
      "thumb":"商品缩略图"
    },
    {
      "id": 1,
      "name": "some A product",
      "min_price": 100,
      "max_price": 1000,
      "thumb":"商品缩略图"
    },
    {
      "id": 1,
      "name": "some A product",
      "min_price": 100,
      "max_price": 1000,
      "thumb":"商品缩略图"
    },

  ])
}


/**
 * 根据类目编号查询商品信息
 * @type {string}
 */
export function get_commodity_by_cat_id({cat_id}) {
  const params = {cat_id}

  const mockItem = () => {
    const lastName = ["马", "虎", "克", "斯", "豹", "蛟"]
    const firstNames = ['宝', '海', '飞', '迅', '彪']
    const types = [100, 200, 300, 400, 500, 'X1', "X2", "X3", "X4"]
    const name = randGet(firstNames) + randGet(lastName) + randGet(types)
    const img = randGet(imgs) + "?t=" + (Math.floor(new Date().getTime() / 1000))
    return {
      id: 1,
      name: name,
      min_price:100,
      max_price:200,
      thumb:img
    }
  }

  const items = R.range(0, 10).map(mockItem)
  return mock(items, 500)

}


/**
 * 根据商品id查询商品信息
 * @type {string}
 */
export function get_commodity_detail_by_com_id({com_id}) {

  const params = {com_id}
  const thumb =   'http://img14.360buyimg.com/n7/jfs/t784/71/771084802/120703/eeb10073/55474dddN714dbe44.jpg'
  const attrs = {
    '型号' : ['豪华型', '基础型', '越野型', '运动型'],
    '颜色' : ['酒红', '银灰', '褐色']
  }

  const data = {
    id: 1,
    name:"Macbook 2020go",
    desc:"2020 go is a magic product.",
    thumb: thumb,
  }

  data.sku_list = []
  data.attr_list = []

  // 生成属性
  // sku的数目 = 属性的的所有组合
  let i = 0
  for(let key in attrs) {
    i++
    const attr = {
      id : i,
      name : key,
      attr_value_list : []
    }

    let j = 0
    for(let k2 in attrs[key]) {
      j++
      attr.attr_value_list.push({
        id : j,
        attr_id : j,
        value : attrs[key][k2]
      })
    }
    data.attr_list.push(attr)
  }

  // 生成SKU
  // SKU 是属性的笛卡尔积
  function cartProd(paramArray) {
    function addTo(curr, args) {
      var i, copy,
        rest = args.slice(1),
        last = !rest.length,
        result = [];
      for (i = 0; i < args[0].length; i++) {
        copy = curr.slice();
        copy.push(args[0][i]);
        if (last) {
          result.push(copy);
        } else {
          result = result.concat(addTo(copy, rest));
        }
      }
      return result;
    }
    return addTo([], Array.prototype.slice.call(arguments));
  }

  const skus = cartProd(attrs['型号'], attrs['颜色'])

  for(i = 0; i < skus.length; i++) {
    // for (j = 0; j < skus[i].length; j++) {
    //   const sku = skus[i][j] // sku => [attr]
    //
    //   //最后 sku的值是属性值和"_"拼接成字符串
    //   let skuAttrValue = R.map( attr => attr.value, sku ).join("_")

      if ( Math.random() > 0.5) {
        continue
      }

      let skuAttrValue = skus[i]
      data.sku_list.push({
        id : i + 1,
        com_id : i + 1,
        name : data.name + "-" + skuAttrValue,
        thumb : randGet(imgs),
        attr_value : skuAttrValue,
        inventory : "sku库存",
        staging_list : [{
          id : 1,
          title : "100 × 3"
        }, {
          id : 2,
          title : "50 × 6",
        }, {
          id : 3,
          title : "25 × 12"
        }]
      })

    // }
  }

  return mock(data, 300)
  /*

  const data = {
    id: 1,
    name:"Macbook 2020go",
    desc:"2020 go is a magic product.",
    thumb: thumb,
    sku_list:[{
        id: 1,
        com_id: 1,
        name : "豪华型-银灰色",
        thumb:"sku缩略图",
        attr_value:"属性-值组成的json串",
        price:"sku价格",
        inventory:"sku库存"
      },
      {
        "id":"skuId",
        "com_id":"商品id",
        "name":"sku名称",
        "thumb":"sku缩略图",
        "attr_value":"属性-值组成的json串",
        "price":"sku价格",
        "inventory":"sku库存"
      }

    ],
    attr_list:[
      {
        id:1,
        name:"型号",
        attr_value_list:[
          {
            id:1,
            attr_id:1,
            value : "豪华型"
          },
          {
            id:2,
            attr_id: 2,
            value:"基础行"
          },
          {
            id:3,
            attr_id:3,
            value : "越野行"
          },
          {
            id:4,
            attr_id: 4,
            value:"运动型"
          }
        ]
      },
      {
        id: 2,
        name:"颜色",
        attr_value_list:[
          {
            "id":1,
            "attr_id":"1",
            "value":"银灰"
          },
          {
            "id":"2",
            "attr_id":"2",
            "value":"酒红"
          },{
            "id":"3",
            "attr_id":"3",
            "value":"黑色"
          }
        ]
      },
    ],
  }

  return mock(data, 500)
  */

}



/**
 * 根据skuid查询sku详情和类目信息
 */
export const GET_SKU_AND_CATEGORY_DETAIL_BY_SKU_ID = 'get_sku_and_category_detail_by_sku_id'

