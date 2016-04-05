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

class Order extends Component {
  render() {
    //recupération des la commande
    let order = this.props.order;
    return (
      <View style={styles.container}>
        <Text>{order.total}</Text>
      </View>
    );
  }
}

module.exports = Order;