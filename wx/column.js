import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  StyleSheet,
  TouchableHighlight,
  Alert,
  NativeModules
} from 'react-native';
var Request=require("../util/request.js");
var Loading=require("../util/loading.js");
var navigator=null;
class Column extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      cols:[]
    };
  }
  componentDidMount(){
    navigator=this.props.navigator;
    var that=this;
    Request.wx("cols",{},function(data){
         that.setState({
            cols:data.jsonRet
         });
      });
    
  }
  showWa(cid){
     navigator.push({cid:cid,title:"媒体列表",id:"media"});
  }
  renderRows(){
    var ret=[];
    for (var i=0; i <this.state.cols.length; i++) {
      var v=this.state.cols[i];
       ret.push(this.renderRow(v));
    }
    return ret;
  }
  renderRow(v){
      var col=<TouchableHighlight key={"col_"+v.catalogId}  onPress={()=>this.showWa(v.catalogId)} style={styles.column}>
              <View   style={styles.img}>
                <Text style={{color:"#FFFFFF"}}>{v.name}</Text>
              </View>
      </TouchableHighlight>;
      return col;
  }
  render() {
   
    var load=null;
    if (this.state.cols.length==0) {
        load= <Loading txt="正在努力加载分类信息......"/>;
    }
    return (
      <View style={styles.main}>
          <View> 
              <View style={styles.title}>
                 <Text style={{fontSize:16,fontWeight:"bold",color:"#FFFFFF"}}>选择栏目</Text>
              </View>
              <View style={styles.info}>
                  {this.renderRows()}
              </View>
          </View>
          {load}
      </View>
    );
  }
}
var width=Dimensions.get("window").width/4;
const styles = {
  img:{
     width:width-10,
     height:width-10,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor:'#FF4040',
  },
  column:{
     width:width,
     height:width,
     padding:5
  },
  info:{
     flexDirection:'row',
     flexWrap:"wrap",
     alignItems:"center",
  },
  title:{
     height:45,
     backgroundColor:'#FF0000',
     borderWidth:1,
     borderColor:"#FF0000",
     alignItems:"center",
     justifyContent:"center",
     flexDirection: 'row',
  },
  main:{
    flexDirection: 'column',
  }
       
}
module.exports = Column;
