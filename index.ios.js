'use strict';

var React = require('react-native');
var {
  AppRegistry,
  AsyncStorage,
  Navigator,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
} = React;

var MainScreen = require('./App/Components/MainScreen');
var SettingsScreen = require('./App/Components/SettingsScreen');

var RATIO = 'ratio';

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton(route, navigator, index, navState) {
    if (index === 1) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => navigator.push({title: 'Ratio', index: 1})}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Settings
        </Text>
      </TouchableOpacity>
    );
  },

  Title(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  }
};

class CoffeeAndWater extends React.Component{
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
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

  renderScene(route, nav) {
    if (route.index === 0) {
      return (
        <MainScreen
          ratio={this.state.ratio}
          coffee={this.state.coffee}
          water={this.state.water}
        />
      );
    } else {
      return (
        <SettingsScreen
          ratio={this.state.ratio}
          parentCallback={this._onRatioChange}
        />
      );
    }
  }

  render() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{title: 'Coffee + Water', index: 0}}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
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
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373e4d',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890ff',
  },
});

AppRegistry.registerComponent('CoffeeAndWater', () => CoffeeAndWater);

module.exports = CoffeeAndWater;
