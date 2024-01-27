import React from 'react';
import { View, StyleSheet, TextInput, Dimensions } from 'react-native';
import colors from '../misc/colors';


const SearchBar = ({ containerStyle }) => {
   return (
       <View style={styles.container}>
           <TextInput 
                style={styles.searchbar} 
                cursorColor={colors.LIGHT}
                placeholder='Search here...' 
                placeholderTextColor={colors.LIGHT} />
       </View>
   );
};

const width = Dimensions.get('window').width-30;
const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
    },
    searchbar:{
        marginTop:10,
        borderWidth:3,
        borderColor: colors.LIGHT,
        borderRadius:20,
        width,
        height:50,
        alignSelf:'center',
        fontSize:20,
        padding: 10,
        color: colors.LIGHT
    }
});

export default SearchBar;