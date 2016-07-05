/**
 * Created by weimeng on 16/4/25.
 * © 2016 NCF GROUP ALL RIGHTS RESERVED
 */

const confs =   {
  Home : {
    name : "Home",
    get Component() {return require("tabs/KeTabsView") }
  },
  
  Input : {
    name : "Input",  
    get Component() { return require("item/ItemInput")}
  },

  Memo : {
    name : "Memo",
    get Component() { return require("item/ItemMemo")}
  },
  
  Search : {
    name : "Search",  
    get Component() { return require("item/ItemSearch")}
  },
  
  TakePicture : {
    name : "TakePicture",
    get Component() { return require("common/TakePicture")}
  }
}
confs.initial = confs.Home
export const PagesConfig = confs
