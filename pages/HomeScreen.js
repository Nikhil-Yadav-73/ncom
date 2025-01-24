import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import contentfulClient from '../ContentfulClient';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching Content Types...');
        const contentTypes = await contentfulClient.getContentTypes();
        console.log('Content Types:', contentTypes.items);

        const response = await contentfulClient.getEntries({
          content_type: 'pageProduct', // Replace with the correct content type ID
        });
        console.log('Contentful response:', response); // Debug: Log the full response

        if (response.items.length > 0) {
          // Map products with resolved fields and linked assets
          const resolvedProducts = response.items.map((item) => {
            const fields = item.fields;

            // Resolve image URL if available
            const imageAsset = response.includes?.Asset?.find(
              (asset) => asset.sys.id === fields.image?.sys.id
            );

            return {
              id: item.sys.id,
              name: fields.name || 'No Name', // Adjust field name if needed
              price: fields.price || 'N/A', // Adjust field name if needed
              imageUrl: imageAsset?.fields?.file?.url || '', // Get image URL or fallback
            };
          });

          setProducts(resolvedProducts); // Set the resolved products
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>Featured Products</Text>
      {products.length > 0 ? (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <Text>No products found</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;