/**
 *
 * Created by weimeng on 16/2/29.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */
import { ThemeLightBlueColor } from "../../XinStyles"
import { getResponsiveSize } from "common/index"

export const FormStyles = {
  InputContainer : {
    flex : 3,
    alignItems : "center",
    flexDirection : "row",
    padding : 10
  },
  Label : {
    flex : 1
  },
  TextInput : {
    flex : 3,
    height: 40,
    borderColor: '#eee',
    borderWidth: 0,
    padding : 10,
    borderRadius : 5,
  },
  Switch : {
    flex : 3,
    height : 40
  },
  Picker : {
    flex : 3,
    height : 40,
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius : 5,
    padding : 10
  },
  CheckBoxItemContainer : {
    flex : 1
  },GroupContainerner : {
    flexDirection:"row",
    height : 40,
    alignItems : 'center',
    paddingLeft : 20
  },
  CheckBoxElementContainer: {
    flexDirection: 'row'
  },
  GroupContainer : {
    backgroundColor: 'white',
    marginBottom : 20

  },
  GroupButton : {
    height : 40,
    paddingLeft : 20,
    alignItems : 'flex-start',
    justifyContent : "center"
  },
  GroupContainerWrapper : {

  },
  GroupHintContainer : {
    height : 30,
    justifyContent : "center",
    paddingLeft : 20
  },
  Button : {
    backgroundColor : ThemeLightBlueColor,
    height : 40,
    justifyContent : "center",
    alignItems : "center"
  },
  ButtonText : {
    color : 'white',
    fontSize : getResponsiveSize(14)
  }

}
