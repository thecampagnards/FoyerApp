"use strict";

//import des librairies
import React, {
  StyleSheet,
  View,
  Text,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';
import ControlledRefreshableListView from 'react-native-refreshable-listview';

//import de Commande est des viariables d'environement
import Order from './Order';
import Environment from '../environment.js';

//definition des styles
let styles = StyleSheet.create({
  listView: {
    flex: 1
  },
  container: {
    flex: 1,
    marginTop: 64
  },
  thumb: {
    width: 20,
    height: 20,
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

class Orders extends Component {

  constructor(props) {
    super(props);
    //definition de la liste des commandes et du boolean 
    //pour le spinner de chargement
    this.state = {
      isLoading: true,
      orders: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  reloadOrders() {
    //this.fetchOrders();
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    //récupération de la liste des commandes
    fetch(Environment.BASE_URL+'command/', {
      headers: {
        Authorization: Environment.API_KEY
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        orders: this.state.orders.cloneWithRows(responseData),
        isLoading: false
      });
    })
    .done();
  }

  rowPressed(order) {
    //redirection vers commande
    this.props.navigator.push({
      title: "Commandes",
      component: Order,
      passProps: {order: order}
    });
  }

  renderRow(rowData) {
    //affichage de la listes des commandes
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.thumb}>Icon</Text>
            <View  style={styles.textContainer}>
              <Text style={styles.price}>{rowData.total}€</Text>
              <Text style={styles.title} 
                    numberOfLines={1}>{rowData.id_command}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    //si le chargement est fait
    if(!this.state.isLoading){
      return (
        <View style={styles.container}>
          <ControlledRefreshableListView
            dataSource={this.state.orders}
            renderRow={this.renderRow.bind(this)}
            style={styles.listView}
            isRefreshing={this.state.isLoading}
            loadData={this.reloadOrders}
            refreshDescription="Rafraîchir la liste"
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
          hidden='true'
          size='large'/>
        </View>
      );
    }
  }
}

module.exports = Orders;