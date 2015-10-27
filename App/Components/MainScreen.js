'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

class MainScreen extends React.Component{
  constructor() {
    super();

    this._onCoffeeDecPress = this._onCoffeeDecPress.bind(this);
    this._onCoffeeIncPress = this._onCoffeeIncPress.bind(this);
    this._onWaterDecPress = this._onWaterDecPress.bind(this);
    this._onWaterIncPress = this._onWaterIncPress.bind(this);

    this.state = {
      ratio: 0.0625,
      coffee: Math.floor(672 * 0.0625),
      water: Math.floor(42 / 0.0625),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.component1}>
          <Text style={styles.header}>
            coffee (g)
          </Text>
          <View style={styles.valueContainer}>
            <TouchableHighlight style={styles.edge} onPress={this._onCoffeeDecPress}>
              <Text style={styles.operator}>-</Text>
            </TouchableHighlight>
            <View style={styles.center}>
              <Text style={styles.number}>
                {this.state.coffee}
              </Text>
            </View>
            <TouchableHighlight style={styles.edge} onPress={this._onCoffeeIncPress}>
              <Text style={styles.operator}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.component2}>
          <Text style={styles.header}>
            water (g)
          </Text>
          <View style={styles.valueContainer}>
            <TouchableHighlight style={styles.edge} onPress={this._onWaterDecPress}>
              <Text style={styles.operator}>-</Text>
            </TouchableHighlight>
            <View style = {styles.center}>
              <Text style={styles.number}>
                {this.state.water}
              </Text>
            </View>
            <TouchableHighlight style={styles.edge} onPress={this._onWaterIncPress}>
              <Text style={styles.operator}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  _onCoffeeDecPress() {
    this.setState({
      coffee: this.state.coffee - 1,
      water: Math.floor((this.state.coffee - 1) / this.state.ratio),
    });
  }

  _onCoffeeIncPress() {
    this.setState({
      coffee: this.state.coffee + 1,
      water: Math.floor((this.state.coffee + 1) / this.state.ratio),
    });
  }

  _onWaterDecPress() {
    this.setState({
      water: this.state.water - 1,
      coffee: Math.floor((this.state.water - 1) * this.state.ratio),
    });
  }

  _onWaterIncPress() {
    this.setState({
      water: this.state.water + 1,
      coffee: Math.floor((this.state.water + 1) * this.state.ratio),
    });
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f1e7c9', // visible beneath navbar
  },
  component1: {
    height: 302,
    justifyContent: 'center',
    backgroundColor: '#b86b46',
  },
  component2: {
    height: 302,
    justifyContent: 'center',
    backgroundColor: '#65bdd9',
  },
  header: {
    alignSelf: 'center',
    fontSize: 40,
    color: '#333',
  },
  valueContainer: {
    flexDirection: 'row',
  },
  operator: {
    fontSize: 80,
    color: '#333',
  },
  number: {
    fontSize: 80,
    color: '#333',
  },
  edge: {
    flex: 1,
    alignItems: 'center',
  },
  center: {
    flex: 3,
    alignItems: 'center',
  },
});

module.exports = MainScreen;
