'use strict';

var React = require('react-native');
var {
  AlertIOS,
  AsyncStorage,
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var MainScreen = require('./App/Components/MainScreen');
var SettingsScreen = require('./App/Components/SettingsScreen');
var RATIO = 'ratio';

class CoffeeAndWater extends React.Component{
  constructor(props) {
    super(props);

    this._onRatioChange = this._onRatioChange.bind(this);

    this.state = {
      ratio: 0.0625,
      coffee: 42,
      water: Math.floor(42 / 0.0625),
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(RATIO)
    .then((value) => {
      if (value) {
        this.setState({
          ratio: value,
          coffee: 42,
          water: Math.floor(42 / +value),
        });
      }
    })
    .done();
  }

  render() {
    var initialRoute = {
      component: MainScreen,
      title: 'Coffe + Water',
      rightButtonTitle: 'Settings',
      onRightButtonPress: this._onSettingsPress.bind(this),
      passProps: {
        ratio: this.state.ratio,
        coffee: this.state.coffee,
        water: this.state.water,
      },
    };

    return (
      <NavigatorIOS
        ref='nav'
        style={styles.container}
        initialRoute={initialRoute}
      />
    );
  }

  _onSettingsPress() {
    var ratio = this.state.ratio;

    this.refs.nav.push({
      title: 'Ratio',
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
      },
      passProps: {
        ratio: ratio,
        parentCallback: this._onRatioChange,
      },
    });
  }

  _onRatioChange(value) {
    AsyncStorage.setItem(RATIO, value);
    this.setState({
      ratio: value,
      water: Math.floor(this.props.coffee / value),
    });
  }

};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('CoffeeAndWater', () => CoffeeAndWater);

module.exports = CoffeeAndWater;
