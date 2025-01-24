import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>NCOM</Text>
        <TouchableOpacity style={styles.optionsButton} onPress={() => alert('Options menu')}>
          <Text style={styles.optionsText}>•••</Text>
        </TouchableOpacity>
      </View>

      {/* Categories Section */}
      <ScrollView contentContainerStyle={styles.categorySection}>
        <Text style={styles.sectionTitle}>Shop by Category</Text>

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Category', { category: 'Mens' })}
          >
            <Text style={styles.categoryText}>Men's</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Category', { category: 'Womens' })}
          >
            <Text style={styles.categoryText}>Women's</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryRow}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Category', { category: 'Kids' })}
          >
            <Text style={styles.categoryText}>Kids</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Category', { category: 'Accessories' })}
          >
            <Text style={styles.categoryText}>Accessories</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsButton: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 5,
  },
  optionsText: {
    color: '#fff',
    fontSize: 18,
  },
  categorySection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  categoryCard: {
    backgroundColor: '#f8f8f8',
    width: '48%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;