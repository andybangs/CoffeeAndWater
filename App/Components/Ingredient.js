'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

class Ingredient extends React.Component{
  constructor(props) {
    super(props);
    this._onDecPress = this._onDecPress.bind(this);
    this._onIncPress = this._onIncPress.bind(this);
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.props.color}]}>
        <Text style={styles.header}>
          {this.props.header}
        </Text>
        <View style={styles.valueContainer}>
          <TouchableHighlight style={styles.edge} onPress={this._onDecPress}>
            <Text style={styles.operator}>-</Text>
          </TouchableHighlight>
          <View style = {styles.center}>
            <Text style={styles.value}>
              {this.props.value}
            </Text>
          </View>
          <TouchableHighlight style={styles.edge} onPress={this._onIncPress}>
            <Text style={styles.operator}>+</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  _onDecPress() {
    this.props.parentCallback((+this.props.value * 10 - this.props.step * 10) / 10);
  }

  _onIncPress() {
    this.props.parentCallback((+this.props.value * 10 + this.props.step * 10) / 10);
  }
};

Ingredient.propTypes = {
  header: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired, // coffee: string, water: number
  step: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired,
  parentCallback: React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    height: 302,
    justifyContent: 'center',
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
  value: {
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

module.exports = Ingredient;
