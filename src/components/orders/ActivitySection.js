import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@/components/@ui/Text'
import { activityTypeEnum } from '@/components/orders/ActivityTypeEnum'
import { colors } from '@/constants/theme'

const ActivitySection = ({ activities }) => (
  <View>
    {activities.map((activity, index) => (
      <View key={activity._id} style={styles.activityContainer}>
        <View style={styles.progressBar}>
          <View
            style={index < activities.length - 1 && styles.progressConnector}
          />
        </View>
        <View style={styles.activityContent}>
          <View style={styles.iconContainer}>
            {activityTypeEnum[activity.type]?.icon}
          </View>
          <View style={styles.activityTextContainer}>
            <View style={styles.headerRow}>
              <Text bold style={styles.activityType}>
                {activity.type.replace('_', ' ').toLowerCase()}
              </Text>
              <Text style={styles.timestamp}>
                {new Date(activity.timestamp).toLocaleString()}
              </Text>
            </View>
            <Text>{activityTypeEnum[activity.type]?.description}</Text>
          </View>
        </View>
      </View>
    ))}
  </View>
)

const styles = StyleSheet.create({
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  progressBar: {
    width: 1,
    marginLeft: 10,
    alignItems: 'center',
    marginRight: -8,
  },
  progressConnector: {
    height: 60,
    width: 1,
    borderStyle: 'dashed',
    borderWidth: 0.8,
    borderColor: colors.borderColor,
    position: 'absolute',
    top: 6,
    left: 4,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 50,
  },
  activityTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityType: {
    textTransform: 'capitalize',
    marginTop: 15,
  },
  timestamp: {
    fontSize: 10,
    color: '#666',
  },
})

export default ActivitySection
