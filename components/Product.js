import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Product = ({ product }) => {
  
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: `https:${product.imageUrl}` }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>₹{product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
});

export default Product;