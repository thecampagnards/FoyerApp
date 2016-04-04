"use strict";

import React, {
  StyleSheet,
  View,
  Text,
  Image,
  Component,
  Dimensions,
  ActivityIndicatorIOS
} from 'react-native';

var width = Dimensions.get('window').width;

var styles = StyleSheet.create({
  description: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  login: {
    marginTop: 10,
    fontSize: 25,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    marginTop: 65,
    alignItems: 'center'
  },
  image: {
    width: width,
    height: 200
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
   }
});

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      banner: null
    };
  }

  componentDidMount() {
    this.fetchBanner();
  }

  fetchBanner() {
    fetch("http://isenclub.fr/foyer/api/banniere/", {
      headers: {
        Authorization: "Basic cm9vdDpzM2N1cml0Mw=="
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        banner: 'http://isenclub.fr/foyer/api/files/mobile/'+responseData.url,
        isLoading: false
      });
    })
    .done();
  }

  render() {

    var spinner = this.state.isLoading ?
    ( <ActivityIndicatorIOS
        style={styles.loading}
        hidden='true'
        size='large'/> ) :
    ( <View/>);

    return (
      <View style={styles.container}>
        {spinner}
        <Image style={styles.image} source={{uri: this.state.banner}} />
        <Text style={styles.login}>
          Bienvenue ksidor18,
        </Text>
        <Text style={styles.description}>
          Vous pouvez effectuer vos commandes au Foyer via cette application !
        </Text>
      </View>
    );
  }
}

module.exports = Home;