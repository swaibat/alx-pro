import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Svg, { Rect } from 'react-native-svg'
import Tooltip from 'react-native-walkthrough-tooltip'
import { Text } from '@/components/@ui/Text'

const VerticalProgressBar = ({ progress, label, color, tooltipText }) => {
  const [isTooltipVisible, setTooltipVisible] = React.useState(false)

  return (
    <View style={styles.container}>
      <Tooltip
        isVisible={isTooltipVisible}
        content={<Text>{tooltipText}</Text>}
        placement="top"
        onClose={() => setTooltipVisible(false)}
      >
        <TouchableOpacity onPress={() => setTooltipVisible(true)}>
          <Svg height="70" width="15">
            <Rect x="0" y="0" width="15" height="70" rx="0" fill="#E0E0E0" />
            <Rect
              x="0"
              y={70 - progress}
              width="15"
              height={progress}
              fill={color}
            />
          </Svg>
        </TouchableOpacity>
      </Tooltip>
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
})

export default VerticalProgressBar
