"use strict";

//import des librairies
import React, {
  StyleSheet,
  View,
  Text,
  Image,
  Component,
  Dimensions,
  ActivityIndicatorIOS
} from 'react-native';

//import du fichier de configuration
import Environment from '../environment.js';

//récupération de la largeur de la fenètre
let width = Dimensions.get('window').width;
//déclaration des styles
let styles = StyleSheet.create({
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
    //déclaration du boolean de chargement
    //et de l'url de la banniere
    this.state = {
      isLoading: true,
      banner: null
    };
  }

  componentDidMount() {
    this.fetchBanner();
  }

  //requetage sur l'api pour récupérer 
  //le nom du fichier
  fetchBanner() {
    fetch(Environment.BASE_URL+"banniere/", {
      headers: {
        Authorization: Environment.API_KEY
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        banner: Environment.BASE_URL+'files/mobile/'+responseData.url,
        isLoading: false
      });
    })
    .done();
  }

  render() {
    //si la requete à l'api est faite
    if(!this.state.isLoading){
      return (
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: this.state.banner}} />
          <Text style={styles.login}>
            Bienvenue {this.props.login},
          </Text>
          <Text style={styles.description}>
            Vous pouvez effectuer vos commandes au Foyer via cette application !
          </Text>
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

module.exports = Home;