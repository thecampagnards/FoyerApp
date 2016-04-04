"use strict";

import React, {
  StyleSheet,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  Image,
  ActivityIndicatorIOS
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview';

import Product from './Product';

var styles = StyleSheet.create({
  listView: {
    flex: 1
  },
  description: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#e85344'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class Products extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isLoading: true,
      products: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  reloadProducts() {

    this.fetchProducts();
  }

  componentDidMount() {

    this.fetchProducts();
  }

  fetchProducts() {

    fetch('http://isenclub.fr/foyer/api/product/', {
      headers: {
        Authorization: "Basic cm9vdDpzM2N1cml0Mw=="
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        products: this.state.products.cloneWithRows(responseData),
        isLoading: false
      });
    })
    .done();
  }

  rowPressed(product) {

    this.props.navigator.push({
      title: "Produits",
      component: Product,
      passProps: {product: product}
    });
  }

  renderRow(rowData) {

    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: 'http://isenclub.fr/foyer/api/files/product/'+rowData.image }} />
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{rowData.price}€</Text>
              <Text style={styles.title} 
                    numberOfLines={1}>{rowData.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {

    var spinner = this.state.isLoading ?
      (<ActivityIndicatorIOS
          style={styles.loading}
          hidden='true'
          size='large'/>) :
      (<View/>);

    return (
      <View style={styles.container}>
        <ControlledRefreshableListView
          dataSource={this.state.products}
          renderRow={this.renderRow.bind(this)}
          style={styles.listView}
          isRefreshing={this.state.isLoading}
          onRefresh={this.reloadProducts}
          refreshDescription="Rafraîchir la liste"
        />
      </View>
    );
  }
}

module.exports = Products;