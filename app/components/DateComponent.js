import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions, Modal } from 'react-native';
import colors from '../misc/colors';

const DateComponents = ({ componentName, boxStyle, flatlistStyle, setPickeditem }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [picked, setPicked] = useState(componentName)
    const date = Array.from({ length: 31 }, (_, index) => index + 1);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 1; year <= currentYear + 3; year++) {
        years.push(year);
    };
    const handleitemOnPress = (item) => {
        setIsClicked(false)
        setPicked(item)
        setPickeditem(item)
    };
    const handleMonthOnPress = (item) => {
        setIsClicked(false)
        setPicked(item)
        setPickeditem(data.indexOf(item))
    };
    const renderNumberItem = componentName !== 'mm' ? ({ item }) => (
        <TouchableOpacity style={styles.listStyle} onPress={() => handleitemOnPress(item)}>
            <Text style={{ alignSelf: 'center', color: colors.LIGHT, fontSize: 20 }}>{item}</Text>
        </TouchableOpacity>
    ) : ({ item }) => <TouchableOpacity style={styles.listStyle} onPress={() => handleMonthOnPress(item)}>
        <Text style={{ alignSelf: 'center', color: colors.LIGHT, fontSize: 20 }}>{item}</Text>
    </TouchableOpacity>;

    const data = componentName === 'dd' ? date : (componentName === 'mm' ? months : years);
    const width = (Dimensions.get('window').width - 20) / 3;
    return (
        <>
            <Modal
                visible={isClicked}
                onRequestClose={() => setIsClicked(false)}>
                <View style={flatlistStyle}>
                    <FlatList
                        data={data}
                        renderItem={renderNumberItem}
                        keyExtractor={(item) => item.toString()} // Convert the number to a string for a unique key
                    />
                </View>

            </Modal>
            <TouchableOpacity style={boxStyle} onPress={() => setIsClicked(true)}>
                <Text style={{ alignSelf: 'center', color: colors.LIGHT, fontSize: 20 }} >
                    {picked}
                </Text>
            </TouchableOpacity>

        </>
    );
};

const styles = StyleSheet.create({
    listStyle: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: colors.LIGHT,
        justifyContent: 'center',
        marginHorizontal: 10,
        zIndex: 1,
        width: 100,
    },
});

export default DateComponents;