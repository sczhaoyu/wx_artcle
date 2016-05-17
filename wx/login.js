import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
var _navigator;
var h=Dimensions.get("window").height/4;
var Immutable = require('immutable');
var Request=require("../util/request.js");
var Loading=require("../util/loading.js");
class Login extends Component {
   constructor(props) {
    super(props); 
    this.state = {
      login: false,
      userPwd:"",
      userName:""
    };
  }
  handleUpdateChange(t,name){
       var login = Immutable.Map({});
       login=login.set(name,t);
       this.setState(login.toObject());
  }
  loading(){
        var login = Immutable.Map(this.state);
        login=login.set("login",!this.state.login);
        this.setState(login.toObject());
  }
  submitLogin() {
         this.props.navigator.push({title:"column",id:"column"});
         return;
         if (this.state.userName==""||this.state.userName=="") {
             Alert.alert('提示',"用户名和密码必须填写完整，并且不能为空！",[{text: '确定'}]);
             return;
         }
        var that=this;
       
        Request.post(100,this.state,function(data){
          if (data.code!=0) {
              that.loading();
              Alert.alert('提示',data.msg,[{text: '确定'}]);
          }else{
               that.props.navigator.push({title:"column",id:"column"});
          }
        });
        this.loading();
  }
  render() { 
    var load=null;
    if (this.state.login) {
        load=<Loading txt="登录中，请稍后......"/>;
    }
    return (
      <View>
      <View style={{marginTop:h}}>
        <View style={{flexDirection: 'row',justifyContent:"center"}}>
           <Image style={{width:60,height:60,marginBottom:20}} source={require('../img/logo.png')}/>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.textLable}>
            <Text  style={{fontSize:14, fontWeight:'bold',}}>用户名:</Text>
          </View>
           <View style={styles.textFiled}>
            <TextInput placeholder="请输入您的手机号码"   onChangeText={(e) => this.handleUpdateChange(e,"userName")}  style={styles.textInput}  />
         </View>
       </View>
       <View style={styles.flexContainer}>
          <View style={styles.textLable}>
            <Text style={{fontSize:14, fontWeight:'bold',}}>密    码:</Text>
          </View>
           <View style={styles.textFiled}>
            <TextInput placeholder="请输入密码"  onChangeText={(e) => this.handleUpdateChange(e,"userPwd")} style={styles.textInput} secureTextEntry={true} />
         </View>
       </View>
        

        <View style={styles.caozuo}>
          <TouchableOpacity   onPress={()=>this.submitLogin()} style={styles.button} ><Text>登录</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text>注册</Text></TouchableOpacity>
       </View>
      </View>
       {load}
    </View>
    );
  }
}
styles = {
        caozuo: {
            flexDirection: 'row',
            justifyContent:"center",
        },
        flexContainer: {
            flexDirection: 'row',
            padding:10
        },
        textLable:{
          flexDirection: 'row',
          height: 45,
          flex:1,
          position :"relative",
          alignItems:"center",
        },
        textInput:{
          backgroundColor:'#FFFFFF',
          height: 43,
        },
        textFiled:{
          height: 45,
          flex:6,
          borderWidth:1,
          borderColor:"#FF4040",
        },
        button:{
           backgroundColor:'#FF4040',
           width:100,
           height:38,
           borderRadius:10,
           alignItems:"center",
           justifyContent:"center",
           marginLeft:10,
        },
       
       
    }

 
module.exports = Login;
