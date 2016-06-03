
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid
} from 'react-native';
var _navigator;
var Login=require("./wx/login.js");
var Column=require("./wx/column.js");
var Media=require("./wx/media.js");
var Web=require("./wx/web.js");
var ArtcleList=require("./wx/artcle_list.js");
BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});
class WxArtcle extends Component {
  renderSceneAndroid(route, navigator){
     _navigator = navigator;
    if(route.id === 'column'){
      return (
        <Column navigator={navigator}/>
      );
    }
    if(route.id === 'login'){
      return (
        <Login navigator={navigator}/>
      );
    }
    if(route.id === 'media'){
      return (
        <Media  catalogId={route.cid} navigator={navigator}/>
      );
    }
    if(route.id === 'web'){
      return (
        <Web  url={route.url} navigator={navigator}/>
      );
    }
    if (route.id="artcleList") {
       return (
        <ArtcleList  wxId={route.wxId} navigator={navigator}/>
       );
    }
  }
  configureScenceAndroid(route, routeStack){
    return Navigator.SceneConfigs.FloatFromLeft;
  }
  handleUpdateChange(t,name){
       var login = Immutable.Map({});
       login=login.set(name,t);
       this.setState(login.toObject());
  }
  render() {
    var renderScene = this.renderSceneAndroid;
    var configureScence = this.configureScenceAndroid;
    return (
      <Navigator
        debugOverlay={true}
        initialRoute={{title: '登录界面', id:'login'}}
        configureScence={configureScence}
        renderScene={renderScene}
      />
    );
  }
}


AppRegistry.registerComponent('wx_artcle', () => WxArtcle);
