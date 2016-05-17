import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  StyleSheet,
  TouchableHighlight,
  WebView
} from 'react-native';
class Web extends Component {
  render() {
    return(
       <WebView 
          automaticallyAdjustContentInsets={false}
          source={{uri: this.props.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
        />
    );
   
  }
}
 
const styles = {
 
       
}
module.exports = Web;
