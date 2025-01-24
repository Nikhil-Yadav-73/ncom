import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Voice from '@react-native-voice/voice';

const NavComponent = ({ products }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const checkVoiceAvailability = async () => {
      const isAvailable = await Voice.isAvailable();
      if (isAvailable) {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
      } else {
        console.log('Voice is not available');
      }
    };

    checkVoiceAvailability();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProducts([]);
    } else {
      const lowerCaseSearch = searchText.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowerCaseSearch) ||
          product.description.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredProducts(filtered);
    }
  }, [searchText, products]);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (e) => {
    const results = e.value;
    if (results && results.length > 0) {
      setSearchText(results[0]);
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error('Voice start error:', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('Voice stop error:', e);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.navbar}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log('Cart pressed')}
          >
            <Icon name="cart" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.logo}>NCOM</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setDropdownVisible(!isDropdownVisible)}
        >
          <Text style={styles.optionsText}>•••</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity
          style={styles.micButton}
          onPress={isListening ? stopListening : startListening}
        >
          <Icon name={isListening ? 'microphone-off' : 'microphone'} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {searchText.trim() !== '' && (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#87CEEB',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 0,
    color: '#fff',
  },
  optionsText: {
    color: '#fff',
    fontSize: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    color: '#000',
  },
  micButton: {
    marginLeft: 8,
  },
  productItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default NavComponent;