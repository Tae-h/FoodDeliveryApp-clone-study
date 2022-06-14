import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import {useCallback, useState} from 'react';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
    <>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight onPress={onClick}>
          <Text>Home Screen</Text>
        </TouchableHighlight>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>test</Text>
      </View>
    </>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight onPress={onClick}>
          <Text>Details Screen</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const [modal, showModal] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈화면', headerShown: true}}
        />
        <Stack.Screen name="Details">
          {props => <DetailsScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
      {modal && (
        <Pressable onPress={() => showModal(true)} style={styles.modal}>
          <View style={styles.modalInner}>
            <View style={{flex: 1, backgroundColor: 'yellow'}}>
              <Text>모달 부분</Text>
            </View>
            <View
              style={{flexDirection: 'row', height: 50, alignItems: 'center'}}>
              <Pressable style={{flex: 1, alignItems: 'center'}}>
                <Text>Ok!</Text>
              </Pressable>
              <Pressable style={{flex: 1, alignItems: 'center'}}>
                <Text>No!</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0,0,0, 0.5)',
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: 'orange',
    borderRadius: 10,
    /*top: 50,
    bottom: 50,*/
    height: 300,
    /*right: 50,
    left: 50,*/
    marginHorizontal: 50,
    width: Dimensions.get('window').width - 100,
    padding: 20,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {width: 5, height: 5},
    elevation: 15,
  },
});

export default App;
