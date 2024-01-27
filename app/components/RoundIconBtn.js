import React from 'react';
import { View, StyleSheet } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import colors from '../misc/colors';


const RoundIconBtn = ({iconname,size,color,onPress,style}) => {
    return (<MaterialIcons 
            name={iconname}     
            size={size || 24} 
            color={color || colors.LIGHT} 
            style={ style }
            onPress={onPress}
        />
    );
};

const styles = StyleSheet.create({
    container:{}
});

export default RoundIconBtn;