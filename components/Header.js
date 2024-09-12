import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header({app_name}) {
  return (
    <View>
      <Text>Welcome to {app_name}!</Text>
    </View>
  )
}

const styles = StyleSheet.create({})