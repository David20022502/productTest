import React, {Suspense, lazy} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainStackNavigator} from '../interface/AppNavigation';
import {I18n} from 'aws-amplify';
import {es_EC} from '../translates/es';
import {en_US} from '../translates/en';
import ProductListScreen from '../screens/ProductList/ProductListScreen';
const ProductDetailScreen = lazy(
  () => import('../screens/ProductDetail/ProductDetailScreen'),
);
const ProductFormScreen = lazy(
  () => import('../screens/ProductFormScreen/ProductFormScreen'),
);
const MainStack = createStackNavigator<MainStackNavigator>();
I18n.putVocabulariesForLanguage('es', es_EC);
I18n.putVocabulariesForLanguage('en', en_US);
I18n.setLanguage('es');
export const AppNavigation = () => {
  return (
    <Suspense>
      <MainStack.Navigator
        initialRouteName="ProductListScreen"
        screenOptions={{headerShown: false}}>
        <MainStack.Screen
          name="ProductListScreen"
          component={ProductListScreen}
        />
        <MainStack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
        <MainStack.Screen
          name="ProductFormScreen"
          component={ProductFormScreen}
        />
      </MainStack.Navigator>
    </Suspense>
  );
};
