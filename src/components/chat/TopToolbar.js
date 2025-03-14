import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CaretLeft } from 'phosphor-react-native'
import Logo from '@/assets/Logo'
import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { Text } from '@/components/@ui/Text'

export default function TopToolbar() {
  const router = useRouter()

  return (
    <View style={styles.toolbar}>
      <View style={styles.toolbarContent}>
        <TouchableOpacity onPress={() => router.back()}>
          <CaretLeft weight="bold" />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Logo />
        </View>
        <View>
          <Text style={styles.userName}>Support</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.onlineStatus,
                { backgroundColor: theme.colors.success[300] },
              ]}
            />
            <Text style={styles.statusText}>We’ll reply as soon as we can</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 5,
    borderColor: '#004F70',
    backgroundColor: '#004F70',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  onlineStatus: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  statusText: {
    fontSize: 12,
    color: theme.colors.grey[600],
  },
})
