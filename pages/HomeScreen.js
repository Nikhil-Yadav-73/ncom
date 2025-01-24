import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator, 
  FlatList 
} from 'react-native';
import Modal from 'react-native-modal';
import contentfulClient from '../ContentfulClient';
import Product from '../components/Product';

const content_types = ['pageLanding', 'pageProduct'];

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  let counter = 0;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: content_types[1],
        });
        // console.log('response:', response.includes.Entry[counter]);

        if (response.items.length > 0) {
          // const resolvedProducts = response.includes.Entry.map((item) => {
          //   let fields = item.Entry[counter].fields;

          //   const imageUrl =
          //     response.includes.Entry[counter++].fields?.shareImages[1].fields?.file?.url || '';

          //   return {
          //     id: item.sys.id,
          //     name: fields.name || 'No Name',
          //     price: fields.price || 'N/A',
          //     imageUrl: imageUrl || '',
          //   };
          // });

          let resolvedProducts = [];

          while(counter < response.items.length){
            resolvedProducts[counter] = {
              id: counter,
              name: response.items[counter].fields.internalName,
              price: response.items[counter].fields.price,
              imageUrl: response.items[counter].fields.featuredProductImage.fields.file.url
            };
            counter++;
          }

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

  const menuOptions = [
    { id: '1', label: 'Profile', action: () => alert('Profile Clicked') },
    { id: '2', label: 'Settings', action: () => alert('Settings Clicked') },
    { id: '3', label: 'Logout', action: () => alert('Logout Clicked') },
  ];

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        setDropdownVisible(false);
        item.action();
      }}
    >
      <Text style={styles.dropdownText}>{item.label}</Text>
    </TouchableOpacity>
  );

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
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => setDropdownVisible(!isDropdownVisible)}
        >
          <Text style={styles.optionsText}>•••</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isDropdownVisible}
        backdropOpacity={0.1}
        onBackdropPress={() => setDropdownVisible(false)}
        style={styles.dropdownModal}
      >
        <View style={styles.dropdownMenu}>
          <FlatList
            data={menuOptions}
            keyExtractor={(item) => item.id}
            renderItem={renderDropdownItem}
          />
        </View>
      </Modal>

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
        {products.length > 0 ? (
          products.map((product) => <Product key={product.id} product={product} />)
        ) : (
          <Text>No products found</Text>
        )}
      </ScrollView>
    </View>
  );
};

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
  dropdownModal: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 70,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
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