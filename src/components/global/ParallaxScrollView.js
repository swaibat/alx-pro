import Input from '@/components/@ui/Input'
import { useRouter } from 'expo-router'
import { MagnifyingGlass } from 'phosphor-react-native'
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import Logo from '@/assets/Logo'
import { Text } from '@/components/@ui/Text'
import { colors } from '@/constants/theme'
import { theme } from '@/constants/theme'

const HEADER_HEIGHT = 150

export default function ParallaxScrollView({ children, headerImage }) {
  const router = useRouter()

  return (
    <View style={styles.container}>
      {/* Sticky Search Bar */}
      <View style={styles.inputContainer}>
        <View style={{ height: 140 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 80,
              paddingTop: 15,
            }}
          >
            <View style={{ width: 40 }}>
              <Logo />
            </View>
            <View
              style={{
                backgroundColor: colors.orange[400],
                paddingHorizontal: theme.spacing.md,
                justifyContent: 'center',
                borderRadius: theme.borderRadius.sm,
              }}
            >
              <Text
                style={{
                  color: colors.grey[200],
                }}
              >
                uganda
              </Text>
            </View>
          </View>
          <View>
            <Input
              placeholder="Search..."
              onFocus={() => router.push('/search')}
              textStyle={{ fontSize: 15, color: 'black' }}
              suffix={
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: -2,
                    gap: theme.spacing.sm,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'black',
                      borderRadius: theme.borderRadius.sm,
                      padding: theme.spacing.sm,
                    }}
                  >
                    <MagnifyingGlass size={24} weight="light" />
                  </TouchableOpacity>
                </View>
              }
              style={{ borderColor: 'white' }}
            />
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}>
        <View style={styles.header}>{headerImage}</View>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.orange[500],
    zIndex: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: 'red',
    borderRadius: 5,
    height: 40,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '95%',
    marginHorizontal: 'auto',
    borderRadius: 10,
    marginTop: 20,
  },
  content: {
    flex: 1,
    gap: 16,
    overflow: 'hidden',
  },
})
