'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

var Ingredient = require('./Ingredient');

class MainScreen extends React.Component{
  constructor(props) {
    super(props);
    this._onCoffeeChange = this._onCoffeeChange.bind(this);
    this._onWaterChange = this._onWaterChange.bind(this);
    this.state = {
      ratio: this.props.ratio,
      coffee: this.props.coffee,
      water: this.props.water,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Ingredient
          header={'coffee (g)'}
          number={this.state.coffee}
          color={'#b86b46'}
          parentCallback={this._onCoffeeChange} />
        <Ingredient
          header={'water (g)'}
          number={this.state.water}
          color={'#65bdd9'}
          parentCallback={this._onWaterChange} />
      </View>
    );
  }

  _onCoffeeChange(value) {
    this.setState({
      coffee: value,
      water: Math.floor(value / this.state.ratio),
    });
  }

  _onWaterChange(value) {
    this.setState({
      water: value,
      coffee: Math.floor(value * this.state.ratio),
    });
  }
};

MainScreen.propTypes = {
  ratio: React.PropTypes.string.isRequired,
  coffee: React.PropTypes.number.isRequired,
  water: React.PropTypes.number.isRequired,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f1e7c9', // visible beneath navbar
  },
});

module.exports = MainScreen;
