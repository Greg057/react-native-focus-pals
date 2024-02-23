import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})


export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      return
    }
  } else {
    alert('Must use physical device for Push Notifications')
  }
}


let notifIdentifier

export async function sendPushNotif(time) {
  await registerForPushNotificationsAsync()
  notifIdentifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Focus session has ended",
      body: 'Come back and collect your reward!',
      sound: "default"
    },
    trigger: { seconds: time },
  })

}

export async function cancelNotif() {
  await Notifications.cancelScheduledNotificationAsync(notifIdentifier)
}