import { StatusBar } from 'expo-status-bar';
import Realm from 'realm';
import React, {useEffect , useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './app/screens/HomeScreen';
import Intro from './app/screens/Intro';
import TaskDetail from './app/components/TaskDetail';
import EditTask from './app/screens/EditTask';
import realmObject from './app/storage/realmObject';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState({})
  const findUser = () => {
    const savedUser = realmObject.objects('User')[0];
    console.log(savedUser);
    if (savedUser) {
      setUser(savedUser);
    }
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear();
  }, []);

  
  if (!user.username) return <Intro onFinish={findUser}/>;
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
