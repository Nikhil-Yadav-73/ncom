import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import contentfulClient from '../ContentfulClient';
import Product from '../components/Product';

content_types = ['pageLanding', 'pageProduct']

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching Content Types...');
        const contentTypes = await contentfulClient.getContentTypes();
        console.log('Content Types:', contentTypes.items);

        const response = await contentfulClient.getEntries({
          content_type: content_types[1],
        });
        console.log('Contentful response:', response);

        if (response.items.length > 0) {
          const resolvedProducts = response.items.map((item) => {
            const fields = item.fields;

            const imageAsset = response.includes?.Asset?.find(
              (asset) => asset.sys.id === fields.image?.sys.id
            );

            return {
              id: item.sys.id,
              name: fields.name || 'No Name',
              price: fields.price || 'N/A',
              imageUrl: imageAsset?.fields?.file?.url || '',
            };
          });

          setProducts(resolvedProducts);
        } else {
          console.warn('No products found for the given content type.');
        }
      } catch (error) {
        console.error('Error fetching data from Contentful:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>NCOM</Text>
        <TouchableOpacity style={styles.optionsButton} onPress={() => alert('Options menu')}>
          <Text style={styles.optionsText}>•••</Text>
        </TouchableOpacity>
      </View>

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

        <Text style={styles.sectionTitle}>Featured Products</Text>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          {products.length > 0 ? (
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))
          ) : (
            <Text>No products found</Text>
          )}
        
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    color: '#ffa',
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
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;