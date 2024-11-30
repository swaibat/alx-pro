import React from 'react'
import { View } from 'react-native'
import AirtelMoney from '@/assets/AirtelMoney'
import MOMO from '@/assets/MOMO'
import { CheckCircle } from 'phosphor-react-native'

const PaymentOption = ({ selected, type }) => {
  const getBorderColor = () => {
    switch (type) {
      case 'MTN':
        return selected ? 'orange' : '#dee4ec'
      case 'AIRTEL':
        return selected ? '#ED1C24' : '#dee4ec'
      default:
        return '#dee4ec'
    }
  }

  const getCheckIconColor = () => {
    switch (type) {
      case 'MTN':
        return 'orange'
      case 'AIRTEL':
        return '#ED1C24'
      default:
        return '#4CAF50'
    }
  }

  return (
    <View
      style={{
        padding: 10,
        width: '48%',
        borderWidth: 1,
        borderRadius: 1,
        borderColor: getBorderColor(),
      }}
    >
      <View style={{ alignItems: 'flex-start' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View style={{ marginRight: 4 }}>
            {type === 'MTN' ? <MOMO /> : <AirtelMoney />}
          </View>
          {selected && (
            <CheckCircle
              style={{ position: 'absolute', right: 0, top: 0 }}
              size={20}
              color={getCheckIconColor()}
              weight="fill"
            /> // Render check icon with dynamic color
          )}
        </View>
      </View>
    </View>
  )
}

export default PaymentOption
