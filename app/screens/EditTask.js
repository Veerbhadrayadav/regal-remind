import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, StatusBar, Dimensions, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateComponents from '../components/DateComponent';
import BoxIconBtn from '../components/BoxIconBtn';
import colors from '../misc/colors';

function dateValidity({ day, month, year }) {
    if (month === 'Feb') {
      if (parseInt(year, 10) % 4 === 0 && parseInt(day, 10) > 29) return false;
      if (parseInt(year, 10) % 4 !== 0 && parseInt(day, 10) > 28) return false;
    } else if (['Apr', 'Jun', 'Sep', 'Nov'].includes(month)) {
      if (parseInt(day, 10) > 30) return false;
    } else if (['Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec'].includes(month)) {
      if (parseInt(day, 10) > 31) return false;
    } else {
      // Handle invalid month
      return false;
    }
    // If none of the conditions are met, the date is valid
    return true;
  }


const EditTask = ({ item, onCancel, onDone, visible }) => {
    // component Name must be dd,mm, or yyyy only;
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [timespent, setTimespent] = useState(0);
    const [info, setInfo] = useState('');

    

    // console.log(new Date(year,month,day).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }));
    // console.log(timespent)
    // console.log(info)
    const width = (Dimensions.get('window').width - 20) / 3;
    
    const handleModalClose = () => {
        Keyboard.dismiss();
    };
    const showError = () => {
        if (dateValidity(day,month,year) === false && timespent.toString().trim ){
            console.log('invalid date and empty timespent');
        } else if (dateValidity(day,month,year) === false) {
            console.log('invalid date');
        } else {
            console.log('empty timespent');
        }
        onCancel()
        
    };
    const handleOnDone = () => {
        if (dateValidity(day, month, year) && !timespent.toString().trim) {
            const date = new Date(year,month,day).toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
            onDone(date, timespent, info)
            setInfo('')
            setTimespent(0)
            setDay('')
            setMonth('')
            setYear('')
            
        } else {
            showError()
        };
    };
    const handleOnCancel = () => {
        setInfo('')
        setTimespent(0)
        setDay('')
        setMonth('')
        setYear('')
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
                        Choose Date
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <DateComponents componentName='dd' boxStyle={styles.boxStyle} flatlistStyle={styles.datecomponentstyle} setPickeditem={setDay} />
                        <Text style={{ fontSize: 30, color: colors.LIGHT, }}>|</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <DateComponents componentName='mm' boxStyle={styles.boxStyle} flatlistStyle={styles.datecomponentstyle} setPickeditem={setMonth} />
                        <Text style={{ fontSize: 30, color: colors.LIGHT, }}>|</Text>
                    </View>
                    <View style={{}}>
                        <DateComponents componentName='yyyy' boxStyle={styles.boxStyle} flatlistStyle={styles.datecomponentstyle} setPickeditem={setYear} />
                    </View>
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
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
                </TouchableWithoutFeedback>
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