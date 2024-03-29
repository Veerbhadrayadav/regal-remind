import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import AddNewTask from '../components/AddNewTask';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskBox from '../components/TaskBox';


const HomeScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);

    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 12 || hrs < 16) return setGreet('Afternoon');
        setGreet('Evening');
    };

    const findTasks = async () => {
        const result = await AsyncStorage.getItem('tasks');
        if (result !== null) setTasks(JSON.parse(result));
    }

    useEffect(() => {
        // AsyncStorage.clear();
        findTasks();
        findGreet();
    }, []);

    const handleOnSubmit = async (title, desc, target, daytime) => {
        const task = {
            id: Date.now(),
            title,
            desc,
            time: Date.now(),
            target,
            daytime,
            currentStreak: '0',
            maxStreak: '0',
            progress:'0',
            completed: false,
            deleted: false,
            details: {},

        }
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks)
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        // console.log(task);
    };

    const handleBoxPress = (item) => {
        navigation.navigate('TaskDetail', { item });
    };

    const handleLongPress = () => {
        <View style={styles.longPressMenu}>
            <Text>
                delete karna h kya???
            </Text>
        </View>
    };

    return (
        <>
            <StatusBar hidden />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.headerstyle} >{`Good ${greet},${user.name}`}</Text>
                    {tasks.length ? <SearchBar /> : null}
                    <FlatList
                        data={tasks}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <TaskBox onlongPress={handleLongPress} onPress={() => handleBoxPress(item)} item={item} />} />
                    {
                        !tasks.length ?
                            <View style={[styles.emptyHeaderContainer, StyleSheet.absoluteFillObject]}>
                                <Text style={styles.emptyHeader}>Add Task</Text>
                            </View> : null
                    }
                    <View>
                        <RoundIconBtn
                            iconname='add-circle'
                            size={50}
                            color={colors.LIGHT}
                            style={styles.addIconBt}
                            onPress={() => setModalVisible(true)}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <AddNewTask
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit} />
        </>
    );
};
const width = Dimensions.get('window').width - 30;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.DARK,
        paddingHorizontal: 20
    },
    headerstyle: {
        padding: 10,
        backgroundColor: colors.DARK,
        color: colors.LIGHT,
        width,
        alignSelf: 'center',
        textAlignVertical: 'bottom',
        marginTop: 10,
        height: 50,
        fontSize: 25,
        flex: 1,
        fontWeight: 'bold',
        maxHeight: 60,
    },
    emptyHeader: {
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color: colors.LIGHT,
        opacity: 0.2,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        verticalAlign: 'center',
        zIndex: -1
    },
    addIconBt: {
        flex: 1,
        position: 'absolute',
        right: 20,
        bottom: 15
        // elevation:15
    },
    longPressMenu: {

    }
});

export default HomeScreen;