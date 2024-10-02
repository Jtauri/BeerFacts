import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {

  const[brand, setBrand] = useState('')
  const[name, setName] = useState('')
  const[style, setStyle] = useState('')

  const url = 'https://random-data-api.com/api/v2/beers'

  const getBeerData = async () => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        console.log('Response ok')
        const data = await response.json()
        setBrand(data.brand)
        setName(data.name)
        setStyle(data.style)
      } else {
        if (response.status === 429) {
          console.log('Too many requests')
        } else {
          console.log('Kaljat on loppu')
        }
      }

    } catch (error) {
      console.error(error)
    } 
  }

  useEffect(() => {
    getBeerData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Random beer</Text>
      <Text style={styles.text}>Brand: {brand}</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Style: {style}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    marginBottom: 10
  }
});
