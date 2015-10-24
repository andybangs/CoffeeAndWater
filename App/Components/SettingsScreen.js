'use strict';

var React = require('react-native');
var {
  SliderIOS,
  StyleSheet,
  Text,
  View,
} = React;

class SettingsScreen extends React.Component{
  constructor() {
    super();
    this.state = {value: 16};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.display}>
          {(1/this.state.value).toFixed(4)}
        </Text>
        <Text style={styles.ratio}>
          1:{this.state.value}
        </Text>
        <SliderIOS
          style={styles.slider}
          value={16}
          maximumValue={20}
          minimumValue={10}
          onValueChange={(value) => this.setState({value: Math.floor(value)})} />
      </View>
    );
  }
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
