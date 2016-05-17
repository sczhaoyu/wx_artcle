'use strict';
import React, { Component } from 'react';
var {
  Alert
} = React;

class Request extends Component {
     
}
Request.wx=function(url,prms,func){
   url='http://test-api.centwaytech.com:9562/'+url;
  fetch(url, {
    method: 'GET'
  })
  .then((response)=>response.json())
  .then((data) => {
       func(data)
  }).catch(function(error){
      console.log(error); 
  }).done();
    
}
function toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
Request.post=function(faceCode,prms,func){
  var prm={msg:"",code:0,body:null}; 
  fetch('http://test-api.centwaytech.com', {
    method: 'post',
    body: Request.request(faceCode,prms)
  })
  .then((response) => response.json())
  .then((data) => {
       prm.msg =data.head.respMsg;
       prm.code =data.head.respCode;
       prm.body =data.body;
       func(prm);
  }).catch(function(error){
       prm.msg ="网络错误";
       prm.code =-1909;
       prm.body =null;
       func(prm);
  });
    
}


Request.request=function(faceCode,prms){
     var req={head:{faceCode:faceCode,ueType:0,userId:1408,token:"2159BD88FDA211E5BB0800163E060473"},body:prms};
     return  JSON.stringify(req);
}

 
  

module.exports = Request;