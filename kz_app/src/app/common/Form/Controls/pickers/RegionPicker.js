/**
 * Created by weimeng on 16/5/4.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import MultiPickerAbstract from "./MultiPickerAbstract"
import R from 'ramda'
import china from "../../data/region"

const mapper = R.map( (data) => {
  return {
    REGION_NAME : data.REGION_NAME,
    REGION_CODE: data.REGION_CODE
  }
})


const findSubAreasByCode = (code) => {
  return item => {
    return code === item.REGION_CODE
  }
}


class RegionPicker extends MultiPickerAbstract{
  constructor(props){
    super(props)
  }

  getInitialData () {
    const value = this.props.value || {}
    let { province, city, district } = value
    province = province || '110000'
    city = city || '110100'
    district = district || '110101'

    const p = R.head(R.filter( findSubAreasByCode(province), china.subAreas))
    const c = R.head(R.filter( findSubAreasByCode(city), p.subAreas))
    p.subAreas[0]
    const initial = {
      data : {
        province: mapper(china.subAreas),
        city : mapper(p.subAreas),
        district : mapper(c.subAreas)
      },
      selection : {
        province: province,
        city  : city,
        district : district
      }
    }
    return initial
  }


  next( selection ) {

    const oldSelection = this.props.value || {}
    if(oldSelection.province !== selection.province) {
      const p = R.head(R.filter(findSubAreasByCode(selection.province), china.subAreas))
      const c = p.subAreas[0]
      const d = c.subAreas[0]
      return {
        data : {
          province: mapper(china.subAreas),
          city: mapper(p.subAreas),
          district : mapper(c.subAreas)
        },
        selection : {
          province : selection.province,
          city : p.subAreas[0].REGION_CODE,
          district : d.REGION_CODE
        }
      }
    }

    else if(oldSelection.city !== selection.city ) {

      const p = R.head(R.filter(findSubAreasByCode(selection.province), china.subAreas))
      const c = R.head(R.filter(findSubAreasByCode(selection.city), p.subAreas))
      return {
        data : {
          province : this.state.province,
          city : this.state.city,
          district : mapper(c.subAreas)
        },
        selection : {
          province: oldSelection.province,
          city : selection.city,
          district : c.subAreas[0].REGION_CODE
        }
      }
    }
    else if(oldSelection.district !== selection.district ) {
      return {
        data : this.state,
        selection : {...oldSelection, district : selection.district}
      }
    }

    return false
  }

  normalize(list){
    return R.map( item => {
      return {
        label : item.REGION_NAME,
        value : item.REGION_CODE
      }
    }, list)
  }

}

module.exports = RegionPicker 