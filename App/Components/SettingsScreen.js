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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>
          {this.props.ratio}
        </Text>
        <Text style={styles.ratio}>
          1:{Math.round(10000 / (+this.props.ratio * 10000))}
        </Text>
        <SliderIOS
          style={styles.slider}
          value={Math.round(10000 / (+this.props.ratio * 10000))}
          maximumValue={20}
          minimumValue={10}
          onValueChange={this._onValueChange} />
      </View>
    );
  }

  _onValueChange(value) {
    this.props.parentCallback((1 / value).toFixed(4));
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
