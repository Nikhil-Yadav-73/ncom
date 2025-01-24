import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './pages/HomeScreen';
import IntroScreen from './components/IntroScreen';
import CategoryPage from './pages/CategoryPage';
import ProductDescription from './pages/ProductDescription';

const Stack = createStackNavigator();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
        if (hasSeenIntro) {
          setShowIntro(false);
        }
      } catch (error) {
        console.error('Error checking intro status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkIntroStatus();
  }, []);

  const handleIntroFinish = async () => {
    try {
      await AsyncStorage.setItem('hasSeenIntro', 'true');
      setShowIntro(false);
    } catch (error) {
      console.error('Error saving intro status:', error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {showIntro ? (
        <IntroScreen onFinish={handleIntroFinish} />
      ) : (
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Category" component={CategoryPage} />
          <Stack.Screen name="ProductDescription" component={ProductDescription} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;