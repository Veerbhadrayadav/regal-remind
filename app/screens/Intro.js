import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar, Dimensions } from 'react-native';
import RoundIconBtn from '../components/RoundIconBtn';
import colors from '../misc/colors';
import realmObject from '../storage/realmObject';

const Intro = ({onFinish}) => {
    const [name, setName] = useState('');
    const handleTextChange = text => setName(text);

    const handleSubmit = () => {
        realmObject.write(() => {
            realmObject.create('User',{
                username: name
            });
        })
        if (onFinish) onFinish();
    };

    return (
       <>
       <StatusBar hidden />
       <View style={styles.container}>
           <Text style={styles.inputTitle}>Enter Your Name Buddy</Text>
           <TextInput 
                value={name}
                onChangeText={handleTextChange}
                cursorColor={colors.LIGHT}
                placeholder='please :(' 
                placeholderTextColor={colors.LIGHT} 
                style={styles.textInput} 
            />
            {name.trim().length >= 3 ? (
                <RoundIconBtn 
                    iconname="arrow-circle-right"
                    size={50} 
                    color={colors.LIGHT} 
                    style={styles.iconStyle}  
                    onPress={handleSubmit}
                />
            ) : null}
       </View>
       </>
   );
};

const width = Dimensions.get('window').width-50;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: colors.DARK
    },
    textInput:{
        borderWidth: 4,
        borderColor: colors.LIGHT,
        width,
        borderRadius: 6,
        height: 50,
        backgroundColor: colors.DARK,
        paddingLeft:15,
        fontSize: 25,
        color: colors.LIGHT,
        
    },
    inputTitle:{
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        color: colors.LIGHT,
        opacity: 0.6
    },
    iconStyle:{
        // flex:1,
        marginTop:5,
        padding:15    
    }
});

export default Intro;