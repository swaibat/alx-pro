import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Text } from '@/components/@ui/Text'

const PrivacyPolicy = () => {
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* Introduction */}
        <Text style={styles.subheading}>1. Introduction</Text>
        <Text secondary style={styles.text}>
          Welcome to <Text style={styles.highlight}>alx.ug</Text>. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your
          information when you visit or make a purchase from our platform.
          Please read this policy carefully to understand our views and
          practices regarding your personal data.
        </Text>

        {/* Data Collection */}
        <Text style={styles.subheading}>2. Data Collection</Text>
        <Text secondary style={styles.text}>
          We collect various types of information, including personal
          information you provide directly, data collected automatically during
          usage, and data from third-party services. This may include your{' '}
          <Text style={styles.highlight}>
            name, email address, phone number, payment information, and
            location.
          </Text>
        </Text>

        {/* Use of Collected Data */}
        <Text style={styles.subheading}>3. Use of Collected Data</Text>
        <Text secondary style={styles.text}>
          We use your personal data to provide and improve our services, process
          your transactions, communicate with you, and customize your shopping
          experience. Additionally, we may use it for marketing and promotional
          purposes, with your consent.
        </Text>

        {/* Data Sharing and Disclosure */}
        <Text style={styles.subheading}>4. Data Sharing and Disclosure</Text>
        <Text secondary style={styles.text}>
          We do not sell your personal information. However, we may share your
          data with trusted third-party service providers who assist in
          delivering our services (e.g., payment processors, delivery partners)
          or to comply with legal obligations.
        </Text>

        {/* Data Security */}
        <Text style={styles.subheading}>5. Data Security</Text>
        <Text secondary style={styles.text}>
          We use various security measures to protect your personal information,
          including encryption and secure server technologies. However, no
          method of transmission over the Internet is entirely secure, and we
          cannot guarantee the absolute security of your data.
        </Text>

        {/* Cookies and Tracking Technologies */}
        <Text style={styles.subheading}>
          6. Cookies and Tracking Technologies
        </Text>
        <Text secondary style={styles.text}>
          Our platform may use cookies and other tracking technologies to
          enhance user experience, analyze site traffic, and deliver targeted
          advertisements. You can control cookie preferences through your
          browser settings.
        </Text>

        {/* Your Rights */}
        <Text style={styles.subheading}>7. Your Rights</Text>
        <Text secondary style={styles.text}>
          You have the right to access, correct, or delete your personal data
          held by us. You may also opt out of marketing communications at any
          time. To exercise your rights, please contact us at{' '}
          <Text style={styles.highlight}>support@alx.ug</Text>.
        </Text>

        {/* Data Retention */}
        <Text style={styles.subheading}>8. Data Retention</Text>
        <Text secondary style={styles.text}>
          We will retain your personal data for as long as necessary to provide
          you with our services and fulfill the purposes outlined in this
          policy, or as required by law.
        </Text>

        {/* Changes to the Privacy Policy */}
        <Text style={styles.subheading}>9. Changes to the Privacy Policy</Text>
        <Text secondary style={styles.text}>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or legal requirements. We will notify you of any
          significant changes by updating the &ldquo;Last Updated&rdquo; date
          below or through other communication methods.
        </Text>

        {/* Contact Information */}
        <Text style={styles.subheading}>10. Contact Information</Text>
        <Text secondary style={styles.text}>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at
          <Text style={styles.highlight}>support@alx.ug</Text>.
        </Text>

        {/* Last Updated */}
        <Text style={styles.lastUpdated}>Last updated: October 23, 2024</Text>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainerStyle: { paddingBottom: 30 },
  subheading: {
    marginTop: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  text: {
    lineHeight: 20,
  },
  highlight: {
    fontWeight: '500',
  },
  lastUpdated: {
    fontSize: 14,
    marginTop: 20,
    color: '#888',
  },
})

export default PrivacyPolicy
