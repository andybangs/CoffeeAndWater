'use strict';

var React = require('react-native');
var {
  SliderIOS,
  StyleSheet,
  Text,
  View,
} = React;

class SettingsScreen extends React.Component{
  constructor(props) {
    super(props);
    this._onValueChange = this._onValueChange.bind(this);
    this.state = {
      ratio: this.props.ratio,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>
          {this.state.ratio}
        </Text>
        <Text style={styles.ratio}>
          1:{Math.floor(1 / this.state.ratio)}
        </Text>
        <SliderIOS
          style={styles.slider}
          value={Math.floor(1 / this.state.ratio)}
          maximumValue={20}
          minimumValue={10}
          onValueChange={this._onValueChange} />
      </View>
    );
  }

  _onValueChange(value) {
    var ratio = (1 / value).toFixed(4);
    this.setState({ ratio: ratio });
    this.props.parentCallback(ratio);
  }
};

SettingsScreen.propTypes = {
  ratio: React.PropTypes.string.isRequired,
  parentCallback: React.PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f1e7c9',
  },
  display: {
    textAlign: 'center',
    fontSize: 80,
  },
  ratio: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 150,
    marginBottom: 50
  },
  slider: {
    height: 10,
    margin: 50,
  },
});

module.exports = SettingsScreen;
