import * as React from 'react';
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
