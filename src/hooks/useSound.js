import { Audio } from 'expo-av'

export async function playSoundStart() {
  const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/start.wav'))
  await sound.playAsync()
}

export async function playSoundError() {
  const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/error.wav'))
  await sound.playAsync()
}

export async function playSoundSelect() {
  const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/select.wav'))
  await sound.playAsync()
}

export async function playSoundEndSessions() {
  const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/endSession.wav'))
  await sound.playAsync()
}

export async function playSoundPetReceived() {
  const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/petReceived.wav'))
  await sound.playAsync()
}

export async function playSoundLevelUp() {
  const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/levelUp.wav'))
  await sound.playAsync()
}

export async function playSoundStarUp() {
  const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/starUp.wav'))
  await sound.playAsync()
}