import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import ImageList from './ImageList'
import styles from './Styles'

class ImageSlider extends Component {
  static defaultProps = {
    images: [],
    dots: {},
  }

  state = {
    width: null,
    height: null,
  }

  handleLayout = ({ nativeEvent }) => {
    const { editor } = this.props

    if (editor) return

    const { width, height } = (nativeEvent && nativeEvent.layout) || {}
    const { width: prevWidth, height: prevHeight } = this.state

    if (width !== prevWidth || height !== prevHeight) {
      this.setState({ width, height })
    }
  }

  getDimensions() {
    let { editor, _width, _height } = this.props

    if (editor) {
      return { width: _width, height: _height }
    }

    return this.state
  }

  render() {
    const { width, height } = this.getDimensions()
    const { images, dots, editor } = this.props

    if (width === null || height === null) {
      return <View style={styles.wrapper} onLayout={this.handleLayout} />
    }

    let dotsEnabled = dots.enabled

    return (
      <View style={styles.wrapper} onLayout={this.handleLayout}>
        <ImageList
          editor={editor}
          images={images}
          containerWidth={width}
          containerHeight={height}
          dotsEnabled={dotsEnabled}
          paddingBottom={!dotsEnabled || dots.position === 'inside' ? 0 : 40}
          activeColor={dots.activeColor}
          inactiveColor={dots.inactiveColor}
        />
      </View>
    )
  }
}

export default ImageSlider
