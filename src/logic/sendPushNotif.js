import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

let notifIdentifier

export async function sendPushNotif(time) {

  notifIdentifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your focus session has ended",
      body: 'Come back and collect you reward!',
      sound: "default"
    },
    trigger: { seconds: time },
  })

}

export async function cancelNotif() {
  await Notifications.cancelScheduledNotificationAsync(notifIdentifier)
}