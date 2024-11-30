import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { CaretDown } from 'phosphor-react-native'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'

const FAQScreen = () => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
  const [searchQuery, setSearchQuery] = React.useState('')

  const faqContent = [
    {
      category: 'General',
      questions: [
        {
          question: 'How do I make a purchase?',
          answer:
            "When you find a product you want to purchase, tap on it to view the product details, and then tap the 'Add to Cart' button.",
        },
        {
          question: 'How do I use discount codes?',
          answer:
            'During checkout, enter the discount code in the designated box, and the discount will apply if valid.',
        },
        {
          question: 'Do you deliver outside Uganda?',
          answer: 'No, we only deliver within Uganda.',
        },
        {
          question: 'How can I contact customer support?',
          answer:
            'You can contact customer support at support@alx.ug or call 0200922167.',
        },
      ],
    },
    {
      category: 'Account',
      questions: [
        {
          question: 'How do I create an account?',
          answer:
            "Tap on 'Sign Up' and follow the steps to create an account using your email or social login options.",
        },
        {
          question: 'How do I reset my password?',
          answer:
            "Go to the login screen and tap 'Forgot Password' to receive instructions on resetting your password.",
        },
        {
          question: 'How do I delete my account?',
          answer:
            'Please contact customer support to request account deletion.',
        },
      ],
    },
    // Add other categories here
  ]

  const allFAQs = faqContent.flatMap(category => category.questions)

  const filteredFAQs = searchQuery
    ? allFAQs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqContent[selectedTabIndex].questions

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.tabContainer}>
        {faqContent.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, selectedTabIndex === index && styles.activeTab]}
            onPress={() => setSelectedTabIndex(index)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTabIndex === index && styles.activeTabText,
              ]}
            >
              {item.category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search for questions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <CaretDown size={20} color="#007bff" style={styles.searchIcon} />
      </View>

      <View style={styles.divider} />

      <ScrollView style={styles.container}>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text secondary>{faq.answer}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>No results found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: colors.grey[300],
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderColor,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  faqItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  faqQuestion: {
    marginBottom: 4,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
})

export default FAQScreen
