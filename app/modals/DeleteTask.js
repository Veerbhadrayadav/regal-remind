import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

const DeleteTaskModal = ({ onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (deleteType) => {
    setModalVisible(false);
    onDelete(deleteType); // Pass the deleteType to the onDelete function
  };

  return (
    <View style={{ marginTop: 22 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Are you sure you want to delete?</Text>
            <Button title="Cancel" onPress={() => handleDelete('cancel')} />
            <Button title="Temporary" onPress={() => handleDelete('temporary')} />
            <Button title="Permanent" onPress={() => handleDelete('permanent')} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteTaskModal;