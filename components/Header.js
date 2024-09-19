import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header({name, children}) {
  return (
    <View>
      <Text>Welcome to {name}!</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({})