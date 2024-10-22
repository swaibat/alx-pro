import React, { useEffect, useState } from 'react';
import { Layout, Text, Divider, useTheme, Modal } from '@ui-kitten/components';
import { ScrollView, View, StyleSheet, Image, StatusBar } from 'react-native';
import { Heart, Clock, House, Headset, User, FileText, Repeat, Power, Users } from 'phosphor-react-native';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import Timer from '@/assets/icons/Timer';
import Transit from '@/assets/icons/Transit';
import { Appbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orders from '@/assets/icons/Orders';
import { TouchableOpacity } from 'react-native';

export default function Component() {
  const router = useRouter();
  const theme = useTheme();
  const [userName, setUserName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.user) {
          setUserName(userData.user.name);
        } else {
          router.push('login')
        }
      } else {
        router.push('login')
      }
    } catch (error) {
      console.error("Error fetching user data from local storage:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );


  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('@user', '');
      setModalVisible(false);
      router.replace('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerContainer: {
      alignItems: 'center',
      backgroundColor: '#111b2d',
      height: 50,
      // borderBottomWidth: 2,
      borderBottomColor: theme['color-primary-500'],
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40, // Circular avatar
      borderWidth: 2,
      backgroundColor: theme['color-basic-400'],
      borderColor: theme['color-basic-500'],
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    },
    avatarText: {
      color: theme['color-basic-700'],
      fontWeight: 'bold',
      fontSize: 24,
    },
    userNameText: {
      color: theme['color-basic-700'],
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 10,
    },
    cardContainer: {
      backgroundColor: theme['background-basic-color-1'],
      borderRadius: 8,
      marginBottom: 10,
      // padding: 15,
      shadowColor: theme['color-basic-transparent-300'],
    },
    sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      padding: 15
    },
    orderStatusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 16,
      borderBottomWidth: 10,
      padding: 15,
      borderBottomColor: theme['color-basic-400']
    },
    orderItem: {
      alignItems: 'center',
      width: '23%',
    },
    orderText: {
      marginTop: 8,
      flexWrap: 'wrap',
      textAlign: 'center',
      fontSize: 12,
      color: theme['text-hint-color'],
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingBottom: 25,
    },
    optionText: {
      fontSize: 14,
      color: theme['text-basic-color'],
    },
    modal: {
      margin: 0, // Remove default margins
      justifyContent: 'flex-end', // Align modal to the bottom
      height: '100%', // Ensure the modal takes full height
      width: '100%'
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Backdrop color
    },
    modalContainer: {
      padding: 30,
      borderTopLeftRadius: 16, // Optional: rounded corners for the container
      borderTopRightRadius: 16, // Optional: rounded corners for the container
      backgroundColor: 'white', // Background color of the modal content
      maxHeight: 400, // Set a maximum height
      width: '100%'
    },
    modalButton: {
      flexGrow: 1,
      gap: 5,
      marginTop: 10,
    },
  });

  const avatarText = userName ? userName.charAt(0).toUpperCase() : "G"; // Default to "G" if no username

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Layout style={styles.container}>
        <Appbar.Header style={{ paddingRight: 15, backgroundColor: '#111b2d' }}>
          <Appbar.BackAction color={theme['color-basic-200']} onPress={() => router.back()} />
          <Appbar.Content color={theme['color-basic-100']} title={<Text style={{ color: theme['color-basic-100'], fontSize: 18 }}>Account</Text>} />
        </Appbar.Header>

        <Layout style={styles.headerContainer} />

        <View style={{ marginTop: -50, alignItems: 'center' }}>
          <View >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarText}</Text>
            </View>
            <Text style={styles.userNameText}>{userName || "Guest"}</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Layout style={styles.sectionContainer}>
            <Text category="h6" style={styles.sectionTitle}>My Orders</Text>
            <Button appearance="ghost" onPress={() => router.push('orders')} style={styles.viewAllButton}>View All</Button>
          </Layout>
          <View style={styles.orderStatusContainer}>
            <View style={styles.orderItem}>
              <Orders size={35} primaryColor={theme['color-primary-default']} color={theme['text-basic-color']} />
              <Text style={styles.orderText}>All Orders</Text>
            </View>
            <View style={styles.orderItem}>
              <Timer size={35} primaryColor={theme['color-primary-default']} color={theme['text-basic-color']} />
              <Text style={styles.orderText}>Awaiting Pay</Text>
            </View>
            <View style={styles.orderItem}>
              <Transit primaryColor={theme['color-primary-default']} size={35} color={theme['text-basic-color']} />
              <Text style={styles.orderText}>Processing</Text>
            </View>
            <View style={styles.orderItem}>
              <Transit primaryColor={theme['color-primary-default']} size={35} color={theme['text-basic-color']} />
              <Text style={styles.orderText}>in Transit</Text>
            </View>
          </View>
        </View>
