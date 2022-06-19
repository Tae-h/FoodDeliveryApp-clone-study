import * as React from 'react';
import store from './src/store';
import {Provider} from 'react-redux';
import AppInner from './AppInner';
import {NavigationContainer} from '@react-navigation/native';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

/*const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();*/

function App() {
  // Provider 바깥에서는 useSelector 를 못씀!
  //const isLoggedIn = useSelector((state: RootState) => !!state.user.email); // 나중에 state.user.accessToken 으로

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
