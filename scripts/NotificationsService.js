import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useRouter } from 'expo-router';
import { useRouteInfo } from 'expo-router/build/hooks';

export const EXPO_PUSH_TOKEN_STORAGE_KEY = 'expoPushToken';

export const getDeviceId = () => {
  if (Device.isDevice) {
    return Device.osBuildId || Device.osInternalBuildId;
  } else {
    return 'Simulator';
  }
};

export async function storeExpoPushToken(token) {
  try {
    await AsyncStorage.setItem(EXPO_PUSH_TOKEN_STORAGE_KEY, token);
  } catch (e) {
    console.error('Failed to save push token to storage', e);
  }
}

export async function getStoredExpoPushToken() {
  try {
    const token = await AsyncStorage.getItem(EXPO_PUSH_TOKEN_STORAGE_KEY);
    return token;
  } catch (e) {
    console.error('Failed to retrieve push token from storage', e);
    return null;
  }
}

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notifications');
    return;
  }

  try {
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      alert('Project ID not found.');
      throw new Error('Project ID not found.');
    }
    const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

    await storeExpoPushToken(token);

    return token;
  } catch (e) {
    console.error('Failed to register for push notifications', e);
  }
}

// Main hook to initialize notifications and get the push token
export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const router = useRouter()
  const route = useRouteInfo()
  const responseListener = useRef();
  const notificationTriggeredRef = useRef(false);  // Prevent infinite notification triggering

  useEffect(() => {
    // Initialize push notifications and set up listeners
    const initPushNotifications = async () => {
      const storedToken = await getStoredExpoPushToken();
      const newToken = await registerForPushNotificationsAsync();
      if (storedToken) {
        setExpoPushToken(storedToken);  // Use stored token if available
      } else {
        if (newToken) setExpoPushToken(newToken);  // Register and save new token
      }
    };

    initPushNotifications();

    // Add listeners for notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
      // Prevent re-triggering the same notification multiple times
      if (!notificationTriggeredRef.current) {
        notificationTriggeredRef.current = true;  // Mark as triggered
        if (route.pathname === '/processing') {
          if (notification.request.content?.data?.type === 'SUCCESS') {
            router.push('/orderSuccess'); // Navigate to order success page
          } else if (notification.request.content?.data?.type === 'FAILED') {
            router.push('/paymentFailed'); // Navigate to order failed page
          } else {
            console.log('Unhandled notification type:', data?.type);
          }
        } else {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: notification.request.content.title || 'New Notification',
              body: notification.request.content.body || 'You have a new message!',
              data: notification.request.content.data,
              sound: 'default',
              priority: Notifications.AndroidNotificationPriority.MAX,
              sticky: true,
            },
            trigger: null,
          });
        }
        setTimeout(() => {
          notificationTriggeredRef.current = false;  // Allow new notifications
        }, 1000);  // Adjust the timeout as needed
      }
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response: ', response);
    });

    return () => {
      // Clean up listeners on unmount
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return { expoPushToken };
}
