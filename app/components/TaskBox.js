import React from 'react';
import { View, StyleSheet,Text, Dimensions, TouchableOpacity } from 'react-native';
import colors from '../misc/colors';

const TaskBox = ({item, onPress, onLongPress}) => {
    const title = item.title;
    const desc = item.desc;
    const target = item.target;
    
    return (
       <TouchableOpacity onLongPress={onLongPress} onPress={onPress} style={styles.container}>
           <Text style={styles.title}>{title}</Text>
           <Text>{desc}</Text>
           <Text>{target}</Text>
       </TouchableOpacity>
   );
};

const width = Dimensions.get('window').width-40;

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.LIGHT,
        borderRadius:6,
        width: width/2 -5,
        padding:10,
        marginVertical:5,
        // height:35
    },
    title:{
        color: colors.DARK,
        fontSize:20,
        fontWeight:'bold',
    }
});

export default TaskBox;