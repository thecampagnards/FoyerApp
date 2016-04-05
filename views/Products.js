"use strict";

//import des librairies
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
import SearchBar from 'react-native-search-bar';
import HtmlRender from 'react-native-html-render';

//import de Produit et des constantes d'env
import Product from './Product';
import Environment from '../environment.js';

//definition des styles
let styles = StyleSheet.create({
  listView: {
    flex: 1
  },
  description: {
    fontSize: 17,
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
  },
  searchBar: {
    marginTop: 64,
    height: 44
  }
});

class Products extends Component {

  constructor(props) {
    super(props);
    //definition de la liste des produits et du boolean 
    //pour le spinner de chargement
    this.state = {
      isLoading: true,
      showsCancelButton: false,
      products: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  reloadProducts() {
    //this.fetchProducts();
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts() {
    //récupération de la liste des produits
    fetch(Environment.BASE_URL+'product/', {
      headers: {
        Authorization: Environment.API_KEY
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
    //si on clique sur la ligne d'un produit on est redirigé vers le produit
    this.props.navigator.push({
      title: "Produits",
      component: Product,
      passProps: {product: product}
    });
  }

  renderRow(rowData) {
    //affichage de la ligne de la liste
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)} underlayColor="#dddddd">
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: Environment.BASE_URL+"files/product/"+rowData.image }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{rowData.price}€</Text>
              <Text style={styles.title} numberOfLines={1}>{rowData.name}</Text>
              <HtmlRender style={styles.description} numberOfLines={1} value={rowData.description} />
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    //si la requete à l'api est faite
    if(!this.state.isLoading){
      return (
        <View style={styles.container}>
          <SearchBar
            ref="searchBar"
            placeholder="Rechercher"
            onChangeText={this.reloadProducts()}
            onSearchButtonPress={() => this.refs.searchBar.blur()}
            onFocus={() => this.setState({showsCancelButton: true})}
            showsCancelButton={this.state.showsCancelButton}
            onCancelButtonPress={() => this.setState({showsCancelButton: false})}
            style={styles.searchBar}
          />
          <ControlledRefreshableListView
            dataSource={this.state.products}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView}
            isRefreshing={this.state.isLoading}
            loadData={this.reloadProducts}
            refreshDescription="Actualisation de la liste"
          />
        </View>
      );
    }
    //sinon on affiche le spinner
    else{
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
          style={styles.loading}
          hidden="true"
          size="large"/>
        </View>
      );
    }
  }
}

module.exports = Products;