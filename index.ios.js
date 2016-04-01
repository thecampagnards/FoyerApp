"use strict";

//https://www.raywenderlich.com/99473/introducing-react-native-building-apps-javascript

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var SearchPage = require('./components/SearchPage');


class HelloWorld extends Component {
  render() {
    return React.createElement(React.Text, {style: styles.text}, "Hello World!");
  }
}

class FoyerApp extends Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    marginTop: 80,
    textAlign: 'center'
  },
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('FoyerApp', () => FoyerApp);
