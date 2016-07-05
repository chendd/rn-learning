/**
 * Created by weimeng on 16/2/18.
 */

import { Dimensions } from 'react-native';

const styles = {
  container : {
    flexDirection : 'row',
    alignItems : 'flex-start'
  },
  item : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth : 1
  }
}

export class NPara {
  constructor(n, options = {}){
    this.n = n
    if(options.square){
      const {width , height} = Dimensions.get('window');
      this.unitHeight = width / this.n
    }
  }

  getContainerStyle() {
    const nStyle = {...styles.container, flex : this.n}
    return nStyle
  }

  getItemStyle(i, _styles){
    const nStyle = {...styles.item, ..._styles}
    if(_styles.margin){
      nStyle.margin = _styles.margin
      if(i === (this.n  - 1)){
        nStyle.marginRight = _styles.margin
        //nStyle.marginLeft = 0
      } else {
        nStyle.marginRight = 0
        nStyle.marginLeft = _styles.margin
      }
    }

    if(this.unitHeight){
      nStyle.height = this.unitHeight
    }
    return nStyle
  }
}