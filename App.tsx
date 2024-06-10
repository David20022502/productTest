/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {AppNavigation} from './src/navigation/AppNavigation';
import {AppState} from './src/context/App/AppState';
import {NavigationContainer} from '@react-navigation/native';
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <AppState>
          <AppNavigation />
        </AppState>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
