import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native'
import {
  MapPin,
  User,
  Phone,
  Circle,
  CheckCircle,
  House,
  Briefcase,
} from 'phosphor-react-native'
import DeleteConfirmationModal from './DeleteConfirmationModal'
import { Text } from '@/components/@ui/Text'
import Divider from '@/components/@ui/Divider'
import { theme } from '@/constants/theme'
import { useMakeDefaultAddressMutation } from '@/api'
import Constants from 'expo-constants'

const { MAPS_API_URL, GOOGLE_API_KEY } = Constants.expoConfig.extra

const AddressItem = ({
  address,
  refetch,
  viewOnly,
  isFetching,
  renderSelectComponent,
}) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)

  const [makeDefaultAddress, { isLoading }] = useMakeDefaultAddressMutation()

  const handleMakeDefault = async () => {
    try {
      await makeDefaultAddress(address._id).unwrap()
      refetch()
    } catch (error) {
      console.error('Failed to mark as default:', error)
    }
  }

  const handleDeleteAddress = async () => {
    setDeleteModalVisible(false)
    refetch()
  }

  const renderLabelIcon = () => {
    if (address.addressLabel === 'Home') {
      return <House size={16} />
    } else if (address.addressLabel === 'Office') {
      return <Briefcase size={16} />
    }
    return null
  }

  return (
    <View style={styles.card}>
      {address.geo && (
        <Image
          source={{
            uri: `${MAPS_API_URL}/staticmap?key=${GOOGLE_API_KEY}&center=${address.geo[0]},${address.geo[1]}&zoom=15&size=420x70&maptype=roadmap&markers=color:red%7C${address.geo[0]},${address.geo[1]}&sensor=false`,
          }}
          style={styles.mapImage}
        />
      )}
      <View style={styles.addressRow}>
        <MapPin size={20} />
        <Text style={styles.addressText}>{address.addressName}</Text>
        <View style={styles.addressLabelContainer}>
          {renderLabelIcon()}
          <Text style={styles.addressLabel}>
            {address.addressLabel || 'Home'}
          </Text>
        </View>
        {!viewOnly && (
          <TouchableOpacity
            style={styles.radio}
            onPress={handleMakeDefault}
            disabled={isLoading || isFetching}
          >
            {isLoading || isFetching ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.orange[500]}
              />
            ) : address.isDefault ? (
              <CheckCircle
                size={25}
                color={theme.colors.orange[500]}
                weight="fill"
              />
            ) : (
              <Circle size={25} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <Divider style={styles.divider} />
      <View style={styles.actionRow}>
        <View style={styles.addressInfo}>
          <User size={18} />
          <Text style={styles.infoText}>{address.name}</Text>
          <Divider style={styles.infoDivider} />
          <Phone size={18} />
          <Text style={styles.infoText}>{address.phoneNumber}</Text>
        </View>
        {!viewOnly && (
          <View style={styles.actionButtons}>
            <DeleteConfirmationModal
              isVisible={isDeleteModalVisible}
              refetch={refetch}
              onClose={() => setDeleteModalVisible(false)}
              onDelete={handleDeleteAddress}
              address={address}
            />
          </View>
        )}
      </View>
      {renderSelectComponent && (
        <>
          <Divider style={styles.selectComponentDivider} />
          {renderSelectComponent}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 7,
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: theme.colors.grey[400],
    backgroundColor: '#FFFFFF',
  },
  mapImage: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    marginBottom: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressLabelContainer: {
    backgroundColor: '#EDF1F7',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 3,
    gap: 5,
    borderRadius: theme.borderRadius.sm,
  },
  addressLabel: {
    fontSize: 12,
    borderRadius: 6,
  },
  addressText: {
    marginLeft: 10,
    fontSize: 13,
    flex: 1,
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radio: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 5,
    marginLeft: 5,
  },
  divider: {
    marginTop: 5,
    marginBottom: 0,
  },
  infoDivider: {
    marginHorizontal: 10,
    height: 5,
    borderWidth: 0.5,
    borderColor: theme.colors.grey[300],
  },
  selectComponentDivider: {
    marginTop: 5,
  },
})

export default AddressItem