<ScrollView>
        <View style={[styles.cardContainer, {
          padding: 15, borderBottomWidth: 10,
          borderBottomColor: theme['color-basic-400']
        }]}>
          <Link href={'/settings'}>
            <View style={styles.optionItem}>
              <User size={24} color={theme['text-basic-color']} />
              <Text style={styles.optionText}>Profile Settings</Text>
            </View>
          </Link>
          <Link href={'/viewed'}>
            <View style={styles.optionItem}>
              <Clock size={24} color={theme['text-basic-color']} />
              <Text style={styles.optionText}>Recently Viewed</Text>
            </View>
          </Link>
          <Link href={'/addressBook'}>
            <View style={styles.optionItem}>
              <House size={24} color={theme['text-basic-color']} />
              <Text style={styles.optionText}>My Address</Text>
            </View>
          </Link>
        </View>

        <View style={[styles.cardContainer, {
          padding: 15, borderBottomWidth: 10,
          borderBottomColor: theme['color-basic-400']
        }]}>
          
          <Link href={'/help'}>
            <View style={styles.optionItem}>
              <Headset size={24} color={theme['text-basic-color']} />
              <Text style={styles.optionText}>Service Center</Text>
            </View>
          </Link>
          <Link href={'/help'}>
            <View style={styles.optionItem}>
              <Headset size={24} color={theme['text-basic-color']} />
              <Text style={styles.optionText}>Terms of service</Text>
            </View>
          </Link>
          <Link href={'/help'}>
            <View style={styles.optionItem}>
              <Headset size={24} color={theme['text-basic-color']} />
              <Text style={styles.optionText}>Privacy Policy</Text>
            </View>
          </Link>
          {/* <Link href={'/help'}>
            <View style={styles.optionItem}>
              <Headset size={24} color={theme['text-basic-color']} />
              <Text style={styles.optionText}>Refund Policy</Text>
            </View>
          </Link> */}
          
        </View>
        <TouchableOpacity style={[styles.optionItem, { paddingHorizontal: 16, paddingTop:20 }]} onPress={() => setModalVisible(true)}>
          <Power size={24} color={theme['text-basic-color']} />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
        </ScrollView>
      </Layout>
      
      {/* Logout Confirmation Modal */}
      <Modal
        visible={modalVisible}
        style={styles.modal} // Use a style object for the modal
        backdropStyle={styles.backdrop} // Apply styles to the backdrop
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text category="h6" style={{ textAlign: 'center' }}>Confirm Logout</Text>
          <Text style={{ textAlign: 'center' }}>Are you sure you want to logout?</Text>
          <View style={{ marginVertical: 20, flexDirection: 'row', gap: 10 }}>
            <Button
              mode="contained-tonal"
              onPress={() => setModalVisible(false)}
              style={styles.modalButton}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleLogout}
              style={styles.modalButton}
            >
              Logout
            </Button>
          </View>
        </View>
      </Modal>
      
    </>
  );
}
