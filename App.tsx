// In App.js in a new project

import RootNavigator from './src/navigation/RootNavigatorConfig';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Provider} from 'react-redux';
import store from './src/store/store';

Icon.loadFont();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
