import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import AddNewTask from '../modals/AddNewTask';
import RoundIconBtn from '../components/RoundIconBtn';
import SearchBar from '../components/SearchBar';
import colors from '../misc/colors';
import TaskBox from '../components/TaskBox';
import realmObject from '../storage/realmObject';
import Functions from '../misc/Functions';
import DeleteTaskModal from '../modals/DeleteTask';

const HomeScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 12 || hrs < 16) return setGreet('Afternoon');
        setGreet('Evening');
    };
    const findTasks =  () => {
        setTasks(user.tasks);
    }
    const handleOnSubmit =  (title, desc, target, daytime) => {
        realmObject.write(() => {
            const newtask = realmObject.create('Task',{
                id: Functions.randomString(16),
                daytime,
                description: desc,
                target,
                title
            })
            user.tasks.push(newtask);
        })
        // console.log(newtask);
    };
    const handleTaskDelete = (taskId, deleteType) => {
        if (deleteType === 'temporary') {
            realmObject.write(() => {
                const taskToDelete = user.tasks.filtered(`id == '${taskId}'`)[0];
                if (taskToDelete) {
                    taskToDelete['deleted'] =true;
                } else {
                    console.warn('Task not found with ID:', taskId);
                }
            });
        } else if (deleteType === 'permanent') {
            realmObject.write(() => {
                const taskToDelete = user.tasks.filtered(`id == '${taskId}'`)[0];
                if (taskToDelete) {
                    realmObject.delete(taskToDelete);
                } else {
                    console.warn('Task not found with ID:', taskId);
                }
            });
        }
        
    };    
    const handleBoxPress = (item) => {
        navigation.navigate('TaskDetail', { item });
    };
    useEffect(() => {
        // handleTaskDelete(user.tasks[0].id);
        findTasks();
        findGreet();
    }, []);
    return (
        <>
            <StatusBar hidden />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.headerstyle} >{`Good ${greet},${user.username}`}</Text>
                    {tasks.length ? <SearchBar /> : null}
                    <FlatList
                        data={tasks}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => <TaskBox onPress={() => handleBoxPress(item)} item={item} />} />
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
                            onPress={() => setDeleteModalVisible(true)}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>

            <AddNewTask
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit} />
            <DeleteTaskModal 
                visible={deleteModalVisible}
                onRequestClose={() => setDeleteModalVisible(false)}/>
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
});

export default HomeScreen;