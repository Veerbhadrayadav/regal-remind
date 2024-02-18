import 'react-native-gesture-handler';
import React, {useEffect , useState} from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './app/screens/HomeScreen';
import Intro from './app/screens/Intro';
import TaskDetail from './app/components/TaskDetail';
import realmObject from './app/storage/realmObject';
import CustomDrawerContent from './app/components/UserMenu';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

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

  
  if (!user.username) return (<Intro onFinish={findUser}/>);
  return (
  <NavigationContainer>
    <Drawer.Navigator screenOptions={{headerShown: false}}
        drawerContent={(props) => <CustomDrawerContent {...props} userImage="" username={user.username} />}>
        <Drawer.Screen name='HomeScreen'>
            {(props) => <HomeScreen {...props} user={user}/>}
        </Drawer.Screen>
        <Drawer.Screen component={TaskDetail} name='TaskDetail'/>
    </Drawer.Navigator>
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
