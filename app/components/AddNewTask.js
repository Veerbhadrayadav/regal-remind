import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from '../components/RoundIconBtn';
import DropDownMenu from './DropDownMenu';



const AddNewTask = ({ visible, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [target, setTarget] = useState('');
    const [daytime, setDaytime] = useState('');

    const selectTarget = (item) => {
        setTarget(item);
    };

    const selectDaytime = (item) => {
        setDaytime(item);
    };

    const handleTextInput = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    };

    const daytimeList = [
        'Early Morning (5am-8am)',
        'Late Morning (8am-12noon)',
        'Day (11am-4pm)',
        'Late Afternoon (1pm-5pm)',
        'Evening (4pm-8pm)',
        'Late Evening (7pm-10pm)',
        'Late Night (9pm-1am)'
      ];
    
    const handleSubmit = () => {
        if (!title.trim() && !desc.trim() && !target.trim() && !daytime.trim()) return onClose();
        onSubmit(title, desc, target, daytime);
        setTitle('');
        setDesc('');
        setDaytime('');
        setTarget('');
        onClose();
    };
    const handleModalClose = () => {
        Keyboard.dismiss();
    };

    const closeModal = () => {
        setTitle('');
        setDesc('');
        onClose();
    }

    const changeText = () => {

    };
    return (
        <>
            <StatusBar hidden />
            <Modal visible={visible} animationType='slide'>
                <View>
                    <TextInput
                        multiline
                        cursorColor={colors.LIGHT}
                        onChangeText={(text) => handleTextInput(text, 'title')}
                        placeholder='Task Name...'
                        placeholderTextColor={colors.LIGHT}
                        style={[styles.input, styles.title]} />
                    <TextInput
                        multiline
                        cursorColor={colors.LIGHT}
                        onChangeText={(text) => handleTextInput(text, 'desc')}
                        placeholder='Overview...'
                        placeholderTextColor={colors.LIGHT}
                        style={[styles.input, styles.desc]} />
                    <DropDownMenu 
                        data={daytimeList} 
                        style={styles.dropDownBoxStyle}
                        selectedValue={selectDaytime} />
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                    <TextInput
                        style={styles.streakValueStyle}
                        placeholder='Target' 
                        keyboardType='numeric'
                        placeholderTextColor={colors.LIGHT} 
                        cursorColor={colors.LIGHT} 
                        onChangeText={(text) => selectTarget(text)} />
                    {/* <DropDownMenu 
                        data={streakUnit} 
                        style={styles.streakMenuStyle}
                        selectedValue={selectTargetUnit} /> */}
                </View>
                <View style={styles.btnContainer}>
                    {(title.trim() || desc.trim()) ? (<RoundIconBtn iconname='cancel-presentation' size={60} style={styles.crossBtnStyle} onPress={closeModal} />) : null}
                    <RoundIconBtn iconname='check-box' size={60} style={styles.addBtnStyle} onPress={handleSubmit} />
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>

            </Modal>
        </>
    );
};

const hgt = Dimensions.get('window').height;
const width = (Dimensions.get('window').width - 20);

const styles = StyleSheet.create({
    input: {
        borderWidth: 4,
        borderColor: colors.LIGHT,
        marginHorizontal: 10,
        marginVertical: 2.5,
        borderRadius: 15,
        color: colors.LIGHT
    },
    title: {
        padding: 15,
        fontWeight: 'bold',
        fontSize: 20,
        maxHeight: 100
    },
    desc: {
        padding: 15,
        minHeight: 100,
        maxHeight: 200,
        fontSize: 20,

    },
    modalBG: {
        flex: 1,
        zIndex: -1
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // paddingVertical:15,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10
    },
    crossBtnStyle: {
        // height:50
    },
    addBtnStyle: {
        marginLeft: 150
    },
    dropDownBoxStyle: {
        width,
        alignSelf: 'center',
        borderColor: colors.LIGHT,
        borderWidth: 4,
        borderRadius: 15,
        height: 50,
        marginTop: 2.5,
        // justifyContent:'center',
        // paddingLeft:5
    },
    streakValueStyle: {
        borderColor: colors.LIGHT,
        borderWidth: 4,
        borderRadius: 15,
        width: '40%',
        height: 50,
        paddingLeft: 20,
        marginTop: 5,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.LIGHT,
    },
    streakMenuStyle: {
        width: '53%',
        borderColor: colors.LIGHT,
        borderWidth: 4,
        borderRadius: 15,
        marginTop: 5,
        marginLeft: 5
    }

});

export default AddNewTask;