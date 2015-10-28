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
var COFFEE = 'coffee';
var WATER = 'water';

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
    this._onCoffeeChange = this._onCoffeeChange.bind(this);
    this._onWaterChange = this._onWaterChange.bind(this);

    this.state = {
      ratio: 0.0625,
      coffee: 42,
      water: 672,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(RATIO)
    .then((value) => {
      if (value) {
        this.setState({
          ratio: +value,
        });
      }
    })
    .done();

    AsyncStorage.getItem(COFFEE)
    .then((value) => {
      if (value) {
        this.setState({
          coffee: parseFloat(value),
        });
      }
    })
    .done();

    AsyncStorage.getItem(WATER)
    .then((value) => {
      if (value) {
        this.setState({
          water: parseInt(value, 10),
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
          parentCoffeeCallback={this._onCoffeeChange}
          parentWaterCallback={this._onWaterChange}
        />
      );
    } else if (route.index === 1) {
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
      water: Math.floor(this.state.coffee / +value),
    });
  }

  _onCoffeeChange(value) {
    var water = Math.round((value * 10000) / (+this.state.ratio * 10000));

    this.setState({
      coffee: value,
      water: water,
    });

    AsyncStorage.setItem(COFFEE, value.toString());
    AsyncStorage.setItem(WATER, water.toString());
  }

  _onWaterChange(value) {
    var coffee = (((value * 10000) * (+this.state.ratio * 10000)) / 100000000);

    this.setState({
      water: value,
      coffee: coffee,
    });

    AsyncStorage.setItem(WATER, value.toString());
    AsyncStorage.setItem(COFFEE, coffee.toString());
  }
};

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#eee',
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
