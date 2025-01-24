import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDescription = ({ route }) => {
  const { product } = route.params; // Extract product from route.params
  console.log(product);

  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    Alert.alert('Success', 'Item added to cart!');
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: `https:${product.imageUrl}` }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.likeButton} onPress={handleLikeToggle}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={28}
            color={isLiked ? 'red' : 'black'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#4caf50',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  likeButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDescription;
