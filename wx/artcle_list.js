import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  ListView,
  Alert,
  ScrollView
} from 'react-native';
var Request=require("../util/request.js");
var Loading=require("../util/loading.js");

var Immutable = require('immutable');
class ArtcleList extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      artcles:[],
      a:true
    };
  }
  componentDidMount(){
      this.loadArtcle();
  }
  loadArtcle(){
    var that=this;
    Request.wx("artcle?wxId="+this.props.wxId,{},function(data){
      if (!data.success) {
        that.setState({
            a:false,
         });
         return
      }
         that.setState({
            artcles:that.state.dataSource.cloneWithRows(data.jsonRet),
         });
    });
  }
  openUrl(url){
       
     this.props.navigator.push({url:url,id:"web"});
  }
  renderRow(v,that){
       var t=v.title;
       if (t.length>20) {
          t=t.substring(0,18)+"...";
       }
      return(
      <View  key={"arid"+v.artcleId} style={{padding:10,backgroundColor:"#EBEBEB"}}>
        <View style={styles.list}>
            <TouchableHighlight style={styles.fisrt}  onPress={()=>this.openUrl(v.sourceUrl)}>
               <Image  resizeMode={"cover"} style={styles.timg}  source={{uri:v.coverUrl}}>
                   <View opacity={0.6} style={styles.title}/>
                   <Text style={{bottom:0,position:"absolute",color:"#FFFFFF",fontSize:16,lineHeight:29}}>{t}</Text>
               </Image>
            </TouchableHighlight>
            
            {that.renderLines(v.artcles)}
             
        </View>
       </View>
     );
    
  }
  renderLines(v){
    if (v==null) {
      return null;
    }
    var ret=[];
    for (var i = 0; i<v.length; i++) {
       ret.push(this.getLine(v[i]));
    }
    return ret;
  }
  getLine(v){
    return(
        <TouchableHighlight onPress={()=>this.openUrl(v.sourceUrl)} key={"aridchild"+v.artcleId} style={styles.txt}>
               <View style={styles.line}>
                   <Text style={{color:"#141414",fontSize:14,flex:8}}>{v.title}</Text>
                   <Image resizeMode={"cover"}  style={{height:50,flex:2,marginRight:10}}  source={{uri:v.coverUrl}}/>
               </View>
         </TouchableHighlight>
    );
  }
  render() {
    if (this.state.artcles.length==0) {
      var t="暂无文章信息";
      if (this.state.a) {
          t="正在加载文章列表";
      }
        return(<Loading txt={t}/>);
     }
    return (
         <ListView
        dataSource={this.state.artcles}
        renderRow={(v)=>this.renderRow(v,this)}
         />
      
    );
  }
}
const styles = StyleSheet.create({
  line:{
    height:60,
    justifyContent: 'center',
    alignItems:'center',
    borderLeftWidth:1,
    borderRightWidth:1,
    borderBottomWidth:1,
    paddingLeft:10,
    flexDirection: 'row',
   
  },
  title:{
    backgroundColor:"#080808",
    height:40,
    bottom:0, 
    position:"absolute",
    justifyContent:'center',
    width:Dimensions.get("window").width
  },
  timg:{
    height:140,
    flex:10,
    justifyContent:'center',
    alignItems:'flex-start',
    position:"relative",
    borderWidth:1,
    borderColor:"#000000",
  },
  fisrt:{
      width:Dimensions.get("window").width-20,
  },
  txt:{
      width:Dimensions.get("window").width-20,
  },
  list:{
    justifyContent: 'center',
    alignItems:'center',
    padding:0,
    flexDirection: 'column',
  }
});

module.exports = ArtcleList;

   