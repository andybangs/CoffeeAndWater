'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

class MainScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Coffee + Water
        </Text>
        <Text style={styles.instructions}>
          Coffee in grams (or ounces)
        </Text>
        <Text style={styles.instructions}>
          Water in grams (or ounces)
        </Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1e7c9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = MainScreen;
