import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Text } from '@/components/@ui/Text'

const TermsOfService = () => {
  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Introduction */}
        <Text style={[styles.subheading]}>1. Introduction</Text>
        <Text secondary style={styles.text}>
          Welcome to <Text style={[styles.highlight]}>alx.ug</Text>. By
          accessing or using our mobile application, you agree to comply with
          and be bound by these Terms of Service. These terms govern your use of
          our services, so please read them carefully.
        </Text>

        {/* Use of the Service */}
        <Text style={[styles.subheading]}>2. Use of the Service</Text>
        <Text secondary style={styles.text}>
          You must be at least{' '}
          <Text style={[styles.highlight]}>18 years of age</Text> to use our
          service. By agreeing to these terms, you confirm that you are of legal
          age and are fully able and competent to enter into these terms and
          conditions.
        </Text>

        {/* Account Responsibilities */}
        <Text style={[styles.subheading]}>3. Account Responsibilities</Text>
        <Text secondary style={styles.text}>
          You are responsible for maintaining the confidentiality of your
          account and password and for restricting access to your account. You
          agree to accept responsibility for all activities that occur under
          your account.
        </Text>

        {/* Payment and Fees */}
        <Text style={[styles.subheading]}>4. Payment and Fees</Text>
        <Text secondary style={styles.text}>
          All fees and charges are detailed in your account settings and are
          subject to change. Any additional fees or taxes will be notified to
          you upon purchase.
        </Text>

        {/* Intellectual Property */}
        <Text style={[styles.subheading]}>5. Intellectual Property</Text>
        <Text secondary style={styles.text}>
          All content included in or made available through our services, such
          as text, graphics, logos, and software, is the property of{' '}
          <Text style={[styles.highlight]}>alx.ug</Text> and is protected by
          copyright laws.
        </Text>

        {/* User Conduct */}
        <Text style={[styles.subheading]}>6. User Conduct</Text>
        <Text secondary style={styles.text}>
          You agree not to misuse our services, such as using it for unlawful
          purposes, distributing malware, or infringing on others&apos;
          intellectual property. We reserve the right to terminate your access
          for violations of these terms.
        </Text>

        {/* Termination */}
        <Text style={[styles.subheading]}>7. Termination</Text>
        <Text secondary style={styles.text}>
          We may terminate or suspend your access to the service without notice
          or liability if you breach any of the terms outlined in this
          agreement.
        </Text>

        {/* Limitation of Liability */}
        <Text style={[styles.subheading]}>8. Limitation of Liability</Text>
        <Text secondary style={styles.text}>
          In no event shall <Text style={[styles.highlight]}>ALX.UG</Text> be
          liable for any indirect, incidental, special, or consequential damages
          arising out of or in connection with the use of the service.
        </Text>

        {/* Changes to the Terms */}
        <Text style={[styles.subheading]}>9. Changes to the Terms</Text>
        <Text secondary style={styles.text}>
          We reserve the right to modify these terms at any time. If changes are
          made, we will notify you by updating the terms on our platform.
          Continued use of the service after any modifications will constitute
          your agreement to the new terms.
        </Text>

        {/* Contact Information */}
        <Text style={[styles.subheading]}>10. Contact Information</Text>
        <Text secondary style={styles.text}>
          If you have any questions or concerns regarding these terms, please
          contact us at <Text style={[styles.highlight]}>support@alx.ug</Text>.
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
  heading: {
    marginBottom: 20,
  },
  subheading: {
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    lineHeight: 20,
  },
  highlight: {},
  lastUpdated: {
    fontSize: 14,
    marginTop: 20,
    color: '#888',
  },
})

export default TermsOfService
