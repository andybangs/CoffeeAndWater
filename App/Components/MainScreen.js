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
  }

  render() {
    return (
      <View style={styles.container}>
        <Ingredient
          header={'coffee (g)'}
          value={this.props.coffee.toFixed(1)}
          step={0.1}
          color={'#b86b46'}
          parentCallback={this._onCoffeeChange} />
        <Ingredient
          header={'water (g)'}
          value={this.props.water}
          step={1}
          color={'#65bdd9'}
          parentCallback={this._onWaterChange} />
      </View>
    );
  }

  _onCoffeeChange(value) {
    this.props.parentCoffeeCallback(value);
  }

  _onWaterChange(value) {
    this.props.parentWaterCallback(value);
  }
};

MainScreen.propTypes = {
  ratio: React.PropTypes.number.isRequired,
  coffee: React.PropTypes.number.isRequired,
  water: React.PropTypes.number.isRequired,
  parentCoffeeCallback: React.PropTypes.func.isRequired,
  parentWaterCallback: React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#f1e7c9',
  },
});

module.exports = MainScreen;
