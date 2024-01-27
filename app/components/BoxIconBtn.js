import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather} from '@expo/vector-icons';
import colors from '../misc/colors';

const BoxIconBtn = ({iconname,size,title,onPress,style}) => {
    return (
        <>
            <TouchableOpacity style={[{flexDirection: 'row'}, style]} onPress={onPress}>
                <Feather name={iconname} size={size} color={colors.DARK}/>
                <Text style={{color: colors.DARK, fontSize:20,marginLeft:5,}}>{title}</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container:{}
});

export default BoxIconBtn;