import React, { useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import Svg, { Rect } from 'react-native-svg'
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import { colors } from '@/constants/theme'

const AnimatedRect = Animated.createAnimatedComponent(Rect)

const ProgressBar = () => {
  const { width } = Dimensions.get('window') // Get screen width dynamically
  const progressWidth = useSharedValue(0)

  useEffect(() => {
    progressWidth.value = withRepeat(
      withTiming(width, {
        // Animate to the full screen width
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    )
  }, [width])

  const animatedProps = useAnimatedProps(() => ({
    width: progressWidth.value,
  }))

  return (
    <View
      style={{
        height: 35,
      }}
    >
      <Svg width={width} height="40" viewBox={`0 0 ${width} 40`}>
        <Rect x="0" y="15" width={width} height="20" fill="#003F5F" />

        <AnimatedRect
          x="0"
          y="15"
          height="20"
          fill={colors.orange[500]}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  )
}

export default ProgressBar
