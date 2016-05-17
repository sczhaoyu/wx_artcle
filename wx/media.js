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
var _navigator=null;

class WxMedia extends Component {
 constructor(props) {
    super(props); 
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      wxAccountId:0,
      media:[],
      data:[],
      pageState:true,//翻页状态
      page:1,//第几页
      limit:100//显示多少条
    };
  }
  onPage(){
    if (this.state.pageState) {
       this.setState({
            page:this.state.page+1
       });
       this.loadMedia();
    }
  }
  componentDidMount(){
   _navigator = this.props.navigator;
    this.loadMedia();
  }

  loadMedia(){
    var that=this;
    var catalogId=this.props.catalogId;
    var page=this.state.page;
    var limit=this.state.limit;
    Request.wx("media?catalogId="+catalogId+"&page="+page+"&limit="+limit,{},function(data){
         var d=that.state.data;
         var newData=[];//新数组
         var state=true;//翻页状态
         //判断是否有新数据
         if (data.jsonRet!=undefined&&data.jsonRet.length>0) {
            //如果有新的数据追加
            d=d.concat(data.jsonRet);
         }else{
           state=false;//禁止翻页
         }
         //删除上一次数据的加载状态视图
         //获得一个新的对象数组
         for (var i =0; i<d.length; i++) {
              if (d[i]!="loading"&&d[i]!="end") {
                  newData.push(d[i])
              }
         }
         if (data.jsonRet==undefined) {
            newData.push("end");
         }else{
            newData.push("loading");
         }
         that.setState({
            media:that.state.dataSource.cloneWithRows(newData),
            data:newData,
            pageState:state
         });
    });
  }
  onArtcle(wxAccountId){
    _navigator.push({wxId:wxAccountId,title:"文章列表",id:"artcleList"});
  }
  renderRow(v,idx,that){
    if (v=="loading"||v=="end") {
         var txt="加载完成";
         if (v=="loading") {
             txt="加载中,请稍后......";
         }
        return(
          <View key={"loadingOrEnd"} style={styles.loadingOrEnd}>
           <Text style={{color:"#000000"}}>{txt}</Text>
          </View>
        );
    }

    var name=v.name;
    if (name.length>5) {
      name=v.name.substring(0,5)+"...";
    }
    return(
      <TouchableHighlight onPress={()=>that.onArtcle(v.wxAccountId)}>
          <View key={"accountId"+v.wxAccountId} style={styles.media}>
            <View style={styles.head}>
              <Image style={{width:65,height:65,borderRadius:10}}   source={{uri:v.logUrl}}/>
              <Text style={{color:"#000000"}}>{name}</Text>
            </View>
             <View style={styles.des}>
                <Text style={{color:"#000000"}}>{v.descriptionText}</Text>
            </View>
          </View>
      </TouchableHighlight>
    );
    
  }
  render() {
    
    if (this.state.media.length==0) {
        return(<Loading txt="正在加载媒体信息......"/>);
    }
    return (
         <ListView
        onEndReachedThreshold={40}
        onEndReached={()=>this.onPage()}
        dataSource={this.state.media}
        renderRow={(v,s,idx)=>this.renderRow(v,idx,this)}
        style={styles.main}
         />
      
    );
  }
}
const styles = StyleSheet.create({
  loadingOrEnd:{
    height:28,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:"#8B8386",
    marginBottom:10,
    borderRadius:10,
  },
  des:{
     flex:7,
     justifyContent: 'center',
     alignItems: 'center',
  },
  head:{
     flex:3,
     flexDirection: 'column',
     justifyContent: 'center',
     alignItems: 'center',
     width:80,
     height:120
  },
   media:{
      borderWidth:1,
      borderColor:"#636363",
      flexDirection: 'row',
      marginBottom:10,
      height:120,
      borderRadius:10,
   },
   main:{
       flexDirection: 'column',
       padding:5
   }

});

module.exports = WxMedia;

   