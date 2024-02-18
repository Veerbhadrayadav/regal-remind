import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Modal, StatusBar, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import BoxIconBtn from '../components/BoxIconBtn';
import colors from '../misc/colors';
import constant from '../misc/constant';


const EditTask = ({ item, onCancel, onDone, visible }) => {
    const [timespent, setTimespent] = useState('');
    const [info, setInfo] = useState('');

    const width = (Dimensions.get('window').width - 20) / 3;
    
    // const handleModalClose = () => {
    //     Keyboard.dismiss();
    // };

    const handleOnDone = () => {
        // if (timespent > 0) {
            onDone(timespent, info)
            setInfo('')
            setTimespent('')
        // } else {
            // showError()
        // };
    };
    const handleOnCancel = () => {
        setInfo('')
        setTimespent('')
        onCancel()
    };
    return (
        <>
            <StatusBar hidden />
            <Modal visible={visible} animationType='slide'>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleValue}>
                        {item.title}
                    </Text>
                </View>
                <View style={{ borderColor: colors.LIGHT, borderWidth: 3, borderRadius: 5, width: 140, margin: 10 }}>
                    <Text style={{ alignSelf: 'center', fontSize: 20, color: colors.LIGHT, }}>
                        {constant.TODAY}
                    </Text>
                </View>
                <View style={{ borderTopWidth: 2, margin: 10, borderTopColor: colors.LIGHT, }}>
                    <TextInput
                        keyboardType="numeric"
                        value={timespent}
                        onChangeText={(text) => { setTimespent(text) }}
                        placeholder='timespent in min'
                        placeholderTextColor={colors.LIGHT}
                        style={{ color: colors.LIGHT, fontSize: 20, margin: 10 }} />
                </View>
                <View style={{ margin: 10, backgroundColor: colors.LIGHT, height: 400 }}>
                    <TextInput
                        value={info}
                        multiline
                        onChangeText={(text) => { setInfo(text) }}
                        placeholder='Enter Details...'
                        placeholderTextColor={colors.DARK}
                        cursorColor={colors.DARK}
                        style={{ color: colors.DARK, fontSize: 20, margin: 10 }} />
                </View>
                <View style={{ flexDirection: 'row', padding: 10, position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                    <BoxIconBtn iconname='x' size={30} title='Cancel' onPress={handleOnCancel} style={styles.btnStyle} />
                    <BoxIconBtn iconname='check' size={30} title='Done' onPress={handleOnDone} style={styles.btnStyle} />
                </View>
                {/* <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback> */}
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    titleValue: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.LIGHT,
    },
    titleContainer: {
        padding: 10,
        margin: 10,
        borderBottomColor: colors.LIGHT,
        borderBottomWidth: 2,
    },
    btnStyle: {
        width: 100,
        backgroundColor: colors.LIGHT,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5,
        marginHorizontal: 40
    },
    datecomponentstyle: {
        width: 100,
        maxHeight: 200,
        alignSelf: 'center',
        marginVertical: 100,
        zIndex: 2,
        position: 'absolute'
    },
    boxStyle: {
        height: 50,
        elevation: 4,
        padding: 10,
        marginHorizontal: 25
    },
    modalBG: {
        flex: 1,
        zIndex: -1
    },
});

export default EditTask;