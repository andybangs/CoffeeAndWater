'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var MainScreen = require('./MainScreen');

var CoffeeAndWater = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style = {styles.container}
        initialRoute={{
          component: MainScreen,
          title: 'Coffe + Water',
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('CoffeeAndWater', () => CoffeeAndWater);

module.exports = CoffeeAndWater;
