'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

class SettingsScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Coffee-Water Ratio
        </Text>
        <Text style={styles.instructions}>
          Ratio Display
        </Text>
        <Text style={styles.instructions}>
          Slider
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

module.exports = SettingsScreen;
