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
      <View style={{height: 302, justifyContent: 'center', backgroundColor: this.props.color}}>
        <Text style={styles.header}>
          {this.props.header}
        </Text>
        <View style={styles.valueContainer}>
          <TouchableHighlight style={styles.edge} onPress={this._onDecPress}>
            <Text style={styles.operator}>-</Text>
          </TouchableHighlight>
          <View style = {styles.center}>
            <Text style={styles.number}>
              {this.props.number}
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
    this.props.parentCallback(this.props.number - 1);
  }

  _onIncPress() {
    this.props.parentCallback(this.props.number + 1);
  }
};

Ingredient.propTypes = {
  header: React.PropTypes.string.isRequired,
  number: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired,
  parentCallback: React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {},  // Set inline to have access to this.props.color
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

module.exports = Ingredient;
