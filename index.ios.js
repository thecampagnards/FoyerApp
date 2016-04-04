"use strict";

import React, {
  AppRegistry,
  TabBarIOS,
  Component,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Products from './views/Products';
import Home from './views/Home';

class FoyerApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    };
  }

  render() {
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
        }}>
          <NavigatorIOS
            style={{
              flex:1
            }}
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
        }}>
          <NavigatorIOS
            style={{
              flex:1
            }}
            initialRoute={{
              title : 'Produits',
              component: Products
            }}
          />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
      );
  }
}

AppRegistry.registerComponent('FoyerApp', () => FoyerApp);