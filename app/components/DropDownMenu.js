import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, TextInputComponent } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const DropDownMenu = ({data, style, selectedValue}) => {

    const [placeHolderValue, setPlaceHolderValue] = useState('Select...');
    const [isClicked, setIsClicked] = useState(false)
    

   
   return (
   <>
   <View style={[styles.container, {...style}]} >
           <TouchableOpacity style={styles.dropDownBoxStyle} onPress={() => {setIsClicked(!isClicked)}}>
                <Text style={styles.defaultTextStyle}> {placeHolderValue} </Text>
                {
                    isClicked ? 
                    <RoundIconBtn iconname='arrow-drop-down' size={40} style={styles.iconStyle}/> :
                    <RoundIconBtn iconname='arrow-drop-up' size={40} style={styles.iconStyle}/>
                }
           </TouchableOpacity>
           {
            isClicked ?
            <View style={styles.MenuStyle}>
                <FlatList 
                data={data} 
                keyExtractor={(item) => item.toString()}
                renderItem={({item}) =>{
                    return (
                        <TouchableOpacity style={[styles.textStyle]} onPress={() => {
                            setPlaceHolderValue(item);
                            setIsClicked(false);
                            selectedValue(item);
                        }}>
                            <Text style={{color:colors.DARK,fontSize:20}}>{item}</Text>
                        </TouchableOpacity>
                    )
                }} />
            </View> : null
           }
    </View>
   </>
       
       
   );
};

const styles = StyleSheet.create({
    container:{
        // padding: 20
    },
    defaultTextStyle:{
        fontSize: 20,
        color:colors.LIGHT,
        position:'absolute',
        top:8,
        fontWeight:'bold',
        paddingLeft:10,
    },
    dropDownBoxStyle:{
        flexDirection:'row',
    },
    iconStyle:{
        position:'absolute',
        right:5,
        // bottom:-8,
        // justifyContent:'center'
    },
    MenuStyle:{
        height:180,
        width:'100%',
        // padding:15,
        marginTop:50,
        elevation:4,
        backgroundColor:colors.LIGHT,
        borderRadius:5,
        zIndex:-1
    },
    textStyle:{
        height:50,
        paddingLeft:10,
        borderBottomColor:colors.DARK,
        borderBottomWidth:1,
        width:'100%',
        alignSelf:'center',
        justifyContent:'center',
    }

});

export default DropDownMenu;