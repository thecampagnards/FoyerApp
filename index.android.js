"use strict";

//import des librairies
import React, {
  AppRegistry,
  TabBar,
  Component,
  Navigator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//import des autres tabs
import Products from './views/Products';
import Home from './views/Home';
import Orders from './views/Orders';
import Cart from './views/Cart';

class FoyerApp extends Component {

  constructor(props) {
    super(props);
    //selection de la tab par défaut
    this.state = {
      selectedTab: 'home'
    };
  }

  render() {
    //affichage de la bar de navigation en bas et en haut
    return (
      <TabBar selectedTab={this.state.selectedTab}>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'home'}
          iconName='home'
          title='Accueil'
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}
        >
          <Navigator
            style={{flex:1}}
            initialRoute={{
              title : 'Accueil',
              component: Home
            }}
          />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'products'}
          iconName='cutlery'
          title='Produits'
          onPress={() => {
            this.setState({
              selectedTab: 'products',
            });
          }}
        >
          <Navigator
            style={{flex:1}}
            initialRoute={{
              title : 'Produits',
              component: Products
            }}
          />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'cart'}
          iconName='shopping-basket'
          title='Panier'
          onPress={() => {
            this.setState({
              selectedTab: 'cart',
            });
          }}
        >
          <Navigator
            style={{flex:1}}
            initialRoute={{
              title : 'Panier',
              component: Cart
            }}
          />
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={this.state.selectedTab === 'orders'}
          iconName='list'
          title='Commandes'
          onPress={() => {
            this.setState({
              selectedTab: 'orders',
            });
          }}
        >
          <Navigator
            style={{flex:1}}
            initialRoute={{
              title : 'Commandes',
              component: Orders
            }}
          />
        </Icon.TabBarItem>
      </TabBar>
    );
  }
}

AppRegistry.registerComponent('FoyerApp', () => FoyerApp);