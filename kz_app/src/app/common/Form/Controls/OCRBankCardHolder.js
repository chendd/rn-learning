/**
 *
 * Created by weimeng on 16/5/15.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */


import React, { Component } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
  Image,
  InteractionManager
} from 'react-native'


import {
  W,
  grey,
  dark,
  orange,
  lightGrey,
  ProgressView,
  TITLE_ERROR
} from 'common/index'



import {connect} from 'react-redux'
import Toast from 'react-native-sk-toast'



export class OCRBankCardHolder extends Component {

  constructor(props){
    super(props)
    this._ocr = this._ocr.bind(this)
    this.state = {
      data : props.value,
      loading : false,
    }
  }
  componentDidMount(){
    


  }
  componentWillReceiveProps(nextProps) {

    
    this.state.data = nextProps.value

  }
  
  formatNumber(number){
    const map = []
    for(let i = 0; i < number.length ; i++ ) {
      let c = number[i]
      map.push( (i + 1) % 4 === 0 ? c + " " : c);
    }
    return map.join('').trim()
  }

  _ocr(){

    const {data} = this.state


    this.setState( {
      loading : true
    })
    InteractionManager.runAfterInteractions( (() => {
      const promise = NativeModules.OCRBankCard.show()
        .then( (data => {

          console.log('data', data)
          this.setState({
            loading : false,
            data : {
              number : data.number,
              spacedNumber : this.formatNumber(data.number),
              image : data.image
            }
          }, (() => {

            this.props.onChange({number : data.number, spacedNumber : this.state.data.spacedNumber, image : data.image})
          }).bind(this))
        }).bind(this))
        .catch( (e => {
          if(e.code == "1000") {
            Toast.center(e.message)
          }
          this.setState({
            loading : false
          })
          /* Alert.alert(TITLE_ERROR, e.message)*/
        }).bind(this))
    }).bind(this))


  }

  render(){
    const { data, loading } = this.state
    console.log('render with', data ? data.spacedNumber : "", loading)
    if(loading) {
      return <View style={styles.container}>
        <ProgressView style={styles.progress} />  
      </View>  
      
    }
    return (
      <View style={styles.container}>
        <View>
            <View style={styles.titleBar}>
              <Text style={styles.titleText}>支持的</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>银行卡列表</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View>
          <TouchableOpacity onPress={this._ocr}>
            {
              !data ?
                <View style={styles.scanBox}>
                  <Text style={styles.scanBoxText}>点击此处扫描银行卡</Text>
                </View>
                :
                <View style={styles.cardBox}>
                  <Image source={{uri : data.image}} style={styles.card} resizeMode='contain'/>
                  <View>
                    <Text>{data.spacedNumber}</Text>
                  </View>
                </View>
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  progress : {
    height : 100,  
  },
  titleBar : {
    marginTop: 4,
    flexDirection : 'row',
    height : 40,
    alignItems : 'center'
  },
  titleText : {
    color : grey
  },
  linkText : {
    color : orange
  },
  scanTitle : {
    height : 30,
    alignItems : 'center',
    justifyContent : 'center'
  },
  cardBox : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    margin : 10,
  },
  scanBox : {
    flex : 1,
    height : 120,
    borderWidth : 2,
    borderColor : lightGrey,
    borderStyle : 'dashed',
    justifyContent : 'center',
    alignItems : 'center',
    marginRight : 20,
    marginBottom : 10
  },
  numberContainer : {
    justifyContent : 'center',
    alignItems : 'center',  
  },
  scanBoxText : {
    color : grey,
  },
  card : {
    width : W * 0.8,
    height : W * 0.5 * 0.6305
  }

})

