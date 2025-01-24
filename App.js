import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './pages/HomeScreen'; // Replace with your HomeScreen path
import IntroScreen from './components/IntroScreen'; // Import the IntroScreen

const App = () => {
  const [showIntro, setShowIntro] = useState(true); // Track whether to show the intro screen
  const [loading, setLoading] = useState(true); // Track AsyncStorage loading state

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const hasSeenIntro = await AsyncStorage.getItem('hasSeenIntro');
        if (hasSeenIntro) {
          setShowIntro(false); // Don't show intro if the flag is set
        }
      } catch (error) {
        console.error('Error checking intro status:', error);
      } finally {
        setLoading(false); // AsyncStorage check is complete
      }
    };

    checkIntroStatus();
  }, []);

  const handleIntroFinish = async () => {
    try {
      await AsyncStorage.setItem('hasSeenIntro', 'true'); // Set the flag to skip intro next time
      setShowIntro(false); // Proceed to the main app
    } catch (error) {
      console.error('Error saving intro status:', error);
    }
  };

  if (loading) {
    return null; // Show nothing while loading AsyncStorage
  }

  return (
    <NavigationContainer>
      {showIntro ? <IntroScreen onFinish={handleIntroFinish} /> : <HomeScreen />}
    </NavigationContainer>
  );
};

export default App;