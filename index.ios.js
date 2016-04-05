"use strict";

//import des librairies
import React, {
  AppRegistry,
  TabBarIOS,
  Component,
  NavigatorIOS
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
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'home'}
          iconName='home'
          title='Accueil'
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}
        >
          <NavigatorIOS
            style={{flex:1}}
            initialRoute={{
              title : 'Accueil',
              component: Home
            }}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'products'}
          iconName='cutlery'
          title='Produits'
          onPress={() => {
            this.setState({
              selectedTab: 'products',
            });
          }}
        >
          <NavigatorIOS
            style={{flex:1}}
            initialRoute={{
              title : 'Produits',
              component: Products
            }}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'cart'}
          iconName='shopping-basket'
          title='Panier'
          onPress={() => {
            this.setState({
              selectedTab: 'cart',
            });
          }}
        >
          <NavigatorIOS
            style={{flex:1}}
            initialRoute={{
              title : 'Panier',
              component: Cart
            }}
          />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          selected={this.state.selectedTab === 'orders'}
          iconName='list'
          title='Commandes'
          onPress={() => {
            this.setState({
              selectedTab: 'orders',
            });
          }}
        >
          <NavigatorIOS
            style={{flex:1}}
            initialRoute={{
              title : 'Commandes',
              component: Orders
            }}
          />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('FoyerApp', () => FoyerApp);