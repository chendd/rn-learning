import React, {Component} from 'react'
import {
  Text,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';


import {
  W,
  dark,
  grey,
  orange,
  blue
} from 'common/index'

const status_to_text = (status) => {
  switch (status) {
    case 1:
      return "等待认领"
    case 2:
      return "已完结"
  }
}

export class ItemCard extends Component {


  render(){

    const {name, image, status, time, position, containerStyle } = this.props
    return(
      <View style={[styles.container, containerStyle ]}>
        <View style={styles.left}>
          <Image style={styles.image} source={{uri : image}} />
        </View>

        <View style={styles.right}>
          <Text style={styles.strong}>{name}</Text>
          <Text style={styles.memo}>拾获时间:{time}</Text>
          <Text style={styles.memo}>拾获地点:{position}</Text>
          <View style={styles.op}>
            <Text style={styles.big}>{status_to_text(status)}</Text>
            <SmallBtn>编辑</SmallBtn>
          </View>
        </View>
      </View>
    )
  }
}

const SmallBtn = ({onPress, children}) => <TouchableOpacity onPress={onPress}>
  <View>
    <Text style={btnStyles.text}>{children}</Text>
  </View>
</TouchableOpacity>


const btnStyles = StyleSheet.create({
  text : {
    color : blue ,
    fontSize : 11
  }
})

ItemCard.propTypes = {
  name : React.PropTypes.string,
  image : React.PropTypes.string,
  status : React.PropTypes.number,

}



const styles = StyleSheet.create({
  container : {
    height : 102,
    backgroundColor : 'white',
    width : W,
    padding : 10,
    flexDirection : 'row'
  },
  left : {
    flex : 2,
    alignItems : 'center',
    justifyContent : 'center'
    
  }, 
  
  strong : {
    color : dark,   
    fontSize : 14
  },
  
  big : {
    fontSize : 16, 
    marginTop : 5,
    color : orange,
    marginRight : 10
  },
  
  
  memo : {
    color : grey,   
    fontSize : 11,
    marginTop : 5
  },
  image : {
    height : 82,  
    width : W * 0.4 - 10,
    
  },
  right : {
    flex : 3,
    marginLeft : 15
  },
  op : {
    flexDirection : 'row',
    alignItems : 'flex-end',
  }
})
