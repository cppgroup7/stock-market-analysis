import React, {Component} from 'react';
import {WebView} from 'react-native';

class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'file:///D:/Capstone/frontpage.html',
        }}
        style={{marginTop: 20}}
      />
    );
  }
}