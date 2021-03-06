// @flow

import React, { Component } from 'react';
import { PanResponder, ScrollView, StyleSheet, View } from 'react-native';

const DEFAULT_HEIGHT = 300;

type Props = {};

type State = {};

export default class ExampleTouch extends Component<Props, State> {
  props: Props;

  state: State = {};

  _height = DEFAULT_HEIGHT;
  _panResponder = {};
  _panelRef;

  static navigationOptions = {
    title: 'Touch',
  };

  componentWillMount() {
    console.log('componentWillMount');
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => {
        console.log('onStartShouldSetPanResponder');
        return true;
        // Do not allow this view to become responder on the start of a touch,
        // because we want the scroll view to handle touch first.
        //return false;
      },
      onMoveShouldSetPanResponder: (event, gestureState) => {
        console.log('onMoveShouldSetPanResponder', gestureState.dx, gestureState.dy);
        // Called for every touch move on the View when it is not the responder.
        // When there is obvious touch movement vertically, clain touch responsiveness.
        return true;
        // const {dx, dy, vx, vy} = gestureState;
        // return Math.abs(dy) - Math.abs(dx) > 10 || Math.abs(vy) > Math.abs(vx) + 0.3;
      },
      onPanResponderMove: (event, gestureState) => {
        console.log('onPanResponderMove', gestureState.dx, gestureState.dy);
        // Touch moves.
        this._updatePanelViewNativeStyle(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        console.log('onPanResponderRelease', gestureState.dx, gestureState.dy);
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        const { dy } = gestureState;
        this._height -= dy;
      },
      onPanResponderTerminate: () => {
        console.log('onPanResponderTerminate');
        // Another component has become the responder, so this gesture
        // should be cancelled.
        // But panel may have been moved. Need to move it back.
        //LayoutAnimation.easeInEaseOut();
        this._updatePanelViewNativeStyle(0);
      },
    });
  }

  _updatePanelViewNativeStyle(dy: number) {
    this._panelRef &&
      this._panelRef.setNativeProps({
        style: { height: this._height - dy },
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View style={[styles.square, styles.color1]} />
          <View style={[styles.square, styles.color2]} />
          <View style={[styles.square, styles.color3]} />
          <View style={[styles.square, styles.color4]} />
          <View style={[styles.square, styles.color5]} />
        </ScrollView>
        <View
          key={'Panel'}
          style={styles.panel}
          ref={ref => (this._panelRef = ref)}
          {...this._panResponder.panHandlers}
        >
          <View style={styles.bar} />
          <ScrollView horizontal={true}>
            <View style={[styles.square, styles.color1]} />
            <View style={[styles.square, styles.color2]} />
            <View style={[styles.square, styles.color3]} />
            <View style={[styles.square, styles.color4]} />
            <View style={[styles.square, styles.color5]} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 80,
  },
  square: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  color1: {
    backgroundColor: 'lightgray',
  },
  color2: {
    backgroundColor: 'gray',
  },
  color3: {
    backgroundColor: 'blue',
  },
  color4: {
    backgroundColor: 'pink',
  },
  color5: {
    backgroundColor: 'orange',
  },

  panel: {
    position: 'absolute',
    height: DEFAULT_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: 'darkgray',
    bottom: 0,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bar: {
    height: 6,
    width: 40,
    borderRadius: 3,
    backgroundColor: 'gray',
    margin: 5,
  },
});
