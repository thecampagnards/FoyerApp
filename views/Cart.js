"use strict";

//import des librairies
import React, {
  StyleSheet,
  View,
  Text,
  Component
} from 'react-native';

//declaration des styles
let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 65,
    alignItems: 'center'
  }
});

class Cart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Panier</Text>
      </View>
    );
  }
}

module.exports = Cart;