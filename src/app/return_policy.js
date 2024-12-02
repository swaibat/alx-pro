import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { DotOutline } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'

const BulletPoint = ({ children }) => (
  <View style={styles.bulletContainer}>
    <DotOutline size={25} weight="fill" style={styles.bulletIcon} />
    <Text style={styles.bulletText}>{children}</Text>
  </View>
)

const ReturnPolicyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Return Policy</Text>
      <Text style={styles.date}>Effective Date: 2025/01/03</Text>

      <Text style={styles.heading}>Eligibility for Returns</Text>
      <BulletPoint>
        Items must be returned within <Text style={styles.bold}>7 days</Text> of
        delivery.
      </BulletPoint>
      <BulletPoint>
        Products must be in their original packaging, unused, and with all tags
        and labels intact.
      </BulletPoint>
      <BulletPoint>
        The original receipt or proof of purchase is required.
      </BulletPoint>

      <Text style={styles.subHeading}>Exceptions</Text>
      <BulletPoint>
        Perishable goods such as food and flowers are non-returnable.
      </BulletPoint>
      <BulletPoint>
        Personal care items such as cosmetics and undergarments cannot be
        returned.
      </BulletPoint>
      <BulletPoint>
        Items marked as <Text style={styles.bold}>Final Sale</Text> or
        <Text style={styles.bold}>Non-Returnable</Text> are not eligible for
        returns.
      </BulletPoint>

      <Text style={styles.heading}>Return Process</Text>
      <BulletPoint>
        Log in to your ALX account and navigate to
        <Text style={styles.bold}>My Orders</Text>.
      </BulletPoint>
      <BulletPoint>
        Select the item you want to return and provide a reason with images if
        applicable.
      </BulletPoint>
      <BulletPoint>
        Once approved, follow the provided instructions to return the item.
      </BulletPoint>

      <Text style={styles.heading}>Refunds</Text>
      <BulletPoint>
        Refunds are issued to the original payment method within
        <Text style={styles.bold}>3–7 business days</Text> after inspection.
      </BulletPoint>
      <BulletPoint>
        For Alibaba items, timelines may vary depending on the supplier’s
        policies.
      </BulletPoint>
      <BulletPoint>
        Store credits can be requested and processed within
        <Text style={styles.bold}>24 hours</Text> of approval.
      </BulletPoint>

      <Text style={styles.heading}>Damaged or Defective Items</Text>
      <BulletPoint>
        Issues must be reported within <Text style={styles.bold}>48 hours</Text>
        of delivery with supporting images.
      </BulletPoint>

      <Text style={styles.heading}>Contact Us</Text>
      <BulletPoint>
        <Text style={styles.bold}>Phone:</Text> +256 200957272
      </BulletPoint>
      <BulletPoint>
        <Text style={styles.bold}>Email:</Text> support@alx.com
      </BulletPoint>
      <BulletPoint>
        <Text style={styles.bold}>Live Chat:</Text> Available on the ALX app.
      </BulletPoint>

      <Text style={styles.footer}>Thank you for shopping with ALX!</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 20,
  },
  heading: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 8,
    marginLeft: 20,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletIcon: {
    marginRight: 10,
    marginTop: 4,
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 17,
    flex: 1,
  },
  bold: {
    fontWeight: '500',
    marginHorizontal: 5,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
})

export default ReturnPolicyScreen
