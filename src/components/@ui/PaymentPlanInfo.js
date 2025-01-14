import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ClockCountdown } from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const PaymentPlanInfo = ({ product }) => {
  if (!product?.acceptInstallments) return null
  return (
    <View style={styles.paymentDetailsContainer}>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Total. UGX {product.price.toLocaleString()}
        </Text>
      </View>
      <View style={styles.installmentsMessage}>
        <ClockCountdown size={13} />
        <Text style={styles.installmentsText}>
          Pay Bal. in {product?.installments?.duration} Months
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  paymentDetailsContainer: {
    borderWidth: 0.8,
    borderRadius: 3,
    borderColor: colors.grey[600],
    flexDirection: 'row',
    marginRight: 'auto',
    padding: 5,
    gap: 10,
    paddingLeft: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    fontWeight: 'bold',
    color: colors.grey[800],
    fontSize: 11,
  },
  installmentsMessage: {
    padding: 3,
    borderRadius: 3,
    backgroundColor: colors.grey[200],
    flexDirection: 'row',
    alignItems: 'center',
  },
  installmentsText: {
    color: colors.grey[800],
    fontSize: 12,
    paddingHorizontal: 5,
  },
})

export default PaymentPlanInfo
