'use strict';

var React = require('react-native');
var {
  AlertIOS,
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var MainScreen = require('./MainScreen');
var SettingsScreen = require('./SettingsScreen');

class CoffeeAndWater extends React.Component{
  onSettingsPress() {
    this.refs.nav.push({
      title: 'Settings',
      component: SettingsScreen,
      leftButtonTitle: 'Back',
      onLeftButtonPress: () => this.refs.nav.pop(),
      rightButtonTitle: 'Save',
      onRightButtonPress: () => {
        AlertIOS.alert(
          'TODO:',
          'Persist Settings',
          [
            {
              text: 'OK',
              onPress: () => console.log('Tapped OK'),
            },
          ]
        );
      }
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={{
          component: MainScreen,
          title: 'Coffe + Water',
          rightButtonTitle: 'Settings',
          onRightButtonPress: this.onSettingsPress.bind(this),
        }}
      />
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('CoffeeAndWater', () => CoffeeAndWater);

module.exports = CoffeeAndWater;
