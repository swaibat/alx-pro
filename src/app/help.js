import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Linking,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { WhatsappLogo, Globe, Phone, Envelope } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'

const HelpCenterScreen = () => {
  const data = [
    {
      title: 'WhatsApp',
      meta: 'Chat with us on WhatsApp',
      icon: () => <WhatsappLogo size={24} color="#25D366" />,
      onPress: () => Linking.openURL('https://wa.me/256758307272'),
    },
    {
      title: 'Website',
      meta: 'Visit our official website',
      icon: () => <Globe size={24} color="#007bff" />,
      onPress: () => Linking.openURL('https://alx.ug'),
    },
  ]

  const contactDetails = [
    {
      label: 'Customer Support',
      number: '+256 123 456 789',
      email: 'support@alx.ug',
    },
    {
      label: 'Technical Support',
      number: '+256 987 654 321',
      email: 'tech@alx.ug',
    },
  ]

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.listItemContainer} onPress={item.onPress}>
      <View style={styles.iconContainer}>{item.icon()}</View>
      <View style={styles.textContainer}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.metaText}>{item.meta}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderContactItem = ({ label, number, email }) => (
    <View key={label} style={styles.contactItemCard}>
      <View style={styles.contactItem}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.iconTextRow}>
            <Phone size={20} color="#007bff" weight="fill" />
          </View>
          <Text
            style={styles.contactNumber}
            onPress={() => Linking.openURL(`tel:${number}`)}
          >
            {number}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.iconTextRow}>
            <Envelope size={20} color="#007bff" weight="fill" />
          </View>
          <Text
            style={styles.contactEmail}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          >
            {email}
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>
            We’re Here for You, Anytime!
          </Text>
          <Text style={styles.descriptionText}>
            At ALX, we prioritize your convenience and peace of mind. Our Help
            Center is available 24/7, ready to assist with any inquiries,
            whether it’s for general support, technical assistance, or just a
            quick chat. Feel free to reach out anytime through our listed
            contact options below.
          </Text>
        </View>
        <Text style={styles.contactCardTitle}>Contact Center</Text>
        {contactDetails.map(contact => renderContactItem(contact))}
        <FlatList
          data={data}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  descriptionContainer: {
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#E8F0FE',
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listItemTitle: {
    fontWeight: '600',
    color: '#333',
  },
  metaText: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  contactCardTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },
  contactItemCard: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
  },
  contactItem: {
    gap: 10,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6,
  },
  contactNumber: {
    fontSize: 15,
    color: '#007bff',
    marginLeft: 5,
  },
  contactEmail: {
    fontSize: 15,
    color: '#007bff',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
})

export default HelpCenterScreen
