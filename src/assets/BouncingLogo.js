import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'

const AnimatedPath = Animated.createAnimatedComponent(Path)

const BouncingSVG = () => {
  // Shared values for translate and scale
  const translate = useSharedValue(0)
  const scale = useSharedValue(1)

  React.useEffect(() => {
    // Unified animation for translate and scale
    translate.value = withRepeat(
      withTiming(-10, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    )
    scale.value = withRepeat(
      withTiming(1, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -2,
      true
    )
  }, [])

  // Animated style for all paths
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translate.value },
      { scaleX: scale.value },
      { scaleY: scale.value },
    ],
  }))

  return (
    <View style={{ width: 70, height: 30 }}>
      <Svg width="100%" height="100%" viewBox="0 0 915 476" fill="none">
        {/* Path 1 */}
        <AnimatedPath
          d="M412.835 476V50.5002L523.503 0V476H412.835Z"
          fill="#FF6B00"
          transformOrigin="center"
          style={animatedStyle}
        />

        {/* Path 2 */}
        <AnimatedPath
          d="M818.053 235.306L915 333.591L907.101 341.694L839.581 410.561L831.728 402.552L742.633 312.231L646.227 410.561L570.809 333.637L667.214 235.306L578.662 144.48L570.853 136.423L578.706 128.369L638.329 67.5561L646.272 59.5L742.633 158.382L839.581 59.5L915 136.423L818.053 235.306Z"
          fill="#FF6B00"
          transformOrigin="center"
          style={animatedStyle}
        />

        {/* Path 3 */}
        <AnimatedPath
          fillRule="evenodd"
          clipRule="evenodd"
          d="M234.741 71.4463V86.3153C214.115 77.0631 191.323 71.8604 167.357 71.8604C74.9225 71.9067 0 148.278 0 242.557C0 336.837 74.9225 413.255 167.357 413.255C191.323 413.255 214.115 408.053 234.741 398.8V415.556H345.41V71.4463H234.741ZM234.741 246.241C232.846 282.516 203.418 311.381 167.357 311.381C131.295 311.381 99.8814 280.582 99.8814 242.557C99.8814 204.533 130.075 173.736 167.357 173.736C204.637 173.736 232.846 202.6 234.741 238.874V246.241Z"
          fill="#FF6B00"
          transformOrigin="center"
          style={animatedStyle}
        />
      </Svg>
    </View>
  )
}

export default BouncingSVG
