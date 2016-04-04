"use strict";

import React, {
  StyleSheet,
  Image, 
  View,
  Text,
  Component
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#e85344'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

class Product extends Component {

  render() {
    var product = this.props.product;
    
    return (
      <View style={styles.container}>
        <Image style={styles.image} 
            source={{uri: 'http://isenclub.fr/foyer/api/files/product/'+product.image}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{product.price}€</Text>
          <Text style={styles.title}>{product.name}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    );
  }
}

module.exports = Product;