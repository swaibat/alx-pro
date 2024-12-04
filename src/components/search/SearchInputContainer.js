import React from 'react'
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Text } from '@/components/@ui/Text'
import Input from '@/components/@ui/Input'
import { X } from 'phosphor-react-native'
import { theme } from '@/constants/theme'

const SearchInputContainer = ({
  searchQuery,
  onChangeSearch,
  handleSearchButton,
  productLoading,
  clearSearchQuery,
}) => (
  <View style={styles.container}>
    <View style={styles.inputRow}>
      <Input
        placeholder="Search"
        style={styles.input}
        textStyle={styles.textInput}
        suffix={
          <View style={styles.suffixContainer}>
            {productLoading && <ActivityIndicator size="small" color="grey" />}
            {!productLoading && searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearchQuery}>
                <X size={18} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchButton}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        }
        value={searchQuery}
        onChangeText={onChangeSearch}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  inputRow: { flexDirection: 'row', width: '100%' },
  input: { flexGrow: 1 },
  textInput: { fontSize: 14 },
  suffixContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchButton: {
    backgroundColor: 'black',
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    paddingHorizontal: 10,
  },
  searchButtonText: { color: '#FFFFFF' },
})

export default SearchInputContainer
