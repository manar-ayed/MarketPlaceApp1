import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import HomeStackNavigator from './HomeStack';
import {AuthProvider} from './AuthProvider';
import {Routes} from './Routes';
const RootNavigator = () => {
  return (
    <AuthProvider>
      <Routes></Routes>
    </AuthProvider>
  );
};

export default RootNavigator;
