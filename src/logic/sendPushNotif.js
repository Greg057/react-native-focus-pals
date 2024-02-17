import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default async function sendPushNotif(time) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your focus session has ended",
      body: 'Come back and collect you reward!',
      sound: "default"
    },
    trigger: { seconds: 2 },
  })

}
