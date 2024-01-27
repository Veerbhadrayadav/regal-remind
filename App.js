import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect , useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen';
import Intro from './app/screens/Intro';
import TaskDetail from './app/components/TaskDetail';
import EditTask from './app/screens/EditTask';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({})
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear();
  }, []);

  
  if (!user.name) return <Intro onFinish={findUser}/>;
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerTitle:'', headerTransparent: true}}>
      <Stack.Screen name='HomeScreen' >
        {(props) => <HomeScreen {...props} user={user}/>}
      </Stack.Screen>
      <Stack.Screen component={TaskDetail} name='TaskDetail'/>
    </Stack.Navigator>
  </NavigationContainer>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
