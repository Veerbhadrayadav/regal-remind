import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const CustomDrawerContent = ({ userImage, username, navigation }) => {
  const [selectedImage, setSelectedImage] = useState(userImage); // Initialize with user's image

  const handleUploadImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ padding: 20, backgroundColor: '#f0f0f0', alignItems: 'center' }}>
        <TouchableOpacity onPress={handleUploadImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: 80, height: 80, borderRadius: 40 }} />
          ) : (
            <Ionicons name="person-outline" size={80} color="#888" />
          )}
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>{username}</Text>
      </View>
      
      {/* Drawer items */}
      <TouchableOpacity
        style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}
        onPress={() => navigation.navigate('Home')} // Navigate to Home screen
      >
        <Text>Home</Text>
      </TouchableOpacity>
    
      
      {/* Add more drawer items as needed */}
    </View>
  );
};

export default CustomDrawerContent;
