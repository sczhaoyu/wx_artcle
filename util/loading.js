import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

class Loading extends Component {
  render() {
    var txt=this.props.txt||"加载中······";
    return (
      <View   style={styles.container}>
        <View style={styles.side} opacity={0.7}>
        </View>
         <View  style={styles.img}>
           <Image ref="img" style={{width:145,height:15}}   source={require('../img/loading.gif')}/>
           <Text style={{color:"red",marginBottom:10}}>{txt}</Text>
         </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
    top:0,
    left:0,
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height
  },
  img:{
      borderWidth:1,
      borderColor:"#FF0000",
      borderRadius:10,
      width:220,
      height:65,
      backgroundColor:'#FFFFFF',
      justifyContent:'flex-end',
      alignItems:'center'
  },
  side:{
    position:"absolute",
    top:0,
    left:0,
    width:Dimensions.get("window").width,
    height:Dimensions.get("window").height,
    backgroundColor:'#383838'
  }
});

module.exports = Loading;
